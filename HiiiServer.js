var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });


  c.on('data', function(data) {
        
        console.log('DATA ' + c.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        c.write('Erkan said to me "' + data + '"');
        
    });

  
  c.pipe(c);
});
server.listen(8181, function() { //'listening' listener
  console.log('server bound');
});