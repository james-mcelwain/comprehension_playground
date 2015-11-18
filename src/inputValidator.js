'use strict';

export function inputValidator(){

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
