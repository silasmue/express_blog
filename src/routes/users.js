var express = require('express');
var db = require('../helpers/db');
var router = express.Router();
var auth = require('../helpers/auth');
var jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "secret"; // auth wie bei https://jsramblings.com/authentication-with-node-and-jwt-a-simple-example/


/* GET users listing. */
router.get('/', auth.verifyToken, function(request, response, next) {
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

router.get('/:id', auth.verifyToken, function(request, response, next) {
  db.connection.query('SELECT * FROM users WHERE id = ' + request.params.id, (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});

// POST {add user}

router.post('/', auth.verifyToken, function(request, response, next) {
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
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }
    if(res.length == 0) {
      response.sendStatus(401);
    }
    else if(res.length == 1) {
      const payload = {
        name: res[0].name,
        password: "secret",
        id: res[0].id,
        email: res[0].email,
      };
      console.log(payload)
      response.json({
        token: auth.createToken(payload)
      });
    }
    else response.sendStatus(500);
  });
});

module.exports = router;
