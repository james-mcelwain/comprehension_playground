"use strict";
var listFactory = function() {
	function comprehension( len, patternString, predicateArray ) {

		let predicateString = predicateGenerator(predicateArray);
		let pattern = patternGenerator(patternString, predicateString);
		return listGenerator( len ).map(pattern).filter(predicates);

	}

	function predicates( x ) {
		return x != null || undefined;
	}

	function patternGenerator(patternString, predicateString) {

		function pattern( x, i, arr ) {
			if( eval( predicateString ) ) {
				return eval( patternString );
			} else {
				return;
			}
		}

		return pattern;
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
		newComprehension : comprehension
	}
}

module.exports = listFactory;

// let pattern = 'x';
// let predicate = predicateGenerator(['x > 2', 'x % 3 != 0']);
// console.log(listFactory.newComprehension(10, pattern, predicate));
