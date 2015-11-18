export function listFactory() {
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
