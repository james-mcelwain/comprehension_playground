'use strict'
var inputValidator = function(){

	function predicateValidator( predicateArr ){
		try {
			predicateArr.forEach(validate);
			return true;
		} catch( err ) {
			console.log(err);
			return err;
		}

	}

	function validate( el, i, arr ){
		const x = 1
		const test = eval(el);
		if(typeof test !== 'boolean') {
			throw new Error('Predicate must be expressed in the form of an equality')
		}
	}

	return {
		validatePredicates: predicateValidator,

	}
}

module.exports = inputValidator;
