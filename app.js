if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Category = require('./models/category');
const User = require('./models/user');
const morgan = require('morgan');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const listRoutes = require('./routes/list');
const shopRoutes = require('./routes/shops');





const Product = require('./models/product');
const Price = require('./models/price');
const Shop = require('./models/shop');
const List = require('./models/list');



mongoose.connect('mongodb://localhost:27017/shopList', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/products/:id/reviews', reviewRoutes);
app.use('/list', listRoutes);
app.use('/shops', shopRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

katigories = { 'Φρούτα & Λαχανικά': [String], 'Κρέας & Ψάρι': [String], 'Γαλακτοκομικά & Είδη Ψυγείου': [String], 'Είδη Κατάψυξης': [String], 'Είδη Οικιακής': [String], 'Είδη Παντοπωλείου': [String], 'Τρόφιμα': [String], 'Κάβα': [String], 'Κατοικίδια': [String], 'Υγιεινή': [String] }

app.get('/categories', async (req, res) => {
    const categories = await Category.find({});
    res.render('categories', { katigories });
})

app.get('/categories/:cat', async (req, res) => {
    const products = await Product.find({ category: req.params.cat });
    const chosenCategory = req.params.cat
    res.render('categories', { products, chosenCategory });
})






app.get('/home/user/Desktop/thesis/images/:name', function (req, res) {

    res.sendFile(tempPath);
    tempPath = "";
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Η σελίδα δε βρέθηκε!', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Κάτι πήγε στραβά!'
    }
    res.status(statusCode).render('error', { err });
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})