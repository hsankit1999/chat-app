var socket=io();

socket.on('connect',function(){
    console.log('Connected');
});

socket.on('newUser',function(text){
    console.log(text.text);
});


socket.on('newMsg',function(msg){
    console.log(msg);
    /*var createdAt=new Date().getTime();

    $('#page').append(`<li>${msg.from} ${time}:: ${msg.text}</li>`);
    */
    var time=moment().format("hh:mm a");
    var template=$('#message-template').html();
    var html=Mustache.render(template,{
        text:msg.text,
        from:msg.from,
        time
    });
    $("#page").append(html);
})

socket.on('disconnect',function(){
    console.log("User disconnected");
});

$(document).ready(function(){

    $('#message-form').on('submit',function(e){
        e.preventDefault();
        var text=$('[name=chat]').val();

        socket.emit('newMsg',{
            from:"Ankit",
            text,

        });
    });

    $("#loc").on("click",function(){
        if(!navigator.geolocation){
            return alert("Location is not enabled");
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos);
        })
    });
});