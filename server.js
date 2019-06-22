const express = require('express');
const morgan = require('morgan');

const marsRouter = require('./routes/mars-photos');

const app = express();

const { PORT } = require('./config');

app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});

app.use(express.json());

app.use('/api/mars', marsRouter);

let server;
function runServer(port = PORT) {
  return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };