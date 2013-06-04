grammar Rescripted;

options{
  output = AST;
  ASTLabelType = CommonTree;
  language=JavaScript;
//  backtrack = true;
}

tokens{
	
	BLOCK;
	GROUP;

	PAIR;
	
	OBJECT_LITERAL;
	ARRAY_LITERAL;
	
	FOR_IN;
	COMPREHENSION_BODY;
	GUARD;
	
	ARGUMENT_DECLARATION;
	ARGUMENT_DEFINITION;
	ARGUMENT_LIST;
	
	LAMBDA;
	
	METHOD_NAME;

	QUALIFIED_ID;
	
	ANNOTATIONS;
	ANNOTATION;
	
	PARTIAL_FUNCTION;
	EXTRACTOR_PATTERN;
	EQUALS_PATTERN;
	NAME_PATTERN;
	TYPED_PATTERN;
	
	SELECT_PROPERTY;
	BINDING;
	BIND_PROPERTY;
	BIND_EXPRESSION;

	EXPR;
	
	TYPE;
}


IMPORT: 'import';
PACKAGE: 'package';
CLASS: 'class';
OBJECT: 'object';
TRAIT: 'trait';
EXTENDS: 'extends';
WITH: 'with';

//we'll only use one, but I want both reserved...
BASE: 'base';
SUPER: 'super';

//MATCH = 'match';
CASE: 'case';
IF: 'if'; ELSE: 'else';

THROW: 'throw'; TRY: 'try'; CATCH: 'catch'; FINALLY: 'finally';
 //modifiers
PUBLIC: 'public'; PRIVATE: 'private'; PROTECTED: 'protected'; OVERRIDE: 'override'; FINAL: 'final'; NATIVE: 'native';
 
DEF: 'def'; VAR: 'var'; VAL: 'val';

VARARGS: '...';

//loops
FOR: 'for'; WHILE: 'while'; DO: 'do'; YIELD: 'yield';
 
//we'll only use one, but I want both reserved...
SELF: 'self';
THIS: 'this';
   
RETURN: 'return';
NEW: 'new'; DELETE: 'delete';
 
 //literal names
NULL: 'null';
TRUE: 'true';
FALSE:'false';

WILDCARD: '_';

COLON: ':';

fragment ID_START: 'a'..'z'|'A'..'Z'|'_'|'$';
fragment ID_CHAR: ID_START | '0'..'9';

BAD_ID: '$$$' ID_CHAR*;

ID: (ID_START) => ID_START ID_CHAR* ;

fragment OBJECT_LITERAL_ID_: ID ('-' ID)* ;
OBJECT_LITERAL_ID: (OBJECT_LITERAL_ID_ WS? ':') => OBJECT_LITERAL_ID_;

INT: '0'..'9'+ ;

HEX_INT: '0x' HEX_DIGIT+;

FLOAT: ('0'..'9')+ '.' ('0'..'9')* EXPONENT?
     | '.' ('0'..'9')+ EXPONENT?
     | ('0'..'9')+ EXPONENT ;

WS: ( ' ' | '\t' | '\r' | '\n' | '\u000C' )+ {$channel=HIDDEN;} ;

fragment EXPONENT : ('e'|'E') ('+'|'-')? ('0'..'9')+ ;

fragment HEX_DIGIT : ('0'..'9'|'a'..'f'|'A'..'F') ;

fragment ESC_SEQ: '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\') | UNICODE_ESC | OCTAL_ESC;

fragment OCTAL_ESC: '\\' ('0'..'3') ('0'..'7') ('0'..'7')
							    | '\\' ('0'..'7') ('0'..'7')
							    | '\\' ('0'..'7') ;

fragment UNICODE_ESC: '\\' 'u' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT ;

XML_ELEM: ('<' XML_NAME) => 
					'<' XML_NAME XML_ATTR* WS?
					(
					  '/>'
					| '>' XML_CONTENT* '</' XML_NAME '>'
					) ;
fragment XML_ATTR: WS XML_NAME WS? '=' WS? XML_ATTR_VALUE;
fragment XML_ATTR_VALUE:
	(
	  ('{') => XML_BINDING
	| ('"') => '"' (options {greedy=false;} : ~('"'))* '"'
	| ('\'') => '\'' (options {greedy=false;} : ~('\''))* '\''
	); //make this conform to xml spec

