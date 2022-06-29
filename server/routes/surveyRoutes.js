const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../../server/services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for Voting!')
  })
  //  longhand
  // app.post('/api/surveys/webhooks', (req, res) => {
  //    const p = new Path('/api/surveys:surveyId/:choice')
  //  const events = _.map(req.body, ({ url, email }) => {
  //  const match = p.test(new URL(url).pathname)
  //  if (match) {
  //    return { email, surveyId: match.surveyId, choice: match.choice }
  //  }
  //  })
  //  console.log('events:', events)
  // returns only elements not undefined
  //    const compactEvents = _.compact(events)
  //    const uniqueEvents = _.uniqBy(compactEvents, 'email', surveyId)
  //    console.log('uniqueEvents:', uniqueEvents)
  //  res.rend({})
  //  })

  // refacator using lodash chain
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // mongo operators
            // evaluate the value of choice at runtime and update with the yes or // NOTE:
            // increment by 1
            $inc: { [choice]: 1 },
            // updates the responded property to true by looking at the recipient by index
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey))

    try {
      await mailer.send()
      // save the survey
      await survey.save()
      // minus a credit
      req.user.credits -= 1
      // save the user from the req
      const user = await req.user.save()
      // send back the res with the updated user
      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
