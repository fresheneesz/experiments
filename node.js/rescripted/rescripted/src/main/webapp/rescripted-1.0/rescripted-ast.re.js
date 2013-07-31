//rescripted-settings:{"immediate":true}

import rescripted.collections._

package rescripted.lang {

  object Ast{
    //literals
    case class TripleQuotedString(str){val isExpression = true}
    case class DoubleQuotedString(str){val isExpression = true}
    case class SingleQuotedString(str){val isExpression = true}

    case class NumberLiteral(value){val isExpression = true}
    
    case class ArrayLiteral(exprs){val isExpression = true}
    case class JsonKeyValue(id,expr)
    case class JsonLiteral(jsonKeyValuePairs){val isExpression = true}
    
    case class SimpleId(id)
    case class QualifiedId(id)
    
    //xml
    case class XmlLiteral(node){val isExpression = true}
    case class XmlText(text)
    case class XmlComment(text)
    case class XmlCData(text)
    case class XmlRescriptedFragment(expr)
    case class XmlStartEndTag(nameAndAttrs,bodySeq)
    case class XmlEmptyElementTag(tagName,attributes)
    case class XmlAttribute(name,value)
    case class XmlEntityReference(name)
    
    case class CaseLiteralPattern(literal)
    case class CaseStatement(pattern,optGuard,statementList) //provides scope...
    case class PartialFunction(caseStatements){val isExpression = true}
    
    case class ArgumentDeclaration(id,optType,optDefaultValue)
    case class LambdaExpression(arguments,optExpression){val isExpression = true}  //provides scope...
    case class MethodDeclaration(annotations,modifiers,id,optArgs,body) //provides scope...
    
    case class ExpressionChain(chainedItems)
    case class SimpleExpression(expr,exprChain){val isExpression = true}
    case class BinaryOperation(exprA,op,exprB){val isExpression = true}
    case class UnaryOperation(unaryOperator,expr){val isExpression = true}

    case class ForComprehension(forInStatements,forGuards,optYield,expr){val isExpression = optYield != None}  //provides scope...
    case class ForInStatement(id,expr)
    case class ForGuard(expr)

    case class WhileExpression(clauseExpr,bodyExpr){val isExpression = true}
    case class DoWhileExpression(bodyExpr,clauseExpr){val isExpression = true}
    
    case class EmptyBlockExpression(){val isExpression = true}

    case class Annotation(id,optArgs)

    case class NewStatement(id,optArguments){val isExpression = true}
    case class ClassDeclaration(id,optArgsList,optExtendsClause,optClassBody) //provides scope...
    case class CaseClassDeclaration(id,optArgsList,optExtendsClause,optClassBody) //provides scope...
    
    case class ObjectDeclaration(id,optExtends,optBody) //provides scope...
    case class CaseObjectDeclaration(id,optExtends,optBody) //provides scope...
    case class TraitDeclaration(id,optExtends,optBody) //provides scope...
    
    case class ExtendsClause(id,optArgsList)
    case class ClassBody(id,statementList) //provides scope...?
    
    case class IfExpression(clause,expr,optElseExpression){val isExpression = true}
    case class ElseExpression(expr)

    case class ValDeclaration(id,expr)
    case class VarDeclaration(id,expr)
    case class MemberValDeclaration(annotations,modifiers,id,expr)
    case class MemberVarDeclaration(annotations,modifiers,id,expr)
    
    case class AssignmentStatement(id,expr)
    
    case class BlockExpression(statementList){val isExpression = true} //provides scope...
    case class GroupExpression(expr){val isExpression = true}
    
    case class TryExpression(tryBody,optCatchExpr,optFinallyExpr){val isExpression = true}
    
    case class ReturnStatement(optExpr)
    case class ThrowStatement(expr){val isExpression = true}
    case class DeleteStatement(qualifiedId)

    case class ImportStatement(idParts)
    case class PackageDeclaration(id,statementList) //provides scope...
    
    case class Program(statementList)
  }
  
}
