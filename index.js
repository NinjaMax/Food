const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore =require('connect-mongodb-session')(session);
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRouters = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const ordersRoutes = require('./routes/orders');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const authRoutes = require('./routes/auth');

const app = express();
const MONGODB_URI = 'mongodb+srv://Max:wquJbgh3*rrV_7N@cluster0.zkp1e.mongodb.net/Shop';

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new MongoStore({
    collection: 'session',
    uri: MONGODB_URI
});


const password = 'wquJbgh3*rrV_7N';



app.engine('hbs', hbs.engine); //regestriruem Handle bars
app.set('view engine', 'hbs'); //ustanavlivaem ispolzuem Handlebars
app.set('views', 'views');

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('61437b201af46fffa3030c30');
//         req.user = user;
//         next();
//     } catch (e) {
//         console.log(e);
//     }   
// });

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRoutes);
app.use('/add', addRouters);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

//app.get('/', (req, res) => {
    //res.status(200); // ne obyazatelno
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
   
//});
//app.get('/add', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'about.html'));
  
//});

//app.get('/courses', (req, res) => {
  
//});
const PORT = process.env.PORT || 3000;
async function start() {
try {       
    
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

    // const candidate = await User.findOne();
    // if(!candidate) {
    //     const user = new User({
    //         email: 'unitigrand@gmail.com',
    //         name: 'Max',
    //         cart: {items: []}
    //     });
    //     await user.save();
    // }
    app.listen(PORT, () => {
        console.log(`Server is runnig on port ${PORT}`);
    });
} catch (e) {
    console.log(e);
    }  
}
start();



