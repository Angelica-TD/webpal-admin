const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const newRouter = require('./routes/new');
const allProductsRouter = require('./routes/all-products');
const singleProductRouter = require('./routes/view-product');
const deleteProductRouter = require('./routes/delete-product');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/delete-product', deleteProductRouter);
app.use('/all-products', allProductsRouter);
app.use('/view-product', singleProductRouter);

module.exports = app;
