'use strict';

/** DEPENDENCIES **/
const
    angular = require('angular');

angular
    .module('comprehensions', [])
    .controller('mainCtrl', [ function(){
      console.log('hello!');
    }])
