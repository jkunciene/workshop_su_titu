const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { readdirSync } = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


const routeFiles = readdirSync('./routes').filter((file) => file.endsWith('.route.js'));

for(const routeFile of routeFiles){
    console.log(routeFile)
    const route = require(`./routes/${routeFile}`)
    //route => /chanel 
    //router => tures metodus get() post()
    app.use(route.route, route.router)
}

//socket kanalai (server code)

io.on('connection', (socket) =>{
    console.log('new socket connection');

    socket.on('message', (username, msg)=>{
        console.log(`Received message: [${username}] : ${msg}`);
        io.emit('receivedMessage', username, msg);
    });


});



//klausom serverio paskutinis
server.listen(8000, ()=>{
    console.log("Server is alive")
});

