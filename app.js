const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);//this line actually 
//creates https server but you can pass 
//request handler, so we have just passed express server 
//so that we can handler other things in the same way as express
const io = socketio(server);//this line actually enable http 
//server with socket type of communications.


app.use('/',express.static(path.join(__dirname,'/public')));
/*app.get('/',(req,res)=>{
    console.log('Home Sweet Home Page');
    res.send('Home Sweet Home Page');
})
*/

const users = {}

io.on('connection',(socket)=>{

    socket.on('login',(data)=>{
        users[socket.id]=data.name
    })

    socket.on('send_msg',(data)=>{

        io.emit('received_msg',{
            mssg:data.msg,
            name:users[socket.id]
        })
    })
    
})



server.listen(process.env.PORT || 3001,()=>{
    console.log('localhost is running on 3001 port');
})