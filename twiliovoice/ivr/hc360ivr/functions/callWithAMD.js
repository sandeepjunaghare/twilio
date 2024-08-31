exports.handler = function (context, event, callback) {
  const twilio = require('twilio');

  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello! Lets connect you to the provider');

  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  // Validate event.to
  /*
  if (!event.To) {
    //twiml.say('To parameter is missing');
    const errorResponse = new Twilio.twiml.VoiceResponse();
    errorResponse.say('Error To response parameter is missing');
    callback(null, errorResponse);
    return;
  }
  
  if (!context.To) {
    //twiml.say('To parameter is missing');
    const errorResponse = new Twilio.twiml.VoiceResponse();
    errorResponse.say('Error To response parameter is missing.');
    callback(null, errorResponse);
    return;
  }
*/
  // Make the call
  client.calls
    .create({
      from: event.From,
      machineDetection: 'Enable',
      to: '+12145375356',
      url: 'https://hc360ivr-2123-dev.twil.io/detectAnsweringMachine',
    })
    .then((call) => {
      twiml.say('Call initiated');
      callback(null, twiml);
    })
    .catch((error) => {
      //console.error('Error making the call: ', error);
      const errorResponse = new Twilio.twiml.VoiceResponse();
      errorResponse.say('There was an error initiating the call.');
      callback(null, errorResponse);
    });

  //callback(null, twiml);
};
