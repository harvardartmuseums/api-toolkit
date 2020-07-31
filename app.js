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
    res.render('3_examples');
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

app.get('/labels', function (req, res) {
    res.redirect('/century');
});

app.get('/resources', function (req, res) {
    res.render('resourceguide', {title: 'Resources Guide'});
});

app.get('/culture', function(req, res) {
  const description = "The Culture label records from which culture an artwork was created.";
  const url = `https://api.harvardartmuseums.org/culture/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc']);
      res.render('resourcelabels', {title: 'Cultures',
                            records: records,
                            description: description})
    })
});

app.get('/medium', function(req, res) {
  const description = "The Medium label records the materials that are applied in the making of an artpiece. This information is oftentimes provided by the Harvard Art Museums' conservators as a result of their expertise, technical examination, and/or analysis.";
  const url = `https://api.harvardartmuseums.org/medium/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc']);
      res.render('resourcelabels', {title: 'Mediums',
                            records: records,
                            description: description})
    })
});

app.get('/century', function(req, res) {
  const description = "The Century label records the century an object was made.";
  const url = `https://api.harvardartmuseums.org/century/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc']);
      res.render('resourcelabels', {title: 'Centuries',
                            records: records,
                            description: description})
    })
});

app.get('/classification', function(req, res) {
  const description = "The Classification label is used to record both the broad classification of the object. Classifications are created and assigned by Harvard Art Museums curators.";
  const url = `https://api.harvardartmuseums.org/classification/?size=300&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc']);
      res.render('resourcelabels', {title: 'Classifications',
                            records: records,
                            description: description})
    })
});

app.get('/period', function(req, res) {
  const description = "The Period label records art movements within a specific period of time. With some exceptions, the Period labels typically follow the Getty Research Institute's Art & Architecture Thesaurus.";
  const url = `https://api.harvardartmuseums.org/period/?size=400&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc'])
      res.render('resourcelabels', {title: 'Periods',
                            records: records,
                            description: description})
    })
});

app.get('/place', function(req, res) {
  const description = "The Place label records the physical location of where an artwork was created.";
  const url = `https://api.harvardartmuseums.org/place/?size=3000&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc'])
      res.render('resourcelabels', {title: 'Places',
                            records: records,
                            description: description})
    })
});

app.get('/technique', function(req, res) {
  const description = "The Technique label records the processes by which an artwork was created. Technique labels are created and assigned by Harvard Art Museums curators."
  const url = `https://api.harvardartmuseums.org/technique/?size=400&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc'])
      res.render('resourcelabels', {title: 'Techniques',
                            records: records,
                            description: description})
    })
});

app.get('/worktype', function(req, res) {
  const description = "The worktype label records a more specific classification of the object, which is also appended to the object's Classification label. Worktype labels are created and assigned by Harvard Art Museums curators."
  const url = `https://api.harvardartmuseums.org/worktype/?size=500&apikey=` + API_KEY;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc'])
      res.render('resourcelabels', {title: 'Worktypes',
                            records: records,
                            description: description})
    })
});


app.listen(3000);
