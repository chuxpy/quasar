start
  = s:sexp+ "\n"*
  {return {type: "program", body: s}}

sexp
  = w* a:atom w* {return a}
  / w* a:list w* {return a}

w
 = " "+
 / "\n"+
 / "\t"+

atom
 = b:bool {return b}
 / b:symbol {return b}
 / b:string {return b}
 / b:int {return b}
 / b:float {return b}

bool
 = "true"i {return {type: "bool", body: true}}
 / "false"i {return {type: "bool", body: false}}

symbol
 = chars:[a-zA-Z]+ {return {type:"symbol", body: chars.join("")}}

string /*currently can't match """", needs whitespace between elements.*/
 = '"'+chars:[^"]* '"' {return {type: "string", body: chars.join("")}}
 / "'"+chars:[^']* "'" {return {type: "string", body: chars.join("")}}

int
 = digits:[0-9]+ {return {type: "int", body: parseInt(digits.join("", 10))}}

float
 = ldigits:[0-9]* "." rdigits:[0-9]* {return {type: "float", body: parseFloat((ldigits+"."+rdigits).join("", 10))}}

list
 = "<" w* ">" {return {type: "list", body: null}}
 / "<" w* s:sexp+ w* ">" {
   if(s[0].type==="symbol" && s[0].body==="fn"){
     return {type: "function", body: s.slice(1)}
   }
   else return {type: "list", body: s}
 }