fragment XML_CONTENT: XML_CDATA | XML_COMMENT | XML_ELEM | XML_BINDING | XML_TEXT ;
fragment XML_TEXT: ( ~('<' | '{') )+;																				//make this conform to xml spec
fragment XML_BINDING: '{' WS? ID (WS? '#' WS? ID)* WS? '}'; 
fragment XML_NAME: ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ; //make this conform to xml spec
fragment XML_CDATA: '<![CDATA[' (options {greedy=false;} : ~(']]>'))* ']]>'; 															//make this conform to xml spec
fragment XML_COMMENT: '<!--' (options {greedy=false;} : ~('-->'))* '-->';															//make this conform to xml spec

LINE_COMMENT: ('//') => '//' ~('\n'|'\r')* ('\r'? '\n')? {$channel = HIDDEN;};
 	
TERMINATED_COMMENT:
	('/*') => 
  '/*'
    ( options {greedy=false;} : . )*
    //( TERMINATED_COMMENT ( options {greedy=false;} : . )* )*
  '*/' {$channel = HIDDEN;};
  

STRING:
	(
	  ('"""') => '"""' ( options {greedy=false;} : ~('"""') )* '"""'
	| ('\'\'\'') => '\'\'\'' ( options {greedy=false;} : ~('\'\'\'') )* '\'\'\''
  | ('"') => '"'( ESC_SEQ | ~('\\'|'"') )* '"'
  | ('\'') => '\'' ( ESC_SEQ | ~('\\'|'\'') )* '\''
  );


MINUS:'-';
PLUS:'+';
EXCLAMATION: '!';
DIV: '/';
STAR: '*';
MOD: '%';
EQ: '=';
POUND: '#';


DOT: '.';

fragment OPERATOR_CHAR: '<' | '>' | '=' | ':' | '!' | '@' | '%' | '^' | '&' | '*' | '\\' | '-' | '+' | '|' | '~' | '?';
//OPERATOR: (OPERATOR_CHAR) => OPERATOR_CHAR+;
//OPERATOR: ((OPERATOR_CHAR ~'/' ~'*') => OPERATOR_CHAR)+;
//OPERATOR: ((('/' ~'*') | OPERATOR_CHAR) => (OPERATOR_CHAR | '/'))+;
OPERATOR: ((~'/' ~'*' | '/' ~'*' | ~'/' '*') => OPERATOR_CHAR+);


SEMI:';';
COMMA:',';

delimiter: (','|';')?;

operator: EQ | EXCLAMATION | PLUS | MINUS | DIV | STAR | MOD | OPERATOR;
qualified_id: id+=ID (('.') => '.' id+=ID)* -> ^(QUALIFIED_ID $id+);

type_name:
	qualified_id
	(
	'['
		(type_params+=type_name (','|';')?)+
	']'
	)?
	'!'? -> ^(TYPE qualified_id $type_params* '!'?);

modifier: PUBLIC|PRIVATE|PROTECTED|OVERRIDE|FINAL|NATIVE;
annotation: '@' qualified_id argument_list? -> ^(ANNOTATION qualified_id argument_list?);
annotations: annotation* modifier* -> ^(ANNOTATIONS annotation* modifier*);

symbol_expr: '#'^ ID;

chainable_expression:
	(
		literal
	| throw_expression	
	| for_comprehension
	| if_expression
	| ('#') => symbol_expr
	| (ID? '=>') => lambda
	| (lambda_argument_declaration '=>') => lambda
	| ('{' (ID delimiter)* '=>' ) => lambda
	| ('{' CASE) => partial_function
	| (ID) => ID
	| THIS
	| SELF
	| WILDCARD
	| (('{'|'(') (ID|STRING|OBJECT_LITERAL_ID) ':') => object_literal
	| ('{' '}') => object_literal
	| array_literal
	| ('{') => block
	| ('(') => group
	);

