start
  = s:sexp+ "\n"*
  {return s}

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
 / b:float {return b}
 / b:int {return b}

bool
 = "true"i {return {type: "bool", body: true}}
 / "false"i {return {type: "bool", body: false}}

symbol
 = chars:[a-zA-Z]+ {return {type:"symbol", body: chars.join("")}}

string /*currently can't match """", needs whitespace between elements.*/
 = '"'+chars:[^"]* '"' {return {type: "string", body: chars.join("")}}
 / "'"+chars:[^']* "'" {return {type: "string", body: chars.join("")}}

int
 = neg:[-]* digits:[0-9]+ {return {type: "int", body: parseInt(neg+digits.join("", 10))}}

float
 = neg:[-]* ldigits:[0-9]* "." rdigits:[0-9]* {console.log(neg+ldigits+"."+rdigits); return {type: "float", body: parseFloat(neg+ldigits.join("")+"."+rdigits.join(""))}}

list
 = "<" w* ">" {return {type: "list", body: null}}
 / "<" w* s:sexp+ w* ">" {return {type: "list", body: s}}
