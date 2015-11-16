'use strict'
var inputValidator = function(){

	function predicateValidator( predicateArr ){
		try {
			predicateArr.forEach(removeWhiteSpace);
			predicateArr.forEach(validateEqualityOp);
			predicateArr.forEach(validatePresenceOfBooleanOp);
		} catch( err ) {
			console.log(err);
			return err;
		}

	}

	return {
		validatePredicate: predicateValidator,

	}
}


// UTILITY FUNCTIONS

var removeWhiteSpace = function( el, i, arr ) {
	arr[i] = el.split('').filter(( char ) => char != ' ').join('')
}
var validateEqualityOp = function( el, i, arr ) {
	// if '=' is present
	if( el.match(/=/g)){
		// and '==' is not
		if(!el.match(/==/g)){
			throw new Error('Assignment forbidden in predicate statement');
		}
	}
}

var validatePresenceOfBooleanOp = function( el, i, arr ){
	return 0;
}

var a = inputValidator();
a.validatePredicate(['      x2', '     x 1'])

module.exports = inputValidator;