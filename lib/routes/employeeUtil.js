'use strict';

module.exports = {
  findEmployeeIdByName: function(data, name) {
    var employeeId = '';
    data.employees.forEach(function(employee) {
      if (employee.name === name) {
        employeeId = employee.id;
      }
    });
    return employeeId;
  },

  findGroupNamesByEmployeeId: function(data, employeeId) {
    var names = [];
    data.groups.forEach(function(group) {
      group.employeeIDs.forEach(function(groupEmployeeId) {
        if (employeeId === groupEmployeeId) {
          return names.push(group.name);
        }
      });
    });
    return names;
  }
};