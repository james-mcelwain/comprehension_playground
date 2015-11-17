$(function() {
$( "#resizable" ).resizable({
  minHeight: 50,
  maxHeight: 50,
  resize: function( event, ui ) {
      var $uiWidth = $('.ui-widget-content').width()
      console.log($uiWidth);
    },
});
});
