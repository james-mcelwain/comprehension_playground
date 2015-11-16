'use strict';

/** DEPENDENCIES **/
const
    angular = require('angular'),
    listFactory = require('./listFactory.js');

angular
    .module('comprehensions', [])
    .factory('listFactory', [listFactory])
    .controller('mainCtrl', ['listFactory', function(listFactory) {
      var vm = this;
      vm.comprehension = {};
      vm.comprehension.pattern = '';
      vm.submit = function(  ) {
        vm.comprehension.predicates = vm.comprehension.predicates.split(',');
        console.log(vm.comprehension.predicates);
      };

      console.log(listFactory.newComprehension(10, 'x', ['x > 2', 'x < 7']));

      console.log('hello!');
    }])
