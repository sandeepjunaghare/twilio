exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Place holder for call recording');
  callback(null, twiml);
};
