exports.handler = function (context, event, callback) {
  const twilio = require('twilio');
  const VoiceResponse = twilio.twiml.VoiceResponse;

  const response = new VoiceResponse();
  const answeredBy = event.AnsweredBy;

  if (answeredBy === 'machine_start') {
    // Redirect to the pre-recorded message if a machine is detected
    response.play(
      'https://handler.twilio.com/twiml/EH340e232fe4bd93a4887cb5df75e17ea3'
    );
  } else {
    // Proceed with a normal call flow if a human is detected
    response.say('Your Provider is on the line.');
    response.pause({ length: 2 });
    response.say('Please wait while we connect you to the call.');
  }

  callback(null, response);
};
