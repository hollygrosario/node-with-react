const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
  constructor ({ subject, recipients }, content) {
    super()
    this.from_email = new helper.Email('hollygrosario@gmail.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    // register the body as the content of the email
    this.addContent(this.body)
    // add click tracking
    this.addClickTracking()
    // implement add recipients
    this.addRecipients()
  }

  // helper functions
  // format the recipients address
  formatAddresses (recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email)
    })
  }

  // add click tracking
  addClickTracking () {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings = new helper.TrackingSettings()
    this.addTrackingSettings(trackingSettings)
  }
}

module.exports = Mailer
