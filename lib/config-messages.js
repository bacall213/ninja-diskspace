exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja Diskspace Monitor"},
    { "type": "paragraph", "text": "You can choose which drive you want to monitor and how often you want to monitor it. \n\r The drive in an official Ninja Block is typically going to be 0p2. \n\r The identifier will vary based on the Ninja platform. Use `df -k` to find the one appropriate for your system."},
    { "type": "input_field_text", "field_name": "disk_string", "value": "", "label": "Disk to Monitor", "required": true},
    { "type": "input_field_text", "field_name": "poll_interval", "value": "300", "label": "Update frequency (in seconds)", "required": true},
    { "type": "submit", "name": "Save disk to monitor", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "The Ninja Diskspace Monitor will update disk usage on the following drive, every x seconds: "}
  ]
};
