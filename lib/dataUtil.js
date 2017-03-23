'use strict';

var path = require('path');
var jsonfile = require('jsonfile');

function DataUtil() {
  this.filePath = path.join(__dirname, '../data/data.json');
}

DataUtil.prototype = {
  fetchAll: function(callback) {
    jsonfile.readFile(this.filePath, function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });

  },

  save: function(data, callback) {
    jsonfile.spaces = 4;
    jsonfile.writeFile(this.filePath, data, function(err) {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }
};

module.exports = DataUtil;