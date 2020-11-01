const express = require('express');
const apolloServer = require('./apollo-config');
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors')

const app = express();
var date = new Date();
//App Security Config
// app.use(helmet({
//   contentSecurityPolicy:false,
//   cors:{
//     allowFrom: ['*']
//   }
// }));

// Cors config
app.use(cors())

// Logger Config
app.use(morgan('combined'))

// Apollo Config load
apolloServer.applyMiddleware({app:app,path:'/api'});

// Basic Server Status
function sendLive(req,res){
    res.send({name:'COCKTAIL-API', createdAt: date});
}
app.get('/', (req, res) => sendLive(req,res));
app.get('/live', (req, res) => sendLive(req,res));
app.get('/ping', (req, res) => sendLive(req,res));


//Global Exception Handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });


//Server Starter
app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);

//Gracefull Shutdown
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      debug('HTTP server closed')
    })
  })