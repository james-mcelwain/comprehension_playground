export function mapSubmit(validate, list){
  $('#map-form').submit(function(event) {
      $('#err').text('');
      event.preventDefault();
      try {
        if(!list.c) {
            throw new Error('Must generate list comprehension first');
        }

        var mapFunction = $( this ).serializeArray();
        validate.lambda(mapFunction[0].value);

        list.c = list.c.map((x) => {
            return eval(mapFunction[0].value)
        })

        $('#list').text('>>> my_list = [' + list.c.join(', ') + ']');
      } catch(err) {
        $('#err').text(err.message)
      }
    })
}
