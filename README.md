[![Build Status](https://secure.travis-ci.org/andrewrk/connect-sse.png)](http://travis-ci.org/andrewrk/connect-sse)

Usage:
------

```js
var sse = require('connect-sse')();
var express = require('express')

var app = express()
app.get('/events', sse, function (req, res) {
  res.json("this is an event");
  res.json({here: "is", another: "event"});
  res.json({here: "is a named event", to: "listen with addEventListener('example', function(){})"}, "example");
});
```
