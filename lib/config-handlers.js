var configMessages = require('./config-messages');

/**
 * Called from the driver's config method when a
 * user wants to see a menu to configure the driver
 * @param  {Function} cb Callback to send a response back to the user
 */
exports.menu = function(opts_string,cb) {
  var returnMenu = configMessages.menu;
  returnMenu.contents[2].value = opts_string;
  cb(null,configMessages.menu);
};

/**
 * Called when a user clicks the 'Echo back to me'
 * button we sent in the menu request
 * @param  {Object}   params Parameter object
 * @param  {Function} cb     Callback to send back to the user
 */
exports.echo = function(opts,params,cb) {

  var echoText = params.echoText;
  var payloadToSend = configMessages.echo;
  opts.disk_string = params.disk_string;
  opts.poll_interval = params.poll_interval;
  this.save();

  if (payloadToSend.contents[1] && payloadToSend.contents[2]) {
      payloadToSend.contents[1].text = params.disk_string;
      payloadToSend.contents[2].text = params.poll_interval;
  } else if (payloadToSend.contents[1] && !payloadToSend.contents[2]) {
      payloadToSend.contents[1].text = params.disk_string;
  } else if (payloadToSend.contents[2] && !payloadToSend.contents[1]) {
      payloadToSend.contents[2].text = params.poll_interval;
  } else {
      payloadToSend.contents.push({ "type": "paragraph", "text": params.disk_string });
      payloadToSend.contents.push({ "type": "paragraph", "text": params.poll_interval })
      payloadToSend.contents.push({ "type": "close"    , "name": "Close" });
  }

  cb(null,payloadToSend);
};
