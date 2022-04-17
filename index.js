const path = require('path')
const express = require('express');
const { engine } = require('express-handlebars');

const restaurantsRouter = require('./routes/restaurants');
const indexRouter = require('./routes');

const logger = require('./middleware/logger')

const app = express();

//Template engines
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

//Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Custom middleware
app.use(logger);

//Routes
app.use('/apis/restaurants', restaurantsRouter)
app.use('/',indexRouter)


app.listen(3000, () => {
    console.log('Listening to port 3000')
});