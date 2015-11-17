"use strict";



$(document).ready(function() {
	var listMaker = listFactory();
	var validate = inputValidator();
	var $uiWidth;
	var comprehension;
	var list;

	var $predicateString = undefined;

	$('#comprehension-form').submit(function(event){
		$('#err').text('');
		event.preventDefault();
		comprehension = $( this ).serializeArray();
		var len = comprehension[2].value - comprehension[1].value
		var predicates = listMaker.newPredicateString(comprehension[3].value)
		// if the predicates field is emply
		if(!predicates){
			// replace with string "true"
			predicates = 'true';
		}
		var index = comprehension[1].value
		var lambda = comprehension[0].value

		try {
			validate.lambda(lambda);
			validate.predicate(predicates);
			list = listMaker.newComprehension(len, lambda, predicates, index);
			$('#list').text('>>> my_list = [' + list.join(', ') + ']');

		} catch(err) {
			$('#err').text(err.message)
		}
	})


	$('#map-form').submit(function(event){
		$('#err').text('');
		event.preventDefault();
		try {
			if(!list) {
					throw new Error('Must generate list comprehension first');
			}

			var mapFunction = $( this ).serializeArray();
			console.log(mapFunction)
			validate.lambda(mapFunction[0].value);
			list = list.map(function( x ){
					return eval(mapFunction[0].value)
			})
			$('#list').text('>>> my_list = [' + list.join(', ') + ']');
		} catch(err) {
			$('#err').text(err.message)
		}
	})


});












// MODULES

var listFactory = function() {
	function comprehension( len, lambdaString, predicates, index ) {

		let predicateString = predicateGenerator(predicates);
		let lambda = lambdaGenerator(lambdaString, predicateString);

		return listGenerator( len, index - 1 ).map(lambda).filter(removeUndef);

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

	function listGenerator( len, index ) {

		let list = [];

		for(let i = index; i < len + index; i ++) {
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

var inputValidator = function(){

	function validatePredicate( string ){
		const x = 1
		const test = eval(string);
		if(typeof test !== 'boolean') {
			console.log('in if')
			throw new Error('Predicate must be expressed in the form of an equality test')
		}
	}

	function lambdaValidator( lambdaExp ){
		const x = 1;
		const test = eval(lambdaExp);
		if( typeof test !== 'number' ) {
			throw new Error('Lambda expression must evaluate to a number')
		}
	}

	return {
		predicate: validatePredicate,
		lambda: lambdaValidator
	}
}
