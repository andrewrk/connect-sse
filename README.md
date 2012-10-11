Usage:
------

```javascript
var sse, express, app;

sse = require('connect-sse')();
express = require('express')

app = express()
app.get('/events', sse, function (req, res) {
  res.json("this is an event");
  res.json({here: "is", another: "event"});
});
```
