module.exports = function () {
  return function sse(req, resp, next){
    req.socket.setTimeout(Infinity);
    resp.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    var messageCount = 0;
    resp.json = function(obj){
      resp.write("id: " + messageCount + "\n");
      resp.write("data: " + JSON.stringify(obj) + "\n\n");
      messageCount += 1;
    };
    next();
  };
};
