export function comprehensionSubmit(listMaker, validate, list){
  $('#comprehension-form').submit(function(event) {
    // init, clear err div and prevent submit
    $('#err').text('');
    event.preventDefault();

    // get form data
    var comprehension = $( this ).serializeArray();
    // len = max - min
    var len = comprehension[2].value - comprehension[1].value
    // convert python boolean ops to js
    var predicates = listMaker.newPredicateString(comprehension[3].value)
    // if the predicates field is emply set as true to pass test in listMaker
    if(!predicates) predicates = 'true';
    //
    var index = comprehension[1].value
    var lambda = comprehension[0].value

    try {
      validate.lambda(lambda);
      validate.predicate(predicates);
      list.c = listMaker.newComprehension(len, lambda, predicates, index);
      $('#list').text('>>> my_list = [' + list.c.join(', ') + ']');

    } catch(err) {
      $('#err').text(err.message)
    }
  })
}
