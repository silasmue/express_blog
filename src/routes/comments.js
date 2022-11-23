var express = require('express');
var { expressjwt: jwt } = require('express-jwt');
var db = require('../helpers/db');
var router = express.Router();

// TODO
// GET
router.get('/', function(request, response, next) {
    db.connection.query('SELECT * FROM comments', (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// GET /:id
router.get('/:id', function(request, response, next) {
    db.connection.query('SELECT * FROM comments WHERE id = ' + request.params.id, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// GET /:post
router.get('/post/:id', function(request, response, next) {
    db.connection.query('SELECT * FROM comments WHERE post_id = ' + request.params.id, (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// POST {add comment} // comment author_id
router.post('/', auth.verifyToken, jwt({ secret: "secret", algorithms: ["HS256"] }), function(request, response, next) {
    db.connection.query('INSERT INTO comments (post_id, author_id, text) VALUES ('
      + request.body.post_id + ', ' + request.body.author_id + ', \'' + request.body.text + '\');', (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});

// DELETE { comment }
router.delete('/:id', auth.verifyToken, function(request, response, next) {
  db.connection.query('DELETE FROM comments WHERE id = ' + request.params.id + ';', (err, res) => {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    }

    response.send(res);
  });
});
// PUT { comment } to change password

module.exports = router;