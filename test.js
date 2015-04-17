var sse, express, app, EventSource, http, assert;

sse = require('./index')();
express = require('express');
EventSource = require('eventsource');
http = require('http');
assert = require('assert');

app = express();
server = http.createServer(app);

app.get('/events', sse, function (req, res) {
  res.json("this is an event");
  setTimeout(function() {
    res.json({here: "is", another: "event"});
    res.json({here: "is a named event", to: "listen with addEventListener('example', function(){})"}, "example");
  }, 100);
});

process.stdout.write("start server...");
server.listen(0, 'localhost', function() {
  var expected_messages, url, source;

  console.log("OK");
  process.stdout.write("checking messages...");

  url = "http://localhost:" + server.address().port + "/events";
  source = new EventSource(url);

  source.onerror = function(error) {
    assert(false, error);
  };
  message_validators = [
    function (msg) {
      assert(msg === "this is an event");
    },
    function (msg) {
      assert(msg.here === "is");
      assert(msg.another === "event");
    },
    function (msg) {
      assert(msg.here === "is a named event");
      assert(msg.to === "listen with addEventListener('example', function(){})");
    }
  ];
  source.onmessage = function(e) {
    var validate;
    validate = message_validators.shift();
    validate(JSON.parse(e.data));
    process.stdout.write('.');
  };
  source.addEventListener("example", function(e) {
    var validate;
    validate = message_validators.shift();
    validate(JSON.parse(e.data));
    process.stdout.write('.');
    if (message_validators.length === 0) {
      console.log("OK");
      source.close();
      server.close();
    }
  });
});
