const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../../server/services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
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
