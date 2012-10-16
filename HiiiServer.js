

// TCP Configuration
var HOST_HS='127.0.0.1';
var PORT_HS=8181;
var REMOTEPORT_HC=8181;

//DEVELOPMENT Configuration
var DEV_MODE='DEBUG';


// Requirements
var net = require('net');


// Keep track of the chat clients
var clients=[];


 

var server = net.createServer(function(c) { //'connection' listener
   
 
   // An id for this new incoming clients
   c.id=c.remotePort;
   clients.push(c) ;
   console.log("Aktif kullanıcı sayısı:"+ clients.length);
  

  
   // for test purposes begin (write all clients when new one connected)
   var index=0;
   clients.forEach(function (client) {
      index++;
      console.log(index+"."+client.id);
      
    });
   index=0;
   // for test purposes end

   console.log(c.id +' connected');


   
   c.on('end', function() {

    clients.splice(clients.indexOf(c), 1);
    console.log(c.id +' disconnected');
  });


  c.on('data', function(data) {
          

      
          // when new data received, it may be one of theese possibilty, for the time being,pls modify if you think better solution or
          // some extra possiblty

          // 1.first message of a peer who want to chat, so it hasn't got "chat id"
          // 2.a peer who has got a "chat id", route its message to its buddy.

        // Write the data back to the socket, the client will receive it as data from the server
        
       
         foreachstop=0;
        // console.log("Aktif kullanıcı sayısı:"+ clients.length);
  
         if(clients.length<2){
          c.write("Merhaba, sohbet etmek isteyen kimse yok.");
       
          }
        else
        {
          //clients[Math.round((Math.random()*clients.length)+1)].write("Seni sectim pikacu");
 
           
            clients[getBuddy(c)].write(c.id+"-->"+data);
           
           var temp;
         
          
        
        }


    });


  c.pipe(c);
});
server.listen(PORT_HS,HOST_HS, function() { //'listening' listener
  console.log('server bound');
});

function getBuddy(client)
{
  foreachstop=Math.floor(Math.random()*clients.length);

  if(DEV_MODE==='DEBUG'){
           console.log("Random number generated:"+ foreachstop+"Clients count:"+clients.length); 
           }

 while (true)
            {

              if(clients[foreachstop]===client)
              {
                if(DEV_MODE==='DEBUG'){
                 console.log("random number:"+foreachstop+"new rumber will be generated due to collision"); 
                 }

                foreachstop=Math.floor(Math.random()*clients.length);

                if(DEV_MODE==='DEBUG'){
                 console.log("new random number:"+foreachstop); 
                 }
              }
              else{
              
               return foreachstop;
               if(DEV_MODE==='DEBUG'){
                 console.log("return random:"+foreachstop); 
                 }

             }
            }

        return null;    
}
