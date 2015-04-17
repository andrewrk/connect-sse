module.exports = function () {
  return function sse(req, resp, next){
    var message_count;
    req.socket.setTimeout(0);
    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'text/event-stream');
    resp.setHeader('Cache-Control', 'no-cache');
    resp.setHeader('Connection', 'keep-alive');
    message_count = 0;
    resp.json = function(obj, type){
      resp.write("id: " + message_count + "\n");
      if('string' === typeof type) {
        resp.write("event: " + type + "\n");
      }
      resp.write("data: " + JSON.stringify(obj) + "\n\n");
      message_count += 1;
    };
    next();
  };
};