expr: (chainable_expression ((chained_expression) => chain+=chained_expression)*) -> ^(EXPR chainable_expression $chain*);
chained_expression: (
  	('.' ID) => expr_chain_select_property
	| ('#') => expr_chain_binding
	| (('{'|'(') (ID|STRING|OBJECT_LITERAL_ID) ':') => expr_chain_object_literal
	| ('{' CASE) => expr_chain_partial_function
	| ('{' ID* '=>') => expr_chain_lambda_a
	| ('{') => expr_chain_block
	| ('(' ':') => expr_chain_named_spread
	| ('(') => argument_list
	);


expr_chain_named_spread: '(' ':' expression ')' -> ^(':' expression);
expr_chain_lambda_a: lambda_a -> ^(ARGUMENT_LIST lambda_a);
expr_chain_partial_function: partial_function -> ^(ARGUMENT_LIST partial_function);
expr_chain_object_literal: object_literal;
expr_chain_block: '{' statement+ '}' -> ^(ARGUMENT_LIST ^(LAMBDA statement+));
expr_chain_select_property: '.' ID -> ^('.' ID) ;

expr_chain_binding: (
		('#' '#') => segments+=expr_chain_bind_empty
	| ('#' ID) => segments+=expr_chain_bind_property
	| ('#' '(') => segments+=expr_chain_bind_expression
	)* -> ^(BINDING $segments*);	
expr_chain_bind_empty: '#';
expr_chain_bind_property: '#' ID -> ^(BIND_PROPERTY ID) ;
expr_chain_bind_expression: '#' '(' expression ')' -> ^(BIND_EXPRESSION expression);


literal: XML_ELEM | STRING | INT | HEX_INT | FLOAT | TRUE | FALSE | NULL;

operator_and_other_expressions: expr_operator;

expr_unary: ((PLUS | MINUS | EXCLAMATION)^)? expr;
expr_mult: expr_unary ( ('*'|'/'|'%') => ('*'|'/'|'%')^ expr_unary )*;
expr_add: expr_mult ( ('+'|'-') => ('+'|'-')^ expr_mult )*;
expr_operator: expr_add ((operator) => operator^ expr_add)*;


expression:
	(
		  while_loop
		| do_while_loop
		| try_expression
		| operator_and_other_expressions
	);

//block / group
block: '{' (s+=statement)* '}' -> ^(BLOCK $s+);
group: '(' expression ')' -> ^(GROUP expression);

object_literal:
		'(' object_literal_pair+ ')' -> ^(OBJECT_LITERAL object_literal_pair+)
	|	'{' object_literal_pair* '}' -> ^(OBJECT_LITERAL object_literal_pair*);
	
	
object_literal_pair: (key=ID|key=STRING|key=OBJECT_LITERAL_ID) ':' expression delimiter -> ^(PAIR $key expression);

array_literal: '[' (expression delimiter)* ']' -> ^(ARRAY_LITERAL expression*) ;

//if expression
if_expression:
	IF '(' operator_and_other_expressions ')' control_flow_statement
	((ELSE) => (ELSE control_flow_statement))?
	-> ^(IF operator_and_other_expressions control_flow_statement control_flow_statement?);

//try
try_expression:
	(TRY^
		(
	  	  comprehension_body YIELD? expression
  		| control_flow_statement
		)
	((CATCH) => catch_part)?
	((FINALLY) =>	finally_part)?
	);
catch_part: (CATCH) => CATCH^ operator_and_other_expressions;
finally_part: (FINALLY) => FINALLY^ operator_and_other_expressions;

//for comprehension
for_comprehension: FOR^ comprehension_body YIELD? control_flow_statement;
comprehension_body: '(' for_in_expression+ comprehension_filter* ')' -> ^(COMPREHENSION_BODY for_in_expression+ comprehension_filter*);
for_in_expression: ID (',' ID)* '<-' expression delimiter -> ^(FOR_IN ID* expression);
comprehension_filter: IF expression delimiter -> ^(GUARD expression);

//while / do while
while_loop: WHILE^ '('! expression ')'! expression ;
do_while_loop: DO^ expression WHILE! '('! expression ')'! ;

//arguments declarations, argument lists
lambda_argument_declaration: '(' (ID delimiter)* ')' -> ^(ARGUMENT_DECLARATION ID*);
argument_declaration: '(' (arguments+=argument_definition)* (wildcard='...' arguments+=argument_definition)? ')' -> ^(ARGUMENT_DECLARATION $arguments* $wildcard?);
argument_definition: ID (':' type_name)? ('=' operator_and_other_expressions)? (','|';')? -> ^(ARGUMENT_DEFINITION ID type_name? operator_and_other_expressions?);

