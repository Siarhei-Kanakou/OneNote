var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888,
    mime = require('mime'), // for content type
 
    basePath = process.argv[3] || './'; // root of the application
 
http.createServer(function(request, response) {
 
  var relativePath = url.parse(request.url).pathname,
  absolutePath = path.join(process.cwd(), basePath, relativePath);//relative path
  //absolutePath = path.join(basePath, relativePath);
 
  console.log('Requested path: ' + absolutePath);
 
  path.exists(absolutePath, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(absolutePath).isDirectory()) absolutePath += '/index.html';
 
    fs.readFile(absolutePath, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      var mimeType = mime.lookup(absolutePath);
 
      response.writeHead(200, {'Content-Type': mimeType});
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");