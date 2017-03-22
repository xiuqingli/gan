'user strict';

var request = require('request');
var async = require('async');
var express = require('express');
var employeeRouter = express.Router();

var employeeUtil = require('../lib/routes/employeeUtil');
var DataUtil = require('../lib/dataUtil');
var dataUtil = new DataUtil();
//b.) Return all employee data as JSON
employeeRouter.get('/', function(req, res) {
  dataUtil.fetchAll(
    function(err, data) {
      if (err) {
        res.status(500).json({
          message: 'Server error'
        });
      } else {
        res.status(200).json(data.employees);
      }
    }
  );
});
//c.) RESTfully accept an employee name as a parameter and return all group names
//to which the employee belongs
employeeRouter.get('/name/:name', function(req, res) {
  req.checkParams('name', 'Invalid name').optional().isAlpha();
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      return res.status(400).send(result.array());
    }
    dataUtil.fetchAll(
      function(err, data) {
        if (err) {
          res.status(500).json({
            message: 'Server error'
          });
        } else {
          var employeeId = employeeUtil.findEmployeeIdByName(data, req.params.name);
          var names = employeeUtil.findGroupNamesByEmployeeId(data, employeeId);
          res.status(200).json(names);
        }
      }
    );
  });
});
//d.) Create a new employee with the following data: 
//{“name” : “Jose”, “id” : “7788”}
employeeRouter.post('/', function(req, res) {
  req.checkBody('name', 'Invalid name').notEmpty().isAlpha();
  req.checkBody('id', 'Invalid id').notEmpty().isNumeric();
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      return res.status(400).send(result.array());
    }
    dataUtil.fetchAll(
      function(err, data) {
        if (err) {
          res.status(500).json({
            message: 'Server error'
          });
        } else {
          var employee = {
            name: req.body.name,
            id: req.body.id
          };
          data.employees.push(employee);
          dataUtil.save(data, function(err) {
            if (err) {
              res.status(500).json({
                message: 'Server error'
              });
            } else {
              res.status(201).json(employee);
            }
          });
        }
      }
    );
  });
});
//e.) Expose a route which RESTfully accepts an employee ID and 
//makes three sequential calls to our mock API and 
//returns the final supervisor object as JSON
employeeRouter.get('/:id([0-9]+)', function(req, res) {
  var employeeId = req.params.id;
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array());
    }
    async.waterfall([
      callMockEmployee,
      callMockOrganization,
      callMockSupervisor
    ], function(err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
});

function callMockEmployee(callback) {
  request('http://localhost:3000/mock-api/employee/2233', function(err, response, body) {
    if (err) {
      return callback(err);
    }
    callback();
  });
}

function callMockOrganization(callback) {
  request('http://localhost:3000/mock-api/organization/gan', function(err, response, body) {
    if (err) {
      return callback(err);
    }
    callback();
  });
}

function callMockSupervisor(callback) {
  request('http://localhost:3000/mock-api/supervisor/1234', function(err, response, body) {
    if (err) {
      return callback(err);
    }
    callback(null, body);
  });
}
module.exports = employeeRouter;