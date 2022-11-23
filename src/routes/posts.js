var express = require('express');
var db = require('../helpers/db');
var router = express.Router();
var auth = require('../helpers/auth');

// TODO
// GET
router.get('/', function(request, response, next) {
    db.connection.query('SELECT * FROM posts', (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// GET /:id
router.get('/:id', function(request, response, next) {
    db.connection.query('SELECT * FROM posts WHERE id = ' + request.params.id, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// POST {add post}
router.post('/', auth.verifyToken, function(request, response, next) {
    db.connection.query('INSERT INTO posts (author_id, text, title) VALUES ('
      + request.body.author_id + ', \'' + request.body.text + '\', \'' + request.body.title + '\');', (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// DELETE { post }
router.delete('/:id', auth.verifyToken, function(request, response, next) {
  db.connection.query('DELETE FROM posts WHERE id = ' + request.params.id + ';', (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});

// PUT { post } to change password

module.exports = router;