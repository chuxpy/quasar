#Quasar Syntax

##Comments

Single-line or multi-lined with match-rules in the parser to discard (not yet implemented)

##Integers

Standard 0-9 (implemented). For alternative base systems, these can be generated
by user-defined functions and strings.

##Floating point

`[0-9]+ "." [0-9]+` Implemented.

##Booleans

true or false, case insensitive. TODO: implement logical operators. (probably functions too)

##Symbols

a-zA-Z symbols accepted.

##Function

Basic function recognition is <fn body>, but not implemented to any significant degree.

##Other special forms

###Other forms recognized explicitly by the parser:

*if (TODO)

#AST Parsing

The PEG.js parser-generator can explicitly generate a parser which will output a AST and perform
intermediate tasks (preprocessing specific forms). With a JSON-like AST, we can crawl and execute
the forms of our program.

##Example AST

`<factorial 10>`

Output: ```javascript
{
   "type": "program",
   "body": [
      {
         "type": "list",
         "body": [
            {
               "type": "symbol",
               "body": "factorial"
            },
            {
               "type": "int",
               "body": 10
            }
         ]
      }
   ]
}```