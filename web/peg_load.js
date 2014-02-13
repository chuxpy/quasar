window.parser = {}

$(document)).ready(function(){
  $.get("../quasar.pegjs", "", function(parsedata){
    window.parser = PEG.buildParser(parsedata);
  })
})

function changed_text(){
  $("#output").val(window.parser.parse($("#parseable").val()))
}