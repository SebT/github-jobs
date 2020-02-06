const http = require("http");
const url = require("url");

module.exports = function({ port }) {
  return http
    .createServer(async function(request, response) {
      const pathName = url.parse(request.url).pathname;
      console.log("GET " + pathName);

      if (pathName === "/api") {
        response.write("Hello world");
      } else {
        response.writeHead(404, { "Content-type": "text/plain" });
        response.write("Not Found");
      }

      response.end();
    })
    .listen(port);
};
