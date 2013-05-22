{ 	
	/*
1
	12345
 2*(3+4) 
3
*
5

((45))
"hello"
("cat")
{1 2 3}
{"moo":5}
{1 2*3 2+4 "cat"}

	*/
	
	var evaluate = function(stuff) {
    
  	}
  
  	var charListToString = function(list) {
		var result = '';
		for(var n=0; n<list.length; n++) {
			result+=list[n];	
		}	
		return result;
	}
	var jsArrayToObject = function(list) {
		var result = {};
		for(var n=0; n<list.length; n++) {
			result[n] = list[n];	
		}
		return result;
	}
	var objMerge = function(a,b) {
		for(var n in b) {
			if(a[n] !== undefined) {
				return null; // object can't define the same key multiple times	
			}
			a[n]= b[n];	
		}
		return a;
	}		
}

start = expression*

expression 	= a:literal terms:(o:operator b:expression)+ {  
				  var result = a;
				  for(n in terms) {
					result = terms[n][0].operate(result, terms[n][1]);
				  }
				  return result;
				} 
           	/ whitespace* "(" e:expression ")" whitespace* {
					return e;
				}
			/ literal


operator = whitespace* op:(plus / mult) whitespace* {return op;}
 plus = "+" { return {operate: function(a, b) {return a+b;}}; }
 mult = "*" { return {operate: function(a,b) {return a*b;}}; }


word = whitespace* w:([a-zA-Z] [a-z][A-Z][0-9]*) whitespace* {return w;}
literal = whitespace* v:(number / string / object) whitespace* {return v;}

object = whitespace* "{" elems:(objectElement*) members:(objectMember*) "}" whitespace*  { 
				var result = jsArrayToObject(elems);
				for(var n=0; n<members.length; n++) { 
					if(result[n] !== undefined) {
						return null; // object can't define the same key multiple times	
					}	
					objMerge(result,members[n]); 
				}	
				return result;
			}
 objectMember = k:expression ":" v:expression {
					var result = {};
					result[k] = v;
					return result;
				}
              / k:word "=" v:expression {return {k:v};}
 objectElement = value:expression !":" {return value;}
              

string = '"' s:([^"]*) '"' {return charListToString(s);}
       / "'" s:([^']*) "'" {return charListToString(s);}
number = integer
integer "integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

whitespace = " " / "\n" / "\t"