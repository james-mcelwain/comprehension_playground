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
        let lambda = vm.lambda;

        // if(!vm.predicates.split('').some(function( char ){
        //   return char === '>' || '<' || '=' || '!' || '%'
        // })){
        //   vm.err = 'Boolean operator required';
        // };

        let predicates = vm.predicates.split(',');


        console.log(vm.predicates);
        const predicateString = listFactory.newPredicateString(predicates);
        vm.comprehension = `[ ${vm.lambda} for x in range(1, infinity), if ${predicateString} ]`
        vm.list = listFactory.newComprehension(10, lambda, predicates);

        };



      console.log('hello!');
    }])
