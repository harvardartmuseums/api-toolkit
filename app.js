var express = require('express');
var exphbs  = require('express-handlebars');
var fetch = require('node-fetch')
var _  = require('lodash');
var app = express();
var hbs = exphbs.create({ /* config */ });
var Tabulator = require('tabulator-tables');

const path = require('path');

const API_KEY = '67669ae0-b77e-11e8-bf0e-e9322ccde4db';


hbs.getPartials(__dirname + 'views/partials')

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/1', function (req, res) {
    res.render('1_museum_data');
});

app.get('/2', function (req, res) {
    res.render('2_api');
});

app.get('/3', function (req, res) {
    res.render('3_ham_api');
});

app.get('/4', function (req, res) {
    res.render('4_getting_started');
});

app.get('/5', function (req, res) {
    res.render('5_interpret_data');
});

app.get('/6', function (req, res) {
    res.render('6_manipulate_data');
});

app.get('/table', function (req, res) {
    res.redirect('/century');
});

app.get('/endpoints', function (req, res) {
    res.render('endpoints', {title: 'Endpoints Information'});
});

app.get('/culture', function(req, res) {
  const url = `https://api.harvardartmuseums.org/culture/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc']);
      res.render('table', {title: 'Cultures',
                            records: records})
    })
});

app.get('/color', function(req, res) {
  const url = `https://api.harvardartmuseums.org/color/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc']);
      res.render('table', {title: 'Colors',
                            records: records})
    })
});

app.get('/century', function(req, res) {
  const url = `https://api.harvardartmuseums.org/century/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc']);
      res.render('table', {title: 'Centuries',
                            records: records})
    })
});

app.get('/classification', function(req, res) {
  const url = `https://api.harvardartmuseums.org/classification/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc']);
      res.render('table', {title: 'Classifications',
                            records: records})
    })
});

app.get('/period', function(req, res) {
  const url = `https://api.harvardartmuseums.org/period/?size=400&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc'])
      res.render('table', {title: 'Periods',
                            records: records})
    })
});

app.get('/place', function(req, res) {
  const url = `https://api.harvardartmuseums.org/place/?size=3000&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc'])
      res.render('table', {title: 'Places',
                            records: records})
    })
});

app.get('/technique', function(req, res) {
  const url = `https://api.harvardartmuseums.org/technique/?size=400&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc'])
      res.render('table', {title: 'Techniques',
                            records: records})
    })
});

app.get('/worktype', function(req, res) {
  const url = `https://api.harvardartmuseums.org/worktype/?size=500&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, ['name'], ['asc'])
      res.render('table', {title: 'Worktypes',
                            records: records})
    })
});


app.listen(3000);
