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
  
  // Forward Declarations
  self.SourceElement = (input => SourceElement(input)) 
  self.AssignmentExpression = (input => AssignmentExpression(input))
  self.Expression = (input => Expression(input))
  self.Statement = (input => Statement(input))
  self.LeftHandSideExpression = (input => LeftHandSideExpression(input))
  
  self.Whitespace = choice("\t", " ");
  self.LineTerminator = choice(ch("\r"), ch("\n"));
  
  self.SingleLineCommentChars = join_action(repeat1(negate(LineTerminator)), "");
  self.SingleLineComment = sequence("//", optional(SingleLineCommentChars), LineTerminator);
  
  self.MultiLineCommentChars = join_action(repeat1(negate("*/")),"")
  self.MultiLineComment = sequence("/*",optional(MultiLineCommentChars),"*/")
  
  self.Comment = choice(SingleLineComment,MultiLineComment);
  
  case class Ast(label,ast)
  case class VarDef(name,value)
  case class ValDef(name,value)
  case class LiteralString(value)
      
  def Wrapped(label,parser,transform) = ( action(parser,(ast => [Ast(label,transform? transform(ast):ast)] )) )
      
  self.NullLiteral = token("null");
  self.BooleanLiteral = choice("true", "false");
  self.DecimalDigit = action(range("0", "9"), (ast => parseInt(ast) ));
  self.NonZeroDigit = action(range("1", "9"), (ast => parseInt(ast) ));
  self.DecimalDigits = repeat1(DecimalDigit); 
  self.DecimalIntegerLiteral = choice(join_action(flattenParser(sequence(NonZeroDigit, DecimalDigits)),""),DecimalDigit);
  self.SignedInteger = choice(DecimalDigits, sequence("+", DecimalDigits), sequence("-", DecimalDigits));
  self.ExponentIndicator = choice("e", "E");
  self.ExponentPart = sequence(ExponentIndicator, SignedInteger);
  self.DecimalLiteral = choice(
                          sequence(DecimalIntegerLiteral, ".", optional(join_action(DecimalDigits,"")), optional(ExponentPart)),
                          sequence(".", DecimalDigits, optional(ExponentPart)),
                          sequence(DecimalIntegerLiteral, optional(ExponentPart))
                        );
  
  self.HexDigit = choice(range("0", "9"), range("a", "f"), range("A", "F"));
  self.HexIntegerLiteral = sequence(choice("0x", "0X"), repeat1(HexDigit));
  self.NumericLiteral = choice(HexIntegerLiteral, DecimalLiteral);
  self.SingleEscapeCharacter = choice("'", "\"", "\\", "b", "f", "n", "r", "t", "v");
  self.NonEscapeCharacter = negate(SingleEscapeCharacter);
  
  self.CharacterEscapeSequence = choice(SingleEscapeCharacter, NonEscapeCharacter);
  self.HexEscapeSequence = sequence("x", HexDigit, HexDigit);
  self.UnicodeEscapeSequence = sequence("u", HexDigit, HexDigit, HexDigit, HexDigit);
  self.EscapeSequence = choice(HexEscapeSequence, UnicodeEscapeSequence, CharacterEscapeSequence);
  self.SingleStringCharacter = choice(negate(choice("\'", "\\", "\r", "\n")),
            sequence("\\", EscapeSequence));
  self.DoubleStringCharacter = choice(negate(choice("\"", "\\", "\r", "\n")),
                sequence("\\", EscapeSequence));
  self.SingleStringCharacters = repeat0(SingleStringCharacter);
  self.DoubleStringCharacters = repeat0(DoubleStringCharacter);
  
  self.StringLiteral = action(choice(
                         sequence(expect("\"\"\""),join_action(repeat0(negate("\"\"\"")),""),expect("\"\"\"")),
                         sequence(expect("\""),join_action(DoubleStringCharacters,""),expect("\"")),
                         sequence(expect("'"),join_action(SingleStringCharacters,""),expect("'"))
                         ),(ast => LiteralString(ast[0][0])));
  
  self.Literal = choice(NullLiteral, BooleanLiteral, NumericLiteral, StringLiteral);
  
  self.Keyword = 
      choice("break",
          "case",
          "catch",
          "continue",
          "default",
          "delete",
          "do",
          "else",
          "finally",
          "for",
          "function",
          "if",
          "in",
          "instanceof",
          "new",
          "return",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "var",
          "val",
          "void",
          "while",
          "with");
  
  self.ReservedWord = choice(Keyword, NullLiteral, BooleanLiteral);
  
  self.HexDigit = choice(range("0", "9"), range("a", "f"), range("A", "F"));
  self.IdentifierLetter = choice(range("a", "z"), range("A", "Z"));
  self.IdentifierStart = choice(IdentifierLetter, "$", "_");
  self.IdentifierPart = choice(IdentifierStart, range("0-9"));
  self.IdentifierName = 
      action(sequence(IdentifierStart, join_action(repeat0(IdentifierPart), "")),
       function(ast) { 
           return ast[0].concat(ast[1]); 
       });
  self.Identifier = butnot(IdentifierName, ReservedWord);
  
  self.StatementList = repeat1(Statement);
  self.Block = wsequence("{", optional(StatementList), "}");
  self.Initialiser = wsequence(expect("="), AssignmentExpression);
  self.VariableDeclaration = wsequence(Identifier, optional(Initialiser));
  self.VariableDeclarationList = wlist(VariableDeclaration, ",");
  self.MutableVariableStatement = action(wsequence(expect("var"), VariableDeclarationList),(ast=>
    for(variable <- ast[0]) yield {
      //console.log(variable)
      if(variable[1].length > 0)
        return VarDef(variable[0],flattenAst(variable[1][0]))
      else
        return VarDef(variable[0],null)
    }.toArray()
  ));
  self.ImmutableVariableStatement = Wrapped("ValDef",flattenParser(wsequence(expect("val"), VariableDeclarationList)));
  self.VariableStatement = choice(MutableVariableStatement,ImmutableVariableStatement)
      //wsequence("var", VariableDeclarationList);
  
  self.EmptyStatement = token(";");
  
  self.IfStatement = 
      choice(wsequence("if", "(", Expression, ")", Statement, "else", Statement),
          wsequence("if", "(", Expression, ")", Statement));
  
  self.IterationStatement =
      choice(wsequence("do", Statement, "while", "(", Expression, ")", ";"),
          wsequence("while", "(", Expression, ")", Statement),
          wsequence("for", "(", optional(Expression), ";", optional(Expression), ";", optional(Expression), ")", Statement),
          wsequence("for", "(", "var", VariableDeclarationList, ";", optional(Expression), ";", optional(Expression), ")", Statement),
          wsequence("for", "(", LeftHandSideExpression, "in", Expression, ")", Statement),
          wsequence("for", "(", "var", VariableDeclaration, "in", Expression, ")", Statement));
  
  self.ContinueStatement = wsequence("continue", optional(Identifier), ";");
  self.BreakStatement = wsequence("break", optional(Identifier), ";");
  self.ReturnStatement = wsequence("return", optional(Expression), optional(";"));
  self.WithStatement = wsequence("with", "(", Expression, ")", Statement);
  
  
  self.CaseClause =
      wsequence("case", Expression, ":", optional(StatementList));
  self.DefaultClause =
      wsequence("default", ":", optional(StatementList));
  self.CaseBlock =
      choice(wsequence("{", repeat0(CaseClause), "}"),
          wsequence("{", repeat0(CaseClause), DefaultClause, repeat0(CaseClause), "}"));
  
  self.SwitchStatement = wsequence("switch", "(", Expression, ")", CaseBlock);
  self.LabelledStatement = wsequence(Identifier, ":", Statement);
  self.ThrowStatement = wsequence("throw", Expression, ";");
  
  self.Catch = wsequence("catch", "(", Identifier, ")", Block);
  self.Finally = wsequence("finally", Block);
  self.TryStatement = 
      choice(wsequence("try", Block, Catch),
          wsequence("try", Block, Finally),
          wsequence("try", Block, Catch, Finally));
  
  self.ExpressionStatement = 
      choice(sequence(choice("{", "function"), nothing_p),
          Expression);
  self.Statement = 
      choice(Block,
          VariableStatement,
          EmptyStatement,
          ExpressionStatement,
          IfStatement,
          IterationStatement,
          ContinueStatement,
          BreakStatement,
          ReturnStatement,
          WithStatement,
          SwitchStatement,
          LabelledStatement,
          ThrowStatement,
          TryStatement);
  
  self.FunctionDeclaration = 
      function(input) { return FunctionDeclaration(input); }
  self.Arguments = 
      function(input) { return Arguments(input); }
  
  self.FunctionBody = repeat0(SourceElement);
  self.FormalParameterList = wlist(Identifier, ",");	      
  self.FunctionExpression = 
      wsequence("function", optional(Identifier), "(", optional(FormalParameterList), ")", "{", FunctionBody, "}");
  
  self.FunctionDeclaration = 
      wsequence("function", Identifier, "(", optional(FormalParameterList), ")", "{", FunctionBody, "}");
    
  self.ExtendsClause = wsequence("extends",Identifier,optional(Arguments))
  self.ClassDeclaration = 
    wsequence("class",Identifier,optional(wsequence("(",optional(FormalParameterList),")")),optional(ExtendsClause),optional(wsequence("{","}")));
  
  
  self.PrimaryExpression = 
      function(input) { return PrimaryExpression(input); }
  
  self.ArgumentList = list(AssignmentExpression, ",");       
  self.Arguments = 
      choice(wsequence("(", ")"),
          wsequence("(", ArgumentList, ")"));
  
  self.MemberExpression = function(input) { return MemberExpression(input); }    
  self.MemberExpression =
      left_factor_action(sequence(choice(wsequence("new", MemberExpression, Arguments),
              PrimaryExpression,
              FunctionExpression),
          repeat0(choice(wsequence("[", Expression, "]"),
                wsequence(".", Identifier)))));
  self.NewExpression = 
      function(input) { return NewExpression(input); }
  self.NewExpression = 
      choice(MemberExpression,
          wsequence("new", NewExpression));
  self.CallExpression = 
      left_factor_action(wsequence(wsequence(MemberExpression, Arguments),
          repeat0(choice(Arguments,
                wsequence("[", Expression, "]"),
                wsequence(".", Identifier)))));
            
  self.LeftHandSideExpression = choice(CallExpression, NewExpression);
  
  self.AssignmentOperator = 
      choice("=",
          "*=",
          "/=",
          "%=",
          "+=",
          "-=",
          "<<=",
          ">>=",
          ">>>=",
          "&=",
          "^=",
          "|=");
  
  self.LogicalORExpression = 
      function(input) { return LogicalORExpression(input); }
  self.LogicalANDExpression = 
      function(input) { return LogicalANDExpression(input); }
  self.BitwiseORExpression = 
      function(input) { return BitwiseORExpression(input); }
  self.BitwiseXORExpression = 
      function(input) { return BitwiseXORExpression(input); }
  self.BitwiseANDExpression = 
      function(input) { return BitwiseANDExpression(input); }
  self.EqualityExpression = 
      function(input) { return EqualityExpression(input); }
  self.RelationalExpression = 
      function(input) { return RelationalExpression(input); }
  self.ShiftExpression = 
      function(input) { return ShiftExpression(input); }
  self.AdditiveExpression = 
      function(input) { return AdditiveExpression(input); }
  self.MultiplicativeExpression = 
      function(input) { return MultiplicativeExpression(input); }
  self.UnaryExpression = 
      function(input) { return UnaryExpression(input); }
  self.PostfixExpression = 
      function(input) { return PostfixExpression(input); }
  
  self.PostfixExpression =
      choice(wsequence(LeftHandSideExpression, "++"),
          wsequence(LeftHandSideExpression, "--"),
          LeftHandSideExpression);
  
  self.UnaryExpression =
      choice(PostfixExpression,
          wsequence("delete", UnaryExpression),
          wsequence("void", UnaryExpression),
          wsequence("typeof", UnaryExpression),
          wsequence("++", UnaryExpression),
          wsequence("--", UnaryExpression),
          wsequence("+", UnaryExpression),
          wsequence("-", UnaryExpression),
          wsequence("~", UnaryExpression),
          wsequence("!", UnaryExpression));
  
  self.MultiplicativeExpression =
      wsequence(UnaryExpression,
          repeat0(choice(wsequence("*", UnaryExpression),
          wsequence("/", UnaryExpression),
          wsequence("%", UnaryExpression))));
  
  self.AdditiveExpression =
      wsequence(MultiplicativeExpression,
          repeat0(choice(wsequence("+", MultiplicativeExpression),
          wsequence("-", MultiplicativeExpression))));
          
  self.ShiftExpression = 
      wsequence(AdditiveExpression,
          repeat0(choice(wsequence("<<", AdditiveExpression),
          wsequence(">>", AdditiveExpression),
          wsequence(">>>", AdditiveExpression))));
  
  self.RelationalExpression =
      wsequence(ShiftExpression,
          repeat0(choice(wsequence("<", ShiftExpression),
          wsequence(">", ShiftExpression),
          wsequence("<=", ShiftExpression),
          wsequence(">=", ShiftExpression),
          wsequence("instanceof", ShiftExpression))));
  
  self.EqualityExpression =
      wsequence(RelationalExpression, 
          repeat0(choice(wsequence("==", RelationalExpression),
          wsequence("!==", RelationalExpression),
          wsequence("===", RelationalExpression),
          wsequence("!==", RelationalExpression))));
  
  self.BitwiseANDExpression = 
      wsequence(EqualityExpression, repeat0(wsequence("&", EqualityExpression)));
  self.BitwiseXORExpression = 
      wsequence(BitwiseANDExpression, repeat0(wsequence("^", BitwiseANDExpression)));
  self.BitwiseORExpression = 
      wsequence(BitwiseXORExpression, repeat0(wsequence("|", BitwiseXORExpression)));
  self.LogicalANDExpression = 
      wsequence(BitwiseORExpression, repeat0(wsequence("&&", BitwiseORExpression)));
  
  self.LogicalORExpression = 
      wsequence(LogicalANDExpression, repeat0(wsequence("||", LogicalANDExpression)));
  
  self.ConditionalExpression = 
      choice(LogicalORExpression,
          wsequence(LogicalORExpression, "?", AssignmentExpression, ":", AssignmentExpression));
  
  self.AssignmentExpression = 
      choice(wsequence(LeftHandSideExpression, AssignmentOperator, AssignmentExpression),
          ConditionalExpression);
  
  self.Expression = list(AssignmentExpression, ",");
  
  self.Elision = repeat1(","); 
  self.ElementList = list(wsequence(optional(Elision), AssignmentExpression), ",");
  self.ArrayLiteral = 
      choice(wsequence("[", optional(Elision), "]"),
          wsequence("[", ElementList, "]"),
          wsequence("[", ElementList, optional(Elision), "]"));
  
  self.PropertyName = choice(Identifier, StringLiteral, NumericLiteral);
  self.PropertyNameAndValueList =
      list(wsequence(PropertyName, ":", AssignmentExpression), ",");
  self.ObjectLiteral = 
      choice(wsequence("{", "}"),
          wsequence("{", PropertyNameAndValueList, "}"));
  
  self.PrimaryExpression = 
      choice("this",
          wsequence("(", Expression, ")"),
          Identifier,
          ArrayLiteral,
          ObjectLiteral,
          Literal);
  self.SourceElement = choice(Comment, Statement, FunctionDeclaration, ClassDeclaration);
  self.Program = repeat0(SourceElement);

}
