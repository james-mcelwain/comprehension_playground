'use strict';

/** DEPENDENCIES **/
const
    angular = require('angular'),
    listFactory = require('./listFactory.js'),
    inputValidator = require('./inputValidator.js');

angular
    .module('comprehensions', [
    ])
    .factory('inputValidator', [inputValidator])
    .factory('listFactory', [listFactory])
    .controller('mainCtrl', ['listFactory', 'inputValidator', function(listFactory, inputValidator) {


      var vm = this;

      vm.submit = function(  ) {
        vm.err = '';
        let lambda = vm.lambda;
        if(vm.predicates){ 
          let predicates = vm.predicates.split(',');
        } 
        const test1 = inputValidator.validatePredicates(predicates)

         if( test1 !== true ) {
          vm.err = test1.message;
        } else {
          const predicateString = listFactory.newPredicateString(predicates);
          vm.comprehension = `[ ${vm.lambda} for x in range(1, infinity), if ${predicateString} ]`
          vm.list = listFactory.newComprehension(10, lambda, predicates);
        }
      };
  }])
