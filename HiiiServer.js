

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
var unattached=[];


 

var server = net.createServer(function(c) { //'connection' listener
   
 
   // An id for this new incoming clients
   c.id=c.remotePort;
   
 
   
   clients.push(c) ;
   
  
  

  
   // for test purposes begin (write all clients when new one connected)
   var index=0;
   clients.forEach(function (client) {
      index++;
      
      
    });
   index=0;
   // for test purposes end

   console.log(c.id +' connected');

    
   
   c.on('end', function() {

    clients[clients.indexOf(c)].target=null;
    clients.splice(clients.indexOf(c), 1);

    console.log(c.id +' disconnected');
  });


  c.on('data', function(data) {
          
          console.log('data has come from'+c.id );
      
               

          // when new data received, it may be one of theese possibilty, for the time being,pls modify if you think better solution or
          // some extra possiblty

          // 1.first message of a peer who want to chat, so it hasn't got "chat id"
          // 2.a peer who has got a "chat id", route its message to its buddy.

        // Write the data back to the socket, the client will receive it as data from the server
        

       
         randombuddy=0;
        
        // console.log("Aktif kullanıcı sayısı:"+ clients.length);
        
         if(clients.length<2){
          c.write("Sorry, we havent got any buddy to chat..");
       
          }
        else
        {
          
         if(c.target!==undefined){

          console.log("-----------------------");
           console.log("Sender id:"+c.id);
           console.log("Receiver id:"+c.target.id);
    
          c.target.write(data);

         }
         else{
            randomclient=getBuddy(c);
            
           if(randomclient===-1){
              c.write("Sorry, we havent got any buddy to chat..");
           }
           else{

            console.log("istenen client:"+randomclient);
            console.log(clients[randomclient]);
            clients[randomclient].write(data);
            
            clients[randomclient].target=c; 
           //c.target=clients.slice(randomclient,randomclient+1);
              c.target=clients[randomclient];
           
              removeByValue(unattached,c);
              removeByValue(unattached,clients[randomclient]);

            }
          }


        }


    });


  c.pipe(c);
});
server.listen(PORT_HS,HOST_HS, function() { //'listening' listener
  console.log('server bound');
});


// this method remove an element from array by value
function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}


//this method choose right person, who havent got any target 
function getBuddy(client)
{
     
     /* DECISION STEPS  auth: Mustafa last modified: 18.10.2012_v-01
        1. Get clients who hasn't got target object
        2. Choose a client index randomly 
    */

  

    for (var i=0,l=clients.length; i<l; i++){  
            
        if(clients[i].target===undefined){
            if(client!==clients[i]){
            unattached.push(i);
          }
         }

     }   


     if(unattached.length<1){
           unattached.splice(0,unattached.length);
      
        return -1; 
     }
     else{
          

          randombuddy=Math.floor(Math.random()*unattached.length);
          randombuddy=unattached[randombuddy];
          unattached.splice(0,unattached.length);
        
          return   randombuddy;
     }

    


}
