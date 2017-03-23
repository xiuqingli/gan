'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

var employee = require('./routes/employee');
var group = require('./routes/group');
var mockApi = require('./routes/mock-api');

app.use(bodyParser.json());
app.use(expressValidator());

app.use('/employee', employee);
app.use('/group', group);
app.use('/mock-api', mockApi);

app.listen(process.env.PORT || '3000');