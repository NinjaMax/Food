const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRouters = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

const password = 'wquJbgh3*rrV_7N';



app.engine('hbs', hbs.engine); //regestriruem Handle bars
app.set('view engine', 'hbs'); //ustanavlivaem ispolzuem Handlebars
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRouters);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

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
    const url = 'mongodb+srv://Max:wquJbgh3*rrV_7N@cluster0.zkp1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    await mongoose.connect(url, {useNewUrlParser: true});
    app.listen(PORT, () => {
        console.log(`Server is runnig on port ${PORT}`);
    });
} catch (e) {
    console.log(e);
    }  
}
start();



