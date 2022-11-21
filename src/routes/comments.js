var express = require('express');
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

// POST {add comment}
router.post('/', function(request, response, next) {
    db.connection.query('INSERT INTO comments (post_id, text) VALUES ('
      + request.body.post_id + ', \'' + request.body.text + '\');', (err, res) => {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      }
  
      response.send(res);
    });
});
// DELETE { comment }
// PUT { comment } to change password

module.exports = router;