exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja Diskspace Monitor"},
    { "type": "paragraph", "text": "You can choose which drive you want to monitor the usage on and how often you want it to be updated (in seconds). \n\rThe drive in an official Ninja Block is typically going to be '0p2'. \n\r The identifier will vary based on the Ninja platform. Use 'df -k' (Linux, Mac) or 'My Computer' (Windows) to find the one appropriate for your system."},
    { "type": "input_field_text", "field_name": "disk_string", "value": "", "label": "Disk to Monitor", "required": true},
    { "type": "input_field_text", "field_name": "poll_interval", "value": "", "label": "Update interval (in seconds)", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings Saved!"}
  ]
};


/* "type": "paragraph", "text": "The Ninja Diskspace Monitor will udpate disk usage on the following drive, every x seconds: " }
*/
