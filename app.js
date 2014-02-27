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
      var output = parser.parse(input)[0];
      console.log("ast<\n", JSON.stringify(output, null, 2));
      console.log("out: ", run_ast(output, exec=true));
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

function add(list){
  var arg1 = list[0], arg2 = list[1];
  if((arg1.type === "int" || arg1.type === "float") || (arg2.type === "int" || arg2.type === "float")){
    if(arg1.type === "float" || arg2.type == "float") return {type: "float", body: arg1.body+arg2.body};
    else return {type: "int", body: arg1.body+arg2.body}
  }
}

function subtract(list){
  var arg1 = list[0], arg2 = list[1];
  if((arg1.type === "int" || arg1.type === "float") || (arg2.type === "int" || arg2.type === "float")){
    if(arg1.type === "float" || arg2.type == "float") return {type: "float", body: arg1.body-arg2.body};
    else return {type: "int", body: arg1.body-arg2.body}
  }
}

function multiply(list){
  var arg1 = list[0], arg2 = list[1];
  if((arg1.type === "int" || arg1.type === "float") || (arg2.type === "int" || arg2.type === "float")){
    if(arg1.type === "float" || arg2.type == "float") return {type: "float", body: arg1.body*arg2.body};
    else return {type: "int", body: arg1.body*arg2.body}
  }
}

function divide(list){
  var arg1 = list[0], arg2 = list[1];
  if((arg1.type === "int" || arg1.type === "float") || (arg2.type === "int" || arg2.type === "float")){
    if(arg1.type === "float" || arg2.type == "float") return {type: "float", body: arg1.body/arg2.body};
    else return {type: "int", body: arg1.body/arg2.body}
  }
}

function do_invoke(symbol, list){
  /*Current known symbols*/
  symbol_list = {"add": add, "subtract": subtract, "multiply": multiply, "divide": divide}
  if(symbol.type==="symbol"){
    if(typeof(symbol_list[symbol.body]) === "undefined"){
      console.log("Symbol not defined.");
      return null;
    }
    return symbol_list[symbol.body](list)
  }
  else{
    console.log("Cannot evaluate non-symbol, ", symbol)
    return null;
  }
}

function check_bool(datatype){
  if(datatype.type==="bool"){
    if(datatype.body.toLowerCase()=="true") return true;
    else if(datatype.body.toLowerCase()=="false") return false;
    return null;
  }
  if(datatype.type==="int"){
    if(datatype.body==0) return false;
    else if(datatype.body==1) return true;
    return null;
  }
}

function run_ast(ast){
  if(typeof(exec) === "undefined") exec = false;
  if(typeof(ast) === "undefined") return null;
  else if(ast.type == "list" && exec==true) return do_invoke(ast.body[0], ast.body.slice(1).map(run_ast));
  else return ast;
}
