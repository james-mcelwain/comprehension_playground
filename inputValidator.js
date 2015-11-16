'use strict'
var inputValidator = function(){

	function predicateValidator( predicateArr ){
		try {
			predicateArr.forEach(removeWhiteSpace);
			predicateArr.forEach(validateEqualityOp);
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

	// if at least one '=' is present
	if(el.indexOf('=') !== -1 ){
		// if '==' is not present
		if( el.indexOf('==') === -1){
			throw new Error('Assignment forbidden in predicate statement');
		}
	}
}

var validatePresenceOfBooleanOp = function( el, i, arr ){
	function boolOpsPresent( char ) {
		return char == '<' || '>' || '!' || '%'
	}

	if(!el.split('').some(boolOpsPresent)){
		throw new Error('At least one boolean operator required');
	}
}

var a = inputValidator();
a.validatePredicate(['      x==2', '     x 1'])

module.exports = inputValidator;