"use strict";
var listFactory = function() {
	function comprehension( len, lambdaString, predicateArray ) {

		let predicateString = predicateGenerator(predicateArray);
		let lambda = lambdaGenerator(lambdaString, predicateString);
		return listGenerator( len ).map(lambda).filter(predicates);

	}

	function predicates( x ) {
		return x != null || undefined;
	}

	function lambdaGenerator(lambdaString, predicateString) {

		function lambda( x, i, arr ) {
			if( eval( predicateString ) ) {
				return eval( lambdaString );
			} else {
				return;
			}
		}

		return lambda;
	}

	function listGenerator( len ) {

		let list = [];

		for(let i = 0; i < len; i ++) {
			list[i] = i + 1;
		}

		return list;
	}

	function predicateGenerator( predicates ) {
		predicates = predicates.join(' && ');

		return predicates;
	}

	return {
		newComprehension : comprehension,
		newPredicateString: predicateGenerator
	}
}

module.exports = listFactory;

// let  = 'x';
// let predicate = predicateGenerator(['x > 2', 'x % 3 != 0']);
// console.log(listFactory.newComprehension(10, lambda, predicate));
