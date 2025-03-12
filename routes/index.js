var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var _  = require('lodash');

const API_KEY = process.env.API_KEY;

router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/about', function (req, res, next) {
  res.render('about');
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

router.get('/tools/playground', function (req, res, next) {
    res.render('tools_playground');
});

router.get('/labels', function (req, res, next) {
    res.redirect('/century');
});

router.get('/resources', function (req, res, next) {
    res.render('resourceguide', {title: 'Resources Guide'});
});

router.get('/resources/label/:label?', function (req, res, next) {
  const endpoints = {
    century: {
      endpoint: "century",
      name: "Centuries",
      description: "The Century label records the century an object was made."
    },
    classification: {
      endpoint: "classification",
      name: "Classifications",
      description: "The Classification label is used to record both the broad classification of the object. Classifications are created and assigned by Harvard Art Museums curators."
    },
    culture: {
      endpoint: "culture",
      name: "Cultures",
      description: "The Culture label records from which culture an artwork was created."
    },
    medium: {
      endpoint: "medium",
      name: "Mediums",
      description: "The Medium label records the materials that are applied in the making of an artpiece. This information is oftentimes provided by the Harvard Art Museums' conservators as a result of their expertise, technical examination, and/or analysis."
    },
    period: {
      endpoint: "period",
      name: "Periods",
      description: "The Period label records art movements within a specific period of time. With some exceptions, the Period labels typically follow the Getty Research Institute's Art & Architecture Thesaurus."
    },
    place: {
      endpoint: "place",
      name: "Places",
      description: "The Place label records the physical location of where an artwork was created. Terms are hierarchical."
    },
    support: {
      endpoint: "support",
      name: "Supports",
      description: "The Support label records the surface upon which media have been applied during the making of an artwork. Terms are hierarchical."
    },    
    technique: {
      endpoint: "technique",
      name: "Techniques",
      description: "The Technique label records the processes by which an artwork was created. Technique labels are created and assigned by Harvard Art Museums curators."
    },
    worktype: {
      endpoint: "worktype",
      name: "Worktypes",
      description: "The worktype label records a more specific classification of the object, which is also appended to the object's Classification label. Worktype labels are created and assigned by Harvard Art Museums curators."
    } 
  }
  
  let label = endpoints[req.params.label];

  const url = `https://api.harvardartmuseums.org/${label.endpoint}/?size=300&apikey=${API_KEY}`;
    fetch(url).then(response => response.json())
    .then(results => {
      let records = results.records;
      records = _.orderBy(records, [record => record.name.toLowerCase()], ['asc']);
      res.render('resourcelabels', {title: label.name,
                                    records: records,
                                    description: label.description});
    })
});

module.exports = router;