var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var _  = require('lodash');

const API_KEY = process.env.API_KEY;

router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/1', function (req, res, next) {
    res.render('1_museum_data');
});

router.get('/2', function (req, res, next) {
    res.render('2_api');
});

router.get('/3', function (req, res, next) {
    res.render('3_examples');
});

router.get('/4', function (req, res, next) {
    res.render('4_getting_started');
});

router.get('/5', function (req, res, next) {
    res.render('5_interpret_data');
});

router.get('/6', function (req, res, next) {
    res.render('6_manipulate_data');
});

router.get('/labels', function (req, res, next) {
    res.redirect('/century');
});

router.get('/resources', function (req, res, next) {
    res.render('resourceguide', {title: 'Resources Guide'});
});

router.get('/culture', function(req, res, next) {
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

router.get('/medium', function(req, res, next) {
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

router.get('/century', function(req, res, next) {
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

router.get('/classification', function(req, res, next) {
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

router.get('/period', function(req, res, next) {
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

router.get('/place', function(req, res, next) {
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

router.get('/technique', function(req, res, next) {
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

router.get('/worktype', function(req, res, next) {
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

module.exports = router;