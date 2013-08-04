var Device = require('./lib/device')
  , util = require('util')
  , stream = require('stream')
  , configHandlers = require('./lib/config-handlers');

// Give our driver a stream interface
util.inherits(dsDriver,stream);

// should be an option, but for now
// /dev/mmcblk0p2   3736512 1026724   2522448  29% /
// variable used in grep to filter down - 
// for example for my mac the filter is s2 for the main drive
// in theory you could mount other network drives and monitor those too
// e.g. my macbook is 0s2
// e.g. my NB is 0p2
var disk_to_watch = '0p2';  
var default_poll_interval = 300;

// Enable/disable driver
var enabled = true;

// Our greeting to the user.
var HELLO_WORLD_ANNOUNCEMENT = {
  "contents": [
    { "type": "heading",      "text": "Ninja Diskspace Monitor Loaded" },
    { "type": "paragraph",    "text": "The Ninja Diskspace Monitor has been loaded. You should not see this message again." }
  ]
};

/**
 * Called when our client starts up
 * @constructor
 *
 * @param  {Object} opts Saved/default driver configuration
 * @param  {Object} app  The app event emitter
 * @param  {String} app.id The client serial number
 *
 * @property  {Function} save When called will save the contents of `opts`
 * @property  {Function} config Will be called when config data is received from the Ninja Platform
 *
 * @fires register - Emit this when you wish to register a device (see Device)
 * @fires config - Emit this when you wish to send config data back to the Ninja Platform
 */
function dsDriver(opts,app) {

  var self = this;
  this.opts = opts;

  app.on('client::up',function(){

  if (enabled)
    {    // The client is now connected to the Ninja Platform

        // Check if we have sent an announcement before.
        // If not, send one and save the fact that we have.
        if (!opts.hasSentAnnouncement) {
          self.emit('announcement',HELLO_WORLD_ANNOUNCEMENT);
          opts.hasSentAnnouncement = true;
          opts.poll_interval = default_poll_interval;
          opts.disk_string = disk_to_watch;
          self.save();
        }

        if (!opts.disk_string) {
          opts.platform = process.platform

          if (process.platform == 'darwin') 
           {opts.disk_string = '0s2'} 
          else if (process.platform =='win32')
            {opts.disk_string = 'c:'}
          else 
            {opts.disk_string = '0p2'}
          self.save();
        }
        // Register a device
        self.emit('register', new Device(app, opts));
    }
  });
};

/**
 * Called when a user prompts a configuration.
 * If `rpc` is null, the user is asking for a menu of actions
 * This menu should have rpc_methods attached to them
 *
 * @param  {Object}   rpc     RPC Object
 * @param  {String}   rpc.method The method from the last payload
 * @param  {Object}   rpc.params Any input data the user provided
 * @param  {Function} cb      Used to match up requests.
 */
dsDriver.prototype.config = function(rpc,cb) {

  var self = this;
  // If rpc is null, we should send the user a menu of what he/she
  // can do.
  // Otherwise, we will try action the rpc method
  if (!rpc) {
    return configHandlers.menu.call(this,this.opts.disk_string,opts.poll_interval,cb);
  }
  else if (typeof configHandlers[rpc.method] === "function") {
    return configHandlers[rpc.method].call(this,this.opts,rpc.params,cb);
  }
  else {
    return cb(true);
  }
};


// Export it
module.exports = dsDriver;
