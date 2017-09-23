// Find your account sid and auth token in your Twilio account Console.

var twilio = require('twilio');
var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function sendText(number, content) {
  // Send the text message.
  client.messages.create({
    body: content,
    to: number,  // Text this number
    from: process.env.TWILIO_NUMBER // From a valid Twilio number
  })
  .then(message => console.log(message.sid));
}
console.log('sendText', sendText)
module.exports = sendText
