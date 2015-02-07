module.exports = function () {
  return function sse(req, resp, next){
    var message_count;
    req.socket.setTimeout(0);
    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'text/event-stream');
    resp.setHeader('Cache-Control', 'no-cache');
    resp.setHeader('Connection', 'keep-alive');
    message_count = 0;
    resp.json = function(obj){
      resp.write("id: " + message_count + "\n");
      resp.write("data: " + JSON.stringify(obj) + "\n\n");
      message_count += 1;
    };
    next();
  };
};