argument_list:  '(' (args+=operator_and_other_expressions delimiter)* (wildcard='...' args+=operator_and_other_expressions delimiter)? ')'  -> ^(ARGUMENT_LIST $args* $wildcard?);

//lambda
lambda_a: '{' (ID delimiter)* '=>' statement* '}' -> ^(LAMBDA ^(ARGUMENT_DECLARATION ID*) statement*);
lambda_b: ID? '=>' expression -> ^(LAMBDA ^(ARGUMENT_DECLARATION ID?) expression);
lambda_c: lambda_argument_declaration '=>' expression -> ^(LAMBDA lambda_argument_declaration expression);
lambda: lambda_a | lambda_b | lambda_c ; 


//partial functions
partial_function: '{' partial_function_case+ '}' -> ^(PARTIAL_FUNCTION partial_function_case+);

partial_function_case: CASE partial_function_pattern (IF expression)? '=>' statement* -> ^(CASE partial_function_pattern ^(GUARD expression)? statement*);
partial_function_pattern:
		ID -> ^(NAME_PATTERN ID)
	| WILDCARD -> ^(WILDCARD)
	| literal -> ^(EQUALS_PATTERN literal)
	| '`' qualified_id '`' -> ^(EQUALS_PATTERN qualified_id) 
	| ID ':' type_name -> ^(TYPED_PATTERN ID type_name)
	| (ID '@')? qualified_id '(' (patterns+=partial_function_pattern delimiter)* (varargs='...' patterns+=partial_function_pattern delimiter)? ')' -> ^(EXTRACTOR_PATTERN ID? qualified_id $patterns* $varargs? );


//statements	
statement:
	(
	annotations^ declaration | expression | return_value
	) (';') => ';'!?;

control_flow_statement:
	(
	expression | return_value
	);

	
class_statement:
	(
	(annotations^ (method | declaration) ) | expression
	) (';') => ';'!?; 


top_level_statement: 
	(
		import_statement
	| package_declaration
	| annotations^ ( object_declaration | class_declaration | trait_declaration | method | declaration ) //[$annotations.tree]
	) (';') => ';'!?;

	
method_name: (name=ID | name=OPERATOR) -> ^(METHOD_NAME $name);
method:
	DEF name=method_name argument_declaration*  (':' type_name)?
	(
	  '=' ('???' | body+=expression) -> ^(DEF $name argument_declaration* $body* type_name?)
	| '{' statement* '}' -> ^(DEF $name argument_declaration* ^(EXPR ^(BLOCK statement* ^(EXPR NULL["null"]))) type_name?)
	);
				
declaration: (VAL|VAR)^ ID (':' type_name)? '='! expression;

return_value: RETURN^ (';'! | expression);
throw_expression: THROW^ operator_and_other_expressions;

//package / import
package_declaration: PACKAGE^ qualified_id '{'! top_level_statement* '}'!;
import_statement:
	(
		IMPORT^ NATIVE qualified_id
	|	IMPORT^ qualified_id ('.'! WILDCARD)?
	);

//object / trait / class
object_declaration://[CommonTree annotations]:{$annotations}
	CASE? OBJECT ID extends_clause? (('{') => class_body)? -> ^(OBJECT CASE? ID extends_clause? class_body?);
	
class_declaration:
	CASE? CLASS ID argument_declaration? extends_clause? (('{') => class_body)? -> ^(CLASS CASE? ID argument_declaration? extends_clause? class_body?);
	
trait_declaration:
	TRAIT ID trait_extends_clause? (('{') => class_body)? -> ^(TRAIT ID trait_extends_clause? class_body?);

extends_clause: EXTENDS names+=type_name argument_list? (WITH names+=type_name)* -> ^(EXTENDS $names argument_list?);
trait_extends_clause: EXTENDS names+=type_name (WITH names+=type_name)* -> ^(EXTENDS $names);
class_body: '{'! class_statement* '}'!;

//program
program	: top_level_statement* EOF!;


