const express=require('express');
const socketIO=require('socket.io');

const path=require('path');
const http=require('http');
var {generateMsg}=require('./message')

var publicPath=path.join(__dirname,'/../public');
var app=express();
var server=http.createServer(app);
var port=process.env.PORT || 3000;
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("User added");

    socket.broadcast.emit('newUser',generateMsg("Admin","New user Added"));

    socket.on('newMsg',(msg)=>{
        console.log("Message : ",msg);
        io.emit('newMsg',generateMsg(msg.from,msg.text));
    })

    socket.on('disconnect',()=>{
        console.log('Disonnected');
    });
});

server.listen(port,()=>{
    console.log(`Server started on ${port}`);

});