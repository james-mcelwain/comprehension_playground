(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inputValidator = inputValidator;
function inputValidator() {

	function validatePredicate(string) {
		var x = 1;
		var test = eval(string);
		if (typeof test !== 'boolean') {
			console.log('in if');
			throw new Error('Predicate must be expressed in the form of an equality test');
		}
	}

	function lambdaValidator(lambdaExp) {
		var x = 1;
		var test = eval(lambdaExp);
		if (typeof test !== 'number') {
			throw new Error('Lambda expression must evaluate to a number');
		}
	}

	return {
		predicate: validatePredicate,
		lambda: lambdaValidator
	};
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comprehensionSubmit = comprehensionSubmit;
function comprehensionSubmit(listMaker, validate, list) {
  $('#comprehension-form').submit(function (event) {
    // init, clear err div and prevent submit
    $('#err').text('');
    event.preventDefault();

    // get form data
    var comprehension = $(this).serializeArray();
    // len = max - min
    var len = comprehension[2].value - comprehension[1].value;
    // convert python boolean ops to js
    var predicates = listMaker.newPredicateString(comprehension[3].value);
    // if the predicates field is emply set as true to pass test in listMaker
    if (!predicates) predicates = 'true';
    //
    var index = comprehension[1].value;
    var lambda = comprehension[0].value;

    try {
      validate.lambda(lambda);
      validate.predicate(predicates);
      list.c = listMaker.newComprehension(len, lambda, predicates, index);
      $('#list').text('>>> my_list = [' + list.c.join(', ') + ']');
    } catch (err) {
      $('#err').text(err.message);
    }
  });
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapSubmit = mapSubmit;
function mapSubmit(validate, list) {
    $('#map-form').submit(function (event) {
        $('#err').text('');
        event.preventDefault();
        try {
            if (!list.c) {
                throw new Error('Must generate list comprehension first');
            }

            var mapFunction = $(this).serializeArray();
            validate.lambda(mapFunction[0].value);

            list.c = list.c.map(function (x) {
                return eval(mapFunction[0].value);
            });

            $('#list').text('>>> my_list = [' + list.c.join(', ') + ']');
        } catch (err) {
            $('#err').text(err.message);
        }
    });
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.listFactory = listFactory;
function listFactory() {
	function comprehension(len, lambdaString, predicates, index) {

		var predicateString = predicateGenerator(predicates);
		var lambda = lambdaGenerator(lambdaString, predicateString);

		return listGenerator(len, index - 1).map(lambda).filter(removeUndef);
	}

	function removeUndef(x) {
		return x != null || undefined;
	}

	function lambdaGenerator(lambdaString, predicateString) {
		function lambda(x, i, arr) {
			if (eval(predicateString)) {
				return eval(lambdaString);
			} else {
				return;
			}
		}

		return lambda;
	}

	function listGenerator(len, index) {

		var list = [];

		for (var i = index; i < len + index; i++) {
			list[i] = i + 1;
		}

		return list;
	}

	function predicateGenerator(predicates) {
		predicates = predicates.replace('and', '&&').replace('or', '||').replace('not', '!');
		return predicates;
	}

	return {
		newComprehension: comprehension,
		newPredicateString: predicateGenerator
	};
}

},{}],5:[function(require,module,exports){
"use strict";

var _mapForm = require("./jQFuncs/mapForm.js");

var _comprehensionForm = require("./jQFuncs/comprehensionForm.js");

var _listFactory = require("./listFactory");

var _inputValidator = require("./inputValidator");

$(document).ready(function () {
	// shared dependencies
	var listMaker = (0, _listFactory.listFactory)();
	var validate = (0, _inputValidator.inputValidator)();
	var list = { c: [] }; // obj for getters/setters on list

	// init jQuery submit events
	(0, _comprehensionForm.comprehensionSubmit)(listMaker, validate, list);
	(0, _mapForm.mapSubmit)(validate, list);
});

},{"./inputValidator":1,"./jQFuncs/comprehensionForm.js":2,"./jQFuncs/mapForm.js":3,"./listFactory":4}]},{},[5]);
