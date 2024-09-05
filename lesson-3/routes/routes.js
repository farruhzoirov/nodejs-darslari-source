const express = require('express');
const path = require('path');

const router = express.Router();

// POST
router.post('/message',(req, res, next) => {
  console.log(req.body);
  // res.statusCode = 302;
  // res.setHeader('Location', '/')
  res.redirect('/add/')
});


router.use('/',(req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));


});

module.exports = router;