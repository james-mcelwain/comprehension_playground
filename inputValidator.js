'use strict'
var inputValidator = function(){

	function predicateValidator( predicateArr ){
		try {
			predicateArr.forEach(validatePredicate);
			return true;
		} catch( err ) {
			console.log(err);
			return err;
		}
	}

	function validatePredicate( el, i, arr ){
		const x = 1
		const test = eval(el);
		if(typeof test !== 'boolean') {
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
		predicate: predicateValidator,
		lambda: lambdaValidator
	}
}

module.exports = inputValidator;
