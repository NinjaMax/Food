const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRouters = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); //regestriruem Handle bars
app.set('view engine', 'hbs'); //ustanavlivaem ispolzuem Handlebars
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(homeRoutes);
app.use('/add',addRouters);
app.use('/courses', coursesRoutes);

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

app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
});