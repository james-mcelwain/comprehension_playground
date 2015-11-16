"use strict";



$(document).ready(function() {
	var listMaker = listFactory();
	var $uiWidth;
	var comprehension;
	var list;

	var $predicateString = undefined;

	$('#comprehension-form').submit(function(event){
		event.preventDefault();
		comprehension = $( this ).serializeArray();
		var len = comprehension[2].value - comprehension[1].value
		var predicates = comprehension[3].value
		var lambda = comprehension[0].value
		list = listMaker.newComprehension(len, lambda, predicates);
		$('#list').text('my_list = [' + list.join(', ') + ']');


	})

});











// MODULES

var listFactory = function() {
	function comprehension( len, lambdaString, predicates ) {

		let predicateString = predicateGenerator(predicates);
		let lambda = lambdaGenerator(lambdaString, predicateString);

		return listGenerator( len ).map(lambda).filter(removeUndef);

	}

	function removeUndef( x ) {
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
		predicates = predicates.replace('and', '&&').replace('or', '||').replace('not', '!')
		return predicates;
	}

	return {
		newComprehension : comprehension,
		newPredicateString: predicateGenerator
	}
}
