const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');
const error04 = require('./controllers/error');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
// app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin', adminRoutes.routes);
app.use(shopRoute);
app.use('/', error04.error404)

app.listen(3000);