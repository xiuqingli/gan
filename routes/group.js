'use strict';

var DataUtil = require('../lib/dataUtil');
var dataUtil = new DataUtil();
var express = require('express');
var groupRouter = express.Router();

//a.) Return all group data as JSON
groupRouter.get('/', function(req, res) {
  dataUtil.fetchAll(
    function(err, data) {
      if (err) {
        res.status(500).json({
          message: 'Server error'
        });
      } else {
        res.status(200).json(data.groups);
      }
    }
  );
});

module.exports = groupRouter;