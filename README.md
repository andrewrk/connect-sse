Usage:
------

```javascript
var sse, express, app;

sse = require('connect-sse');
express = require('express')

app = express()
app.get('/events', sse, function (req, res) {
  req.json("this is an event");
  req.json({here: "is", another: "event");
});
```
