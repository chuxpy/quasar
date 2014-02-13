#Quasar Syntax

Quasar is a language whose idioms may be described completely by s-expressions. Here is a listing
of the basic language specifications for now.

##Special forms

* if (TODO) - `(if cond then else)`
`if` evaluates `then` if `cond` is true. Otherwise, it evalutes `else` if `else` is not null.

* while (TODO) - `(while cond then)`
As usual, while is a loop that evaluates `cond` and executes the body if it evaluates to `true`.

* set (TODO) - `(set symbol val)`
Instead of explicitly requiring type declarations, `set` can bind a symbol to a literal or
an object.

* fn - `(fn args[as a list] sexp)`
fn binds and makes available for execution a certain s-expression (list).

### Examples of common idioms

* `(set some-fn (fn ...))` then `(some-fn args)` is a function declaration.

* `fn` returns a reference to a function, so anonymous functions can be declared as such:
  `((fn ...) args)`

##Comments

Single-line (#) or multi-lined (###foo###) with match-rules in the parser to discard. (TODO)

##Integers

Standard 0-9 (implemented). For alternative base systems, these can be generated
by user-defined functions and strings.

##Floating point

`[0-9]+ "." [0-9]+` TODO: different orders of precision.

##Booleans

true or false, case insensitive. TODO: implement logical operators. (probably functions too)

##Symbols

a-zA-Z symbols accepted. Like some other languages, symbols may have a "text representation".

##Typecasting

Each of the elementary literals outlined above can be recasted with functions defined within
the language (and not unique to the low-level specs of the language.)

#AST Parsing

The PEG.js parser-generator can explicitly generate a parser which will output a AST and perform
intermediate tasks (preprocessing specific forms). With a JSON-like AST, we can crawl and execute
the forms of our program.

The generated AST from PEG.js is in JSON, and can be crawled by any language that can parse JSON,
including javascript itself.

##Example AST

`<factorial 10>`

Output: ```
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