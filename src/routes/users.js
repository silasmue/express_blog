var express = require('express');
var db = require('../helpers/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next) {
  db.connection.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});

// TODO 
// GET /:id

router.get('/:id', function(request, response, next) {
  db.connection.query('SELECT * FROM users WHERE id = ' + request.params.id, (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});

// POST {add user}

router.post('/', function(request, response, next) {
  db.connection.query('INSERT INTO users (email, password, name) VALUES (\''
    + request.body.email + '\', \'' + request.body.password + '\', \'' + request.body.name + '\');', (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});

// DELETE { user }
// PUT { user } to change password
// auth mit cookie middleware

router.post('/auth', function(request, response, next) {
  db.connection.query('SELECT * FROM users WHERE name LIKE \'' + request.body.name + '\' AND password LIKE \'' + request.body.password + '\';', (err, res) => {
    console.log(request.body)
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }
    if(res.length == 0) {
      response.sendStatus(401);
    }
    else if(res.length == 1) {
      response.send(res[0]);
    }
    else response.sendStatus(500);
  });
});

module.exports = router;
