// Copyright (C) 2007 Chris Double.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// DEVELOPERS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

package es3 {  
  object Tests{
    def main(){
      
      withExecutor(code => eval(code) ){=>
        time{=> runTests(allTests) }
      }
    }
    
    
    def WhitespaceTest() {
      assertTrue("Whitespace failed to parse space", Whitespace(ps(" ")));
      assertTrue("Whitespace failed to parse tab", Whitespace(ps("\t")));
      assertFalse("Whitespace parsed non-space", Whitespace(ps("abcd")).success);
    }
  
    def LineTerminatorTest() {
      assertTrue("LineTerminator failed to parse carriage return", LineTerminator(ps("\n")));
      assertTrue("LineTerminator failed to parse newline", LineTerminator(ps("\n")));
      assertFalse("LineTerminator parsed incorrect data", LineTerminator(ps("abcd")).success);
    }
      
    def SingleLineCommentTest() {
      assertTrue("SingleLineComment failed to parse comment with no space", SingleLineComment(ps("//foo\n")));
      assertTrue("SingleLineComment failed to parse comment with space", SingleLineComment(ps("// foo\n")));
    }
  
    def CommentTest() {
      assertFullyParsed("Comment", "// foo\r");
      assertFullyParsed("Comment", "//foo\n");
      assertFullyParsed("Comment", "/* foo */");
      assertParseFailed("Comment", "/* /* foo */ */"); //invalid test, multi line comments don't nest
      assertFullyParsed("Comment", "/* foo \n * bar  */");
      
      assertFullyParsed("Program", "var x = \"/* asdf */\" /* asdf /* */");
    }
  
    def NullLiteralTest() {
      assertTrue("NullLiterator failed to parse null", NullLiteral(ps("null")));
      assertFalse("NullLiterator parsed invalid data", NullLiteral(ps("xnull")).success);
    }
  
    def DecimalDigitTest() {
      assertEqual("DecimalDigit failed to parse 0", DecimalDigit(ps("0")).ast, 0);
      assertEqual("DecimalDigit failed to parse 1", DecimalDigit(ps("1")).ast, 1);
      assertEqual("DecimalDigit failed to parse 2", DecimalDigit(ps("2")).ast, 2);
      assertEqual("DecimalDigit failed to parse 3", DecimalDigit(ps("3")).ast, 3);
      assertEqual("DecimalDigit failed to parse 4", DecimalDigit(ps("4")).ast, 4);
      assertEqual("DecimalDigit failed to parse 5", DecimalDigit(ps("5")).ast, 5);
      assertEqual("DecimalDigit failed to parse 6", DecimalDigit(ps("6")).ast, 6);
      assertEqual("DecimalDigit failed to parse 7", DecimalDigit(ps("7")).ast, 7);
      assertEqual("DecimalDigit failed to parse 8", DecimalDigit(ps("8")).ast, 8);
      assertEqual("DecimalDigit failed to parse 9", DecimalDigit(ps("9")).ast, 9);
      assertFalse("DecimalDigit parsed invalid data", DecimalDigit(ps("a")).success);
    }
  
    def NonZeroDigitTest() {
      assertEqual("NonZeroDigit failed to parse 1", NonZeroDigit(ps("1")).ast, 1);
      assertEqual("NonZeroDigit failed to parse 2", NonZeroDigit(ps("2")).ast, 2);
      assertEqual("NonZeroDigit failed to parse 3", NonZeroDigit(ps("3")).ast, 3);
      assertEqual("NonZeroDigit failed to parse 4", NonZeroDigit(ps("4")).ast, 4);
      assertEqual("NonZeroDigit failed to parse 5", NonZeroDigit(ps("5")).ast, 5);
      assertEqual("NonZeroDigit failed to parse 6", NonZeroDigit(ps("6")).ast, 6);
      assertEqual("NonZeroDigit failed to parse 7", NonZeroDigit(ps("7")).ast, 7);
      assertEqual("NonZeroDigit failed to parse 8", NonZeroDigit(ps("8")).ast, 8);
      assertEqual("NonZeroDigit failed to parse 9", NonZeroDigit(ps("9")).ast, 9);
      assertFalse("NonZeroDigit parsed zero", NonZeroDigit(ps("0")).success);
      assertFalse("NonZeroDigit parsed invalid data", NonZeroDigit(ps("a")).success);
    }
  
    def IdentifierTest() {
      assertFullyParsed("Identifier", "abcd");
      assertFalse("Identifier('while')", Identifier(ps('while')).success);
      assertTrue("Identifier('abcd').ast=='abcd'", Identifier(ps('abcd')).ast=='abcd'); 
    }
  
    def DecimalDigitsTest() {
      assertEqual("DecimalDigits failed to parse 123", DecimalDigits(ps("123")).ast.toString(), "1,2,3");
    }
  
    def AssignmentExpressionTest() {
      assertFullyParsed("AssignmentExpression", "a=1");
      assertFullyParsed("AssignmentExpression", "a=b");
      assertFullyParsed("AssignmentExpression", "a");
      assertFullyParsed("AssignmentExpression", "12");
    }
  
    def ExpressionTest() {
      assertFullyParsed("Expression", "1");
      assertFullyParsed("Expression", "'ddf'");
      assertFullyParsed("Expression", "\"ddf\"");
      assertFullyParsed("Expression", "foo");
      assertFullyParsed("Expression", "foo.bar");
    }
  
    def VariableDeclarationTest() {
      assertFullyParsed("VariableDeclaration", "a");
      assertFullyParsed("VariableDeclaration", "a=1");
    }
  
    def VariableStatementTest() {
      assertFullyParsed("VariableStatement", "var a");
      assertFullyParsed("VariableStatement", "var a,b");
      assertFullyParsed("VariableStatement", "var a=1");
      assertFullyParsed("VariableStatement", "var a = 1, b = 2,c=3");
    }
  
    def IfStatementTest() {
      assertFullyParsed("IfStatement", "if(a) { }");
      assertFullyParsed("IfStatement", "if(a) { var a=2; var b=3; print('foo') }");
    }
  
    def ArrayLiteralTest() {
      assertFullyParsed("ArrayLiteral", "[]");
      assertFullyParsed("ArrayLiteral", "[ ]");
      assertFullyParsed("ArrayLiteral", "[ 1,2,3 ]");
      assertFullyParsed("ArrayLiteral", "[ 1,,3 ]");
      assertFullyParsed("ArrayLiteral", "[ 'hello' ]");
      assertFullyParsed("ArrayLiteral", "[ 1,[2,3],4 ]");
    }
  
    def ObjectLiteralTest() {
      assertFullyParsed("ObjectLiteral", "{}");
      assertFullyParsed("ObjectLiteral", "{ }");
      assertFullyParsed("ObjectLiteral", "{ one: 1 }");
      assertFullyParsed("ObjectLiteral", "{ one: 1, two: 'two' }");
      assertFullyParsed("ObjectLiteral", "{ one: 1, two: {three:3}, four:4 }");
    }
  
    def IterationTest() {
      assertFullyParsed("IterationStatement", "for(;;) ;");
      assertFullyParsed("IterationStatement", "for(;;) { }");
      assertFullyParsed("IterationStatement", "for(i=0;i<5;++i) ;");
      assertFullyParsed("IterationStatement", "for(i=0;i<5;++i) {}");
      assertFullyParsed("IterationStatement", "for(var i=0;i<5;++i) ;");
      assertFullyParsed("IterationStatement", "for(i=0;i<foo.length;++i) ;");
    }
  
    def FunctionDeclarationTest() {
      assertFullyParsed("FunctionBody", "{ }");
      assertFullyParsed("FunctionBody", "{ return; }");
      assertFullyParsed("FormalParameterList", "a,b");
      assertFullyParsed("FormalParameterList", "a ,b");
      assertFullyParsed("FormalParameterList", "a , b");
      assertFullyParsed("FormalParameterList", "a, b");
      assertFullyParsed("FunctionDeclaration", "function identity() { }");
      assertFullyParsed("FunctionDeclaration", "function identity(a) { }");
      assertFullyParsed("FunctionDeclaration", "function identity(a) { return a; }");
      assertFullyParsed("FunctionDeclaration", "function identity() { return ;}");
      assertFullyParsed("FunctionDeclaration", "function identity(b) { var a=12; return a+b; }");
      assertFullyParsed("FunctionBody", "return;");
      assertFullyParsed("FunctionBody", "return 123;");
      assertFullyParsed("FunctionBody", "return function() { };");
    }
  
    def ClassTest(){
      assertFullyParsed("ClassDeclaration", "class A");
      assertFullyParsed("ClassDeclaration", "class A{}");
      assertFullyParsed("ClassDeclaration", "class A()");
      assertFullyParsed("ClassDeclaration", "class A(){}");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c)");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c){}");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B{}");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B()");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B(){}");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B(a,b,c)");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B(a,b,c){}");
      assertFullyParsed("ClassDeclaration", "class A(a,b,c) extends B(a,b,c){");
    }
    
    case class XmlAttribute(name,value)
    case class XmlElement(name,attributes,children)
    case class XmlText(text)
    case class XmlCdata(text)
    case class XmlComment(text)
    case class XmlReference(value)
  
    def ProgramTest(){
      assertFullyParsed("Program", "var x = 10\nval y = 20.05\nfunction test(){ alert(x)\nreturny }");
      
      print(Program(ps("var a=.5\nvar b=1.\nvar c = 'asdf'\nvar d=''\nvar e=\"\"\n\nvar x = 10\nval y = 20.05\nval z=1\nfunction test(){ alert(x)\nreturn y }")).ast)
      print(Program(ps("var a= \"\"\"\n\n\n abc \"def\" \n\"\"\"\nvar b=10")).ast)
      
      //var xml_literal = and_then(
      //          sequence(expect("{<"),join_action(repeat1(negate(">")),""),expect(">")),
      //          (ast =>
      //            expect(sequence("</",ast[0],">}"))
      //          )
      //        )
      //
      //
      //assertTrue("",xml_literal(ps("{"+"<div></div>"+"}")).remaining.length == 0)
      //assertTrue("",!xml_literal(ps("{<div></span>}")))
      
      var whitespace_char = choice(" ","\t","\n","\r")
      var whitespace_chars = expect(repeat1(whitespace_char))
      var xml_node = (input => xml_node(input))
      var xml_name_start_char = choice(":", range("A", "Z"),"_", range("a", "z"), unicode_range(0xC0,0xD6), unicode_range(0xC0,0xD6), unicode_range(0xD8,0xF6), unicode_range(0xF8,0x2FF), unicode_range(0x370,0x37D), unicode_range(0x37F,0x1FFF), unicode_range(0x200C,0x200D), unicode_range(0x2070,0x218F), unicode_range(0x2C00,0x2FEF), unicode_range(0x3001,0xD7FF), unicode_range(0xF900,0xFDCF), unicode_range(0xFDF0,0xFFFD), unicode_range(0x10000,0xEFFFF));
      var xml_name_char = choice(xml_name_start_char,",", ".",range("0","9"),String.fromCharCode(0xB7),unicode_range(0x0300,0x036F), unicode_range(0x203F,0x2040))
      var xml_name = join_flatten(sequence(xml_name_start_char,repeat0(xml_name_char)))
      var xml_entity_reference = sequence("&",xml_name,";")
      var xml_character_reference = choice(
                                      sequence('&#',repeat1(range("0","9")),';'),
                                      sequence('&#x',repeat1(choice(range("0","9"),range("a","f"),range("A","F"))),';')
                                      )
      var xml_reference = choice(xml_entity_reference,xml_character_reference)
      var xml_attribute_value = join_flatten(
                                    choice(
                                      sequence(expect('"'),repeat0(choice(negate(choice("<","&",'"')),xml_reference)),expect('"')),
                                      sequence(expect("'"),repeat0(choice(negate(choice("<","&","'")),xml_reference)),expect("'"))
                                    )
                                  )
      var xml_attribute = action(
                            sequence(
                              expect(whitespace_chars),
                              xml_name,
                              expect(whitespace("=")),
                              whitespace(xml_attribute_value)
                            ),
                            (ast => XmlAttribute(ast[0],ast[1]))
                          )
      
      var xml_empty_element_tag = action(
                                    sequence(expect("<"),xml_name,repeat0(xml_attribute),whitespace(expect("/>"))),
                                    (ast => XmlElement(ast[0],ast[1],[]))
                                  )
      var xml_start_end_tag = action(
                                and_then(
                                  sequence(expect("<"),xml_name,repeat0(xml_attribute),whitespace(expect(">"))),
                                  (ast =>
                                    sequence(
                                      repeat0(xml_node),
                                      expect(sequence("</",ast[0],whitespace(">")))
                                    )
                                  )
                                ),
                                (ast => XmlElement(ast[0][0],ast[0][1],ast[1][0]))
                              )
      var xml_tag = choice(xml_empty_element_tag,xml_start_end_tag)
      //var xml_code_fragment = sequence(expect("{"),expression,expect("}"))
      
      
      
      var xml_char = choice(String.fromCharCode(0x9), String.fromCharCode(0xA), String.fromCharCode(0xD), unicode_range(0x20,0xD7FF), unicode_range(0xE000,0xFFFD), unicode_range(0x10000,0x10FFFF))
      var xml_text_char = negate(choice("]]>","<","&")) //[^<&]* - ([^<&]* ']]>' [^<&]*)

      
      var xml_text = join_flatten(repeat1(xml_text_char))//sequence(negate("<"),repeat0(xml_char))
         
      var xml_comment = sequence(expect("<!--"),repeat0(negate("-->")),expect("-->"))
      var xml_cdata = sequence(expect("<![CDATA["),repeat0(negate("]]>")),expect("]]>"))
      
      var xml_node = choice(xml_tag,xml_reference,xml_cdata,xml_comment,xml_text/*,xml_code_fragment*/)
      var xml_literal = choice(
                          wsequence(expect("("),xml_tag,expect(")")),
                          wsequence(expect("{"),xml_tag,expect("}"))
                        )
      var xml_literal_test_data = """
      {
        <div>
          <hr />
          <br />
          <img src='bla' style='display:none;' />
          <p>What's your name</p>
          <h1>Who's your daddy?</h1>
        </div>
      }
      """

      print(xml_node(ps("<div id='???'/>")))
      print(xml_node(ps("<div id='bob'></div>")))
      print(xml_node(ps("<div id=\"john's john\">sdf&amp;bla</div>")))
      print(xml_node(ps("<<.dsf sdf")))
      
      print(xml_literal(ps(xml_literal_test_data)))
      
      //print(xml_name_start_char(ps(",")))
      //print(xml_empty_element_tag(ps("<div id='bob' />")))
      //print(xml_tag(ps("<div/>")))
      //print(xml_tag(ps("<div />")))
      //print(xml_tag(ps("<div id='' />")))
      //print(xml_literal(ps(xml_literal_test_data)))
      
      
    }
      
    def allTests() {
      WhitespaceTest();
      LineTerminatorTest();
      SingleLineCommentTest();
      CommentTest();
      NullLiteralTest();
      DecimalDigitTest();
      NonZeroDigitTest();
      DecimalDigitsTest();
      IdentifierTest();
      VariableStatementTest();
      VariableDeclarationTest();
      AssignmentExpressionTest();
      ExpressionTest();
      IfStatementTest();
      ArrayLiteralTest();
      ObjectLiteralTest();
      IterationTest();
      FunctionDeclarationTest();
      ClassTest();
      ProgramTest()
    }
    
    
  }

}