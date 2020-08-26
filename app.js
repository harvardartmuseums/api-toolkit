// load application specific environment variables
require('dotenv').config();

var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var hbs = exphbs.create({ /* config */ });
var Tabulator = require('tabulator-tables');
var indexRouter = require('./routes/index');

const path = require('path');

hbs.getPartials(__dirname + 'views/partials')

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.listen(process.env.PORT || '3000');
