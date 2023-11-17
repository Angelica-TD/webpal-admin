const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const newRouter = require('./routes/new');
const allProductsRouter = require('./routes/all-products');
const singleProductRouter = require('./routes/view-product');
const deleteProductRouter = require('./routes/delete-product');
const updateProductRouter = require('./routes/update-product');


const app = express();

app.use(cookieParser());
app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'hoooooo',
        cookie: { maxAge: 5000 }
    }));

app.use(flash());

app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

//static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/delete-product', deleteProductRouter);
app.use('/all-products', allProductsRouter);
app.use('/view-product', singleProductRouter);
app.use('/update-product', updateProductRouter);

module.exports = app;
