const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Routes
const routes = require('./routes/routes');


app.use(express.urlencoded({extended: false}));
// false -  Oddiyroq obyektlarni parse qilish uchun
// true - Murakkabroq nested(ichma-ich) bo'lgan obyektlarni parse qilish uchun


// /add/

app.use('/add',routes);

app.listen(5000);
