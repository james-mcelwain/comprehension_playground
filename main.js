'use strict';

/** DEPENDENCIES **/
const
    angular = require('angular'),
    listFactory = require('./listFactory.js');

angular
    .module('comprehensions', [
    ])
    .factory('listFactory', [listFactory])
    .controller('mainCtrl', ['listFactory', function(listFactory) {


      var vm = this;

      vm.submit = function(  ) {
        let pattern = vm.pattern;
        let predicates = vm.predicates.split(',');
        console.log(vm.predicates);
        const predicateString = listFactory.newPredicateString(predicates);
        vm.comprehension = `[ ${vm.pattern} for x in range(1, infinity), if ${predicateString} ]`
        console.log(listFactory.newComprehension(10, pattern, predicates));

        };



      console.log('hello!');
    }])
