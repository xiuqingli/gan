'user strict';

var express = require('express');
var mockApiRouter = express.Router();

mockApiRouter.get('/employee/:id', function(req, res) {
  res.status(200).json({
    employeeId: '1',
    title: 'Big Boss'
  });
});

mockApiRouter.get('/organization/:title', function(req, res) {
  res.status(200).json({
    supervisorId: '2',
    organization: 'Skull island'
  });
});

mockApiRouter.get('/supervisor/:supervisorId', function(req, res) {
  setTimeout(function() {
    res.status(200).json({
      supervisorId: '3',
      name: 'King kong'
    });
  }, 500);
});

module.exports = mockApiRouter;