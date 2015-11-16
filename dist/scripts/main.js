"use strict";



$(document).ready(function() {
	var listMaker = listFactory();
	var $uiWidth;
	var $comprehension;

	var $predicateString = undefined;

	$('#comprehension-form').submit(function(event){
		event.preventDefault();
		$comprehension = $( this ).serializeArray();
		var list = listMaker.newComprehension($uiWidth, $comprehension[1].value, $comprehension[1].value.split(','));
		$('.content').text("[" + list + "]")

	})

	$( "#resizable" ).resizable({
		maxWidth: 1000,
		minHeight: 10,
		maxHeight: 10,
		resize: function( event, ui ) {
				$uiWidth = $('.ui-widget-content').width() / 21
				if($comprehension){
					var list = listMaker.newComprehension($uiWidth, $comprehension[1].value, $comprehension[1].value.split(','));
					$('.content').text("[" + list + "]")
				}
			},
	});
});











// MODULES

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
