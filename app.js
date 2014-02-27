fs = require("fs");
var PEG = require("pegjs");
var readline = require('readline');

fs.readFile("./quasar.pegjs", function(err, data){
  if(err) throw err;
  var parser = PEG.buildParser(data.toString());
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  (function start_repl(rl){
    rl.question("qsr> ", function(input) {
      var output = parser.parse(input);
      console.log("ast<\n", JSON.stringify(output, null, 2));
      console.log("out: ", run_ast(output));
      if(input!="quit") start_repl(rl);
      else rl.close();
    });
  })(rl);
})

/*
function run_ast(ast){
  if(ast.body != null) run_ast(ast.body);
  else if(Object.prototype.toString.call(ast) === '[object Array]'){
    for(var x=0;x<ast.length;x++){
      run_ast(ast[x])
    }
  }
  else console.log(ast)
}*/

function run_ast(ast){
  /*Steps through the AST. Naive interpreter.
    Does very basic things so far.
    Calls the first callable object with the second expression.*/
  if(ast.map === undefined){
    return ast.body;
  }
  else {
    return ast.body.map(run_ast)
  }
}
