var express = require('express');
var router = express.Router();

/* chatting... */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/chat.html');
});

module.exports = router;
