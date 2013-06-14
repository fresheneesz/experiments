Rescripted('Rescripted.Lang.Parser',['Rescripted.Lang.Antlr','Rescripted.Lang.Lexer'],function(org,RescriptedLexer){// $ANTLR 3.3 Nov 30, 2010 12:46:29 Rescripted.g 2012-04-09 16:25:30

var RescriptedParser = function(input, state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){
    }).call(this);

    RescriptedParser.superclass.constructor.call(this, input, state);

    this.dfa10 = new RescriptedParser.DFA10(this);
    this.dfa11 = new RescriptedParser.DFA11(this);
    this.dfa12 = new RescriptedParser.DFA12(this);
    this.dfa28 = new RescriptedParser.DFA28(this);

         

    /* @todo only create adaptor if output=AST */
    this.adaptor = new org.antlr.runtime.tree.CommonTreeAdaptor();

};

org.antlr.lang.augmentObject(RescriptedParser, {
    EOF: -1,
    T__111: 111,
    T__112: 112,
    T__113: 113,
    T__114: 114,
    T__115: 115,
    T__116: 116,
    T__117: 117,
    T__118: 118,
    T__119: 119,
    T__120: 120,
    T__121: 121,
    BLOCK: 4,
    GROUP: 5,
    PAIR: 6,
    OBJECT_LITERAL: 7,
    ARRAY_LITERAL: 8,
    FOR_IN: 9,
    COMPREHENSION_BODY: 10,
    GUARD: 11,
    ARGUMENT_DECLARATION: 12,
    ARGUMENT_DEFINITION: 13,
    ARGUMENT_LIST: 14,
    LAMBDA: 15,
    METHOD_NAME: 16,
    QUALIFIED_ID: 17,
    ANNOTATIONS: 18,
    ANNOTATION: 19,
    PARTIAL_FUNCTION: 20,
    EXTRACTOR_PATTERN: 21,
    EQUALS_PATTERN: 22,
    NAME_PATTERN: 23,
    TYPED_PATTERN: 24,
    SELECT_PROPERTY: 25,
    BINDING: 26,
    BIND_PROPERTY: 27,
    BIND_EXPRESSION: 28,
    EXPR: 29,
    TYPE: 30,
    IMPORT: 31,
    PACKAGE: 32,
    CLASS: 33,
    OBJECT: 34,
    TRAIT: 35,
    EXTENDS: 36,
    WITH: 37,
    BASE: 38,
    SUPER: 39,
    CASE: 40,
    IF: 41,
    ELSE: 42,
    THROW: 43,
    TRY: 44,
    CATCH: 45,
    FINALLY: 46,
    PUBLIC: 47,
    PRIVATE: 48,
    PROTECTED: 49,
    OVERRIDE: 50,
    FINAL: 51,
    NATIVE: 52,
    DEF: 53,
    VAR: 54,
    VAL: 55,
    VARARGS: 56,
    FOR: 57,
    WHILE: 58,
    DO: 59,
    YIELD: 60,
    SELF: 61,
    THIS: 62,
    RETURN: 63,
    NEW: 64,
    DELETE: 65,
    NULL: 66,
    TRUE: 67,
    FALSE: 68,
    WILDCARD: 69,
    COLON: 70,
    ID_START: 71,
    ID_CHAR: 72,
    BAD_ID: 73,
    ID: 74,
    OBJECT_LITERAL_ID_: 75,
    WS: 76,
    OBJECT_LITERAL_ID: 77,
    INT: 78,
    HEX_DIGIT: 79,
    HEX_INT: 80,
    EXPONENT: 81,
    FLOAT: 82,
    UNICODE_ESC: 83,
    OCTAL_ESC: 84,
    ESC_SEQ: 85,
    XML_NAME: 86,
    XML_ATTR: 87,
    XML_CONTENT: 88,
    XML_ELEM: 89,
    XML_ATTR_VALUE: 90,
    XML_BINDING: 91,
    XML_CDATA: 92,
    XML_COMMENT: 93,
    XML_TEXT: 94,
    LINE_COMMENT: 95,
    TERMINATED_COMMENT: 96,
    STRING: 97,
    MINUS: 98,
    PLUS: 99,
    EXCLAMATION: 100,
    DIV: 101,
    STAR: 102,
    MOD: 103,
    EQ: 104,
    POUND: 105,
    DOT: 106,
    OPERATOR_CHAR: 107,
    OPERATOR: 108,
    SEMI: 109,
    COMMA: 110
});

(function(){
// public class variables
var EOF= -1,
    T__111= 111,
    T__112= 112,
    T__113= 113,
    T__114= 114,
    T__115= 115,
    T__116= 116,
    T__117= 117,
    T__118= 118,
    T__119= 119,
    T__120= 120,
    T__121= 121,
    BLOCK= 4,
    GROUP= 5,
    PAIR= 6,
    OBJECT_LITERAL= 7,
    ARRAY_LITERAL= 8,
    FOR_IN= 9,
    COMPREHENSION_BODY= 10,
    GUARD= 11,
    ARGUMENT_DECLARATION= 12,
    ARGUMENT_DEFINITION= 13,
    ARGUMENT_LIST= 14,
    LAMBDA= 15,
    METHOD_NAME= 16,
    QUALIFIED_ID= 17,
    ANNOTATIONS= 18,
    ANNOTATION= 19,
    PARTIAL_FUNCTION= 20,
    EXTRACTOR_PATTERN= 21,
    EQUALS_PATTERN= 22,
    NAME_PATTERN= 23,
    TYPED_PATTERN= 24,
    SELECT_PROPERTY= 25,
    BINDING= 26,
    BIND_PROPERTY= 27,
    BIND_EXPRESSION= 28,
    EXPR= 29,
    TYPE= 30,
    IMPORT= 31,
    PACKAGE= 32,
    CLASS= 33,
    OBJECT= 34,
    TRAIT= 35,
    EXTENDS= 36,
    WITH= 37,
    BASE= 38,
    SUPER= 39,
    CASE= 40,
    IF= 41,
    ELSE= 42,
    THROW= 43,
    TRY= 44,
    CATCH= 45,
    FINALLY= 46,
    PUBLIC= 47,
    PRIVATE= 48,
    PROTECTED= 49,
    OVERRIDE= 50,
    FINAL= 51,
    NATIVE= 52,
    DEF= 53,
    VAR= 54,
    VAL= 55,
    VARARGS= 56,
    FOR= 57,
    WHILE= 58,
    DO= 59,
    YIELD= 60,
    SELF= 61,
    THIS= 62,
    RETURN= 63,
    NEW= 64,
    DELETE= 65,
    NULL= 66,
    TRUE= 67,
    FALSE= 68,
    WILDCARD= 69,
    COLON= 70,
    ID_START= 71,
    ID_CHAR= 72,
    BAD_ID= 73,
    ID= 74,
    OBJECT_LITERAL_ID_= 75,
    WS= 76,
    OBJECT_LITERAL_ID= 77,
    INT= 78,
    HEX_DIGIT= 79,
    HEX_INT= 80,
    EXPONENT= 81,
    FLOAT= 82,
    UNICODE_ESC= 83,
    OCTAL_ESC= 84,
    ESC_SEQ= 85,
    XML_NAME= 86,
    XML_ATTR= 87,
    XML_CONTENT= 88,
    XML_ELEM= 89,
    XML_ATTR_VALUE= 90,
    XML_BINDING= 91,
    XML_CDATA= 92,
    XML_COMMENT= 93,
    XML_TEXT= 94,
    LINE_COMMENT= 95,
    TERMINATED_COMMENT= 96,
    STRING= 97,
    MINUS= 98,
    PLUS= 99,
    EXCLAMATION= 100,
    DIV= 101,
    STAR= 102,
    MOD= 103,
    EQ= 104,
    POUND= 105,
    DOT= 106,
    OPERATOR_CHAR= 107,
    OPERATOR= 108,
    SEMI= 109,
    COMMA= 110;

// public instance methods/vars
org.antlr.lang.extend(RescriptedParser, org.antlr.runtime.Parser, {
        
    setTreeAdaptor: function(adaptor) {
        this.adaptor = adaptor;
    },
    getTreeAdaptor: function() {
        return this.adaptor;
    },

    getTokenNames: function() { return RescriptedParser.tokenNames; },
    getGrammarFileName: function() { return "Rescripted.g"; }
});
org.antlr.lang.augmentObject(RescriptedParser.prototype, {

    // inline static return class
    delimiter_return: (function() {
        RescriptedParser.delimiter_return = function(){};
        org.antlr.lang.extend(RescriptedParser.delimiter_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:191:1: delimiter : ( ',' | ';' )? ;
    // $ANTLR start "delimiter"
    delimiter: function() {
        var retval = new RescriptedParser.delimiter_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set1 = null;

        var set1_tree=null;

        try {
            // Rescripted.g:191:10: ( ( ',' | ';' )? )
            // Rescripted.g:191:12: ( ',' | ';' )?
            root_0 = this.adaptor.nil();

            // Rescripted.g:191:12: ( ',' | ';' )?
            var alt1=2;
            var LA1_0 = this.input.LA(1);

            if ( ((LA1_0>=SEMI && LA1_0<=COMMA)) ) {
                alt1=1;
            }
            switch (alt1) {
                case 1 :
                    // Rescripted.g:
                    set1=this.input.LT(1);
                    if ( (this.input.LA(1)>=SEMI && this.input.LA(1)<=COMMA) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set1));
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }



                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    operator_return: (function() {
        RescriptedParser.operator_return = function(){};
        org.antlr.lang.extend(RescriptedParser.operator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:193:1: operator : ( EQ | EXCLAMATION | PLUS | MINUS | DIV | STAR | MOD | OPERATOR );
    // $ANTLR start "operator"
    operator: function() {
        var retval = new RescriptedParser.operator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set2 = null;

        var set2_tree=null;

        try {
            // Rescripted.g:193:9: ( EQ | EXCLAMATION | PLUS | MINUS | DIV | STAR | MOD | OPERATOR )
            // Rescripted.g:
            root_0 = this.adaptor.nil();

            set2=this.input.LT(1);
            if ( (this.input.LA(1)>=MINUS && this.input.LA(1)<=EQ)||this.input.LA(1)==OPERATOR ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set2));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    qualified_id_return: (function() {
        RescriptedParser.qualified_id_return = function(){};
        org.antlr.lang.extend(RescriptedParser.qualified_id_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:194:1: qualified_id : id+= ID ( ( '.' )=> '.' id+= ID )* -> ^( QUALIFIED_ID ( $id)+ ) ;
    // $ANTLR start "qualified_id"
    qualified_id: function() {
        var retval = new RescriptedParser.qualified_id_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal3 = null;
        var id = null;
        var list_id=null;

        var char_literal3_tree=null;
        var id_tree=null;
        var stream_DOT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DOT");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");

        try {
            // Rescripted.g:194:13: (id+= ID ( ( '.' )=> '.' id+= ID )* -> ^( QUALIFIED_ID ( $id)+ ) )
            // Rescripted.g:194:15: id+= ID ( ( '.' )=> '.' id+= ID )*
            id=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_qualified_id1666); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(id);

            if (org.antlr.lang.isNull(list_id)) list_id = [];
            list_id.push(id);

            // Rescripted.g:194:22: ( ( '.' )=> '.' id+= ID )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0==DOT) ) {
                    var LA2_2 = this.input.LA(2);

                    if ( (LA2_2==ID) && (this.synpred1_Rescripted())) {
                        alt2=1;
                    }


                }


                switch (alt2) {
                case 1 :
                    // Rescripted.g:194:23: ( '.' )=> '.' id+= ID
                    char_literal3=this.match(this.input,DOT,RescriptedParser.FOLLOW_DOT_in_qualified_id1675); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_DOT.add(char_literal3);

                    id=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_qualified_id1679); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(id);

                    if (org.antlr.lang.isNull(list_id)) list_id = [];
                    list_id.push(id);



                    break;

                default :
                    break loop2;
                }
            } while (true);



            // AST REWRITE
            // elements: id
            // token labels: 
            // rule labels: retval
            // token list labels: id
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_id=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token id", list_id);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 194:45: -> ^( QUALIFIED_ID ( $id)+ )
            {
                // Rescripted.g:194:48: ^( QUALIFIED_ID ( $id)+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(QUALIFIED_ID, "QUALIFIED_ID"), root_1);

                if ( !(stream_id.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_id.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_id.nextNode());

                }
                stream_id.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    type_name_return: (function() {
        RescriptedParser.type_name_return = function(){};
        org.antlr.lang.extend(RescriptedParser.type_name_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:196:1: type_name : qualified_id ( '[' (type_params+= type_name ( ',' | ';' )? )+ ']' )? ( '!' )? -> ^( TYPE qualified_id ( $type_params)* ( '!' )? ) ;
    // $ANTLR start "type_name"
    type_name: function() {
        var retval = new RescriptedParser.type_name_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal5 = null;
        var char_literal6 = null;
        var char_literal7 = null;
        var char_literal8 = null;
        var char_literal9 = null;
        var list_type_params=null;
         var qualified_id4 = null;
        var type_params = null;
        var char_literal5_tree=null;
        var char_literal6_tree=null;
        var char_literal7_tree=null;
        var char_literal8_tree=null;
        var char_literal9_tree=null;
        var stream_112=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 112");
        var stream_EXCLAMATION=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EXCLAMATION");
        var stream_111=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 111");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_SEMI=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SEMI");
        var stream_qualified_id=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule qualified_id");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        try {
            // Rescripted.g:196:10: ( qualified_id ( '[' (type_params+= type_name ( ',' | ';' )? )+ ']' )? ( '!' )? -> ^( TYPE qualified_id ( $type_params)* ( '!' )? ) )
            // Rescripted.g:197:2: qualified_id ( '[' (type_params+= type_name ( ',' | ';' )? )+ ']' )? ( '!' )?
            this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_type_name1699);
            qualified_id4=this.qualified_id();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_qualified_id.add(qualified_id4.getTree());
            // Rescripted.g:198:2: ( '[' (type_params+= type_name ( ',' | ';' )? )+ ']' )?
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( (LA5_0==111) ) {
                alt5=1;
            }
            switch (alt5) {
                case 1 :
                    // Rescripted.g:199:2: '[' (type_params+= type_name ( ',' | ';' )? )+ ']'
                    char_literal5=this.match(this.input,111,RescriptedParser.FOLLOW_111_in_type_name1705); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_111.add(char_literal5);

                    // Rescripted.g:200:3: (type_params+= type_name ( ',' | ';' )? )+
                    var cnt4=0;
                    loop4:
                    do {
                        var alt4=2;
                        var LA4_0 = this.input.LA(1);

                        if ( (LA4_0==ID) ) {
                            alt4=1;
                        }


                        switch (alt4) {
                        case 1 :
                            // Rescripted.g:200:4: type_params+= type_name ( ',' | ';' )?
                            this.pushFollow(RescriptedParser.FOLLOW_type_name_in_type_name1712);
                            type_params=this.type_name();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_type_name.add(type_params.getTree());
                            if (org.antlr.lang.isNull(list_type_params)) list_type_params = [];
                            list_type_params.push(type_params.getTree());

                            // Rescripted.g:200:27: ( ',' | ';' )?
                            var alt3=3;
                            var LA3_0 = this.input.LA(1);

                            if ( (LA3_0==COMMA) ) {
                                alt3=1;
                            }
                            else if ( (LA3_0==SEMI) ) {
                                alt3=2;
                            }
                            switch (alt3) {
                                case 1 :
                                    // Rescripted.g:200:28: ','
                                    char_literal6=this.match(this.input,COMMA,RescriptedParser.FOLLOW_COMMA_in_type_name1715); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal6);



                                    break;
                                case 2 :
                                    // Rescripted.g:200:32: ';'
                                    char_literal7=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_type_name1717); if (this.state.failed) return retval; 
                                    if ( this.state.backtracking===0 ) stream_SEMI.add(char_literal7);



                                    break;

                            }



                            break;

                        default :
                            if ( cnt4 >= 1 ) {
                                break loop4;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(4, this.input);
                                throw eee;
                        }
                        cnt4++;
                    } while (true);

                    char_literal8=this.match(this.input,112,RescriptedParser.FOLLOW_112_in_type_name1724); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_112.add(char_literal8);



                    break;

            }

            // Rescripted.g:203:2: ( '!' )?
            var alt6=2;
            var LA6_0 = this.input.LA(1);

            if ( (LA6_0==EXCLAMATION) ) {
                alt6=1;
            }
            switch (alt6) {
                case 1 :
                    // Rescripted.g:203:2: '!'
                    char_literal9=this.match(this.input,EXCLAMATION,RescriptedParser.FOLLOW_EXCLAMATION_in_type_name1731); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_EXCLAMATION.add(char_literal9);



                    break;

            }



            // AST REWRITE
            // elements: EXCLAMATION, type_params, qualified_id
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: type_params
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_type_params=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token type_params",list_type_params);
            root_0 = this.adaptor.nil();
            // 203:7: -> ^( TYPE qualified_id ( $type_params)* ( '!' )? )
            {
                // Rescripted.g:203:10: ^( TYPE qualified_id ( $type_params)* ( '!' )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(TYPE, "TYPE"), root_1);

                this.adaptor.addChild(root_1, stream_qualified_id.nextTree());
                // Rescripted.g:203:30: ( $type_params)*
                while ( stream_type_params.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_type_params.nextTree());

                }
                stream_type_params.reset();
                // Rescripted.g:203:44: ( '!' )?
                if ( stream_EXCLAMATION.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_EXCLAMATION.nextNode());

                }
                stream_EXCLAMATION.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    modifier_return: (function() {
        RescriptedParser.modifier_return = function(){};
        org.antlr.lang.extend(RescriptedParser.modifier_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:205:1: modifier : ( PUBLIC | PRIVATE | PROTECTED | OVERRIDE | FINAL | NATIVE );
    // $ANTLR start "modifier"
    modifier: function() {
        var retval = new RescriptedParser.modifier_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set10 = null;

        var set10_tree=null;

        try {
            // Rescripted.g:205:9: ( PUBLIC | PRIVATE | PROTECTED | OVERRIDE | FINAL | NATIVE )
            // Rescripted.g:
            root_0 = this.adaptor.nil();

            set10=this.input.LT(1);
            if ( (this.input.LA(1)>=PUBLIC && this.input.LA(1)<=NATIVE) ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set10));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    annotation_return: (function() {
        RescriptedParser.annotation_return = function(){};
        org.antlr.lang.extend(RescriptedParser.annotation_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:206:1: annotation : '@' qualified_id ( argument_list )? -> ^( ANNOTATION qualified_id ( argument_list )? ) ;
    // $ANTLR start "annotation"
    annotation: function() {
        var retval = new RescriptedParser.annotation_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal11 = null;
         var qualified_id12 = null;
         var argument_list13 = null;

        var char_literal11_tree=null;
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_argument_list=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule argument_list");
        var stream_qualified_id=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule qualified_id");
        try {
            // Rescripted.g:206:11: ( '@' qualified_id ( argument_list )? -> ^( ANNOTATION qualified_id ( argument_list )? ) )
            // Rescripted.g:206:13: '@' qualified_id ( argument_list )?
            char_literal11=this.match(this.input,113,RescriptedParser.FOLLOW_113_in_annotation1770); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_113.add(char_literal11);

            this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_annotation1772);
            qualified_id12=this.qualified_id();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_qualified_id.add(qualified_id12.getTree());
            // Rescripted.g:206:30: ( argument_list )?
            var alt7=2;
            var LA7_0 = this.input.LA(1);

            if ( (LA7_0==114) ) {
                alt7=1;
            }
            switch (alt7) {
                case 1 :
                    // Rescripted.g:206:30: argument_list
                    this.pushFollow(RescriptedParser.FOLLOW_argument_list_in_annotation1774);
                    argument_list13=this.argument_list();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_list.add(argument_list13.getTree());


                    break;

            }



            // AST REWRITE
            // elements: argument_list, qualified_id
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 206:45: -> ^( ANNOTATION qualified_id ( argument_list )? )
            {
                // Rescripted.g:206:48: ^( ANNOTATION qualified_id ( argument_list )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ANNOTATION, "ANNOTATION"), root_1);

                this.adaptor.addChild(root_1, stream_qualified_id.nextTree());
                // Rescripted.g:206:74: ( argument_list )?
                if ( stream_argument_list.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_argument_list.nextTree());

                }
                stream_argument_list.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    annotations_return: (function() {
        RescriptedParser.annotations_return = function(){};
        org.antlr.lang.extend(RescriptedParser.annotations_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:207:1: annotations : ( annotation )* ( modifier )* -> ^( ANNOTATIONS ( annotation )* ( modifier )* ) ;
    // $ANTLR start "annotations"
    annotations: function() {
        var retval = new RescriptedParser.annotations_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var annotation14 = null;
         var modifier15 = null;

        var stream_annotation=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule annotation");
        var stream_modifier=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule modifier");
        try {
            // Rescripted.g:207:12: ( ( annotation )* ( modifier )* -> ^( ANNOTATIONS ( annotation )* ( modifier )* ) )
            // Rescripted.g:207:14: ( annotation )* ( modifier )*
            // Rescripted.g:207:14: ( annotation )*
            loop8:
            do {
                var alt8=2;
                var LA8_0 = this.input.LA(1);

                if ( (LA8_0==113) ) {
                    alt8=1;
                }


                switch (alt8) {
                case 1 :
                    // Rescripted.g:207:14: annotation
                    this.pushFollow(RescriptedParser.FOLLOW_annotation_in_annotations1792);
                    annotation14=this.annotation();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_annotation.add(annotation14.getTree());


                    break;

                default :
                    break loop8;
                }
            } while (true);

            // Rescripted.g:207:26: ( modifier )*
            loop9:
            do {
                var alt9=2;
                var LA9_0 = this.input.LA(1);

                if ( ((LA9_0>=PUBLIC && LA9_0<=NATIVE)) ) {
                    alt9=1;
                }


                switch (alt9) {
                case 1 :
                    // Rescripted.g:207:26: modifier
                    this.pushFollow(RescriptedParser.FOLLOW_modifier_in_annotations1795);
                    modifier15=this.modifier();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_modifier.add(modifier15.getTree());


                    break;

                default :
                    break loop9;
                }
            } while (true);



            // AST REWRITE
            // elements: modifier, annotation
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 207:36: -> ^( ANNOTATIONS ( annotation )* ( modifier )* )
            {
                // Rescripted.g:207:39: ^( ANNOTATIONS ( annotation )* ( modifier )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ANNOTATIONS, "ANNOTATIONS"), root_1);

                // Rescripted.g:207:53: ( annotation )*
                while ( stream_annotation.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_annotation.nextTree());

                }
                stream_annotation.reset();
                // Rescripted.g:207:65: ( modifier )*
                while ( stream_modifier.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_modifier.nextTree());

                }
                stream_modifier.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    symbol_expr_return: (function() {
        RescriptedParser.symbol_expr_return = function(){};
        org.antlr.lang.extend(RescriptedParser.symbol_expr_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:209:1: symbol_expr : '#' ID ;
    // $ANTLR start "symbol_expr"
    symbol_expr: function() {
        var retval = new RescriptedParser.symbol_expr_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal16 = null;
        var ID17 = null;

        var char_literal16_tree=null;
        var ID17_tree=null;

        try {
            // Rescripted.g:209:12: ( '#' ID )
            // Rescripted.g:209:14: '#' ID
            root_0 = this.adaptor.nil();

            char_literal16=this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_symbol_expr1815); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            char_literal16_tree = this.adaptor.create(char_literal16);
            root_0 = this.adaptor.becomeRoot(char_literal16_tree, root_0);
            }
            ID17=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_symbol_expr1818); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            ID17_tree = this.adaptor.create(ID17);
            this.adaptor.addChild(root_0, ID17_tree);
            }



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    chainable_expression_return: (function() {
        RescriptedParser.chainable_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.chainable_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:211:1: chainable_expression : ( literal | throw_expression | for_comprehension | if_expression | ( '#' )=> symbol_expr | ( ( ID )? '=>' )=> lambda | ( lambda_argument_declaration '=>' )=> lambda | ( '{' ( ID delimiter )* '=>' )=> lambda | ( '{' CASE )=> partial_function | ( ID )=> ID | THIS | SELF | WILDCARD | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal | ( '{' '}' )=> object_literal | array_literal | ( '{' )=> block | ( '(' )=> group ) ;
    // $ANTLR start "chainable_expression"
    chainable_expression: function() {
        var retval = new RescriptedParser.chainable_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var ID27 = null;
        var THIS28 = null;
        var SELF29 = null;
        var WILDCARD30 = null;
         var literal18 = null;
         var throw_expression19 = null;
         var for_comprehension20 = null;
         var if_expression21 = null;
         var symbol_expr22 = null;
         var lambda23 = null;
         var lambda24 = null;
         var lambda25 = null;
         var partial_function26 = null;
         var object_literal31 = null;
         var object_literal32 = null;
         var array_literal33 = null;
         var block34 = null;
         var group35 = null;

        var ID27_tree=null;
        var THIS28_tree=null;
        var SELF29_tree=null;
        var WILDCARD30_tree=null;

        try {
            // Rescripted.g:211:21: ( ( literal | throw_expression | for_comprehension | if_expression | ( '#' )=> symbol_expr | ( ( ID )? '=>' )=> lambda | ( lambda_argument_declaration '=>' )=> lambda | ( '{' ( ID delimiter )* '=>' )=> lambda | ( '{' CASE )=> partial_function | ( ID )=> ID | THIS | SELF | WILDCARD | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal | ( '{' '}' )=> object_literal | array_literal | ( '{' )=> block | ( '(' )=> group ) )
            // Rescripted.g:212:2: ( literal | throw_expression | for_comprehension | if_expression | ( '#' )=> symbol_expr | ( ( ID )? '=>' )=> lambda | ( lambda_argument_declaration '=>' )=> lambda | ( '{' ( ID delimiter )* '=>' )=> lambda | ( '{' CASE )=> partial_function | ( ID )=> ID | THIS | SELF | WILDCARD | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal | ( '{' '}' )=> object_literal | array_literal | ( '{' )=> block | ( '(' )=> group )
            root_0 = this.adaptor.nil();

            // Rescripted.g:212:2: ( literal | throw_expression | for_comprehension | if_expression | ( '#' )=> symbol_expr | ( ( ID )? '=>' )=> lambda | ( lambda_argument_declaration '=>' )=> lambda | ( '{' ( ID delimiter )* '=>' )=> lambda | ( '{' CASE )=> partial_function | ( ID )=> ID | THIS | SELF | WILDCARD | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal | ( '{' '}' )=> object_literal | array_literal | ( '{' )=> block | ( '(' )=> group )
            var alt10=18;
            alt10 = this.dfa10.predict(this.input);
            switch (alt10) {
                case 1 :
                    // Rescripted.g:213:3: literal
                    this.pushFollow(RescriptedParser.FOLLOW_literal_in_chainable_expression1830);
                    literal18=this.literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, literal18.getTree());


                    break;
                case 2 :
                    // Rescripted.g:214:4: throw_expression
                    this.pushFollow(RescriptedParser.FOLLOW_throw_expression_in_chainable_expression1835);
                    throw_expression19=this.throw_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, throw_expression19.getTree());


                    break;
                case 3 :
                    // Rescripted.g:215:4: for_comprehension
                    this.pushFollow(RescriptedParser.FOLLOW_for_comprehension_in_chainable_expression1841);
                    for_comprehension20=this.for_comprehension();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, for_comprehension20.getTree());


                    break;
                case 4 :
                    // Rescripted.g:216:4: if_expression
                    this.pushFollow(RescriptedParser.FOLLOW_if_expression_in_chainable_expression1846);
                    if_expression21=this.if_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, if_expression21.getTree());


                    break;
                case 5 :
                    // Rescripted.g:217:4: ( '#' )=> symbol_expr
                    this.pushFollow(RescriptedParser.FOLLOW_symbol_expr_in_chainable_expression1857);
                    symbol_expr22=this.symbol_expr();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, symbol_expr22.getTree());


                    break;
                case 6 :
                    // Rescripted.g:218:4: ( ( ID )? '=>' )=> lambda
                    this.pushFollow(RescriptedParser.FOLLOW_lambda_in_chainable_expression1871);
                    lambda23=this.lambda();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda23.getTree());


                    break;
                case 7 :
                    // Rescripted.g:219:4: ( lambda_argument_declaration '=>' )=> lambda
                    this.pushFollow(RescriptedParser.FOLLOW_lambda_in_chainable_expression1884);
                    lambda24=this.lambda();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda24.getTree());


                    break;
                case 8 :
                    // Rescripted.g:220:4: ( '{' ( ID delimiter )* '=>' )=> lambda
                    this.pushFollow(RescriptedParser.FOLLOW_lambda_in_chainable_expression1905);
                    lambda25=this.lambda();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda25.getTree());


                    break;
                case 9 :
                    // Rescripted.g:221:4: ( '{' CASE )=> partial_function
                    this.pushFollow(RescriptedParser.FOLLOW_partial_function_in_chainable_expression1918);
                    partial_function26=this.partial_function();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, partial_function26.getTree());


                    break;
                case 10 :
                    // Rescripted.g:222:4: ( ID )=> ID
                    ID27=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_chainable_expression1929); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    ID27_tree = this.adaptor.create(ID27);
                    this.adaptor.addChild(root_0, ID27_tree);
                    }


                    break;
                case 11 :
                    // Rescripted.g:223:4: THIS
                    THIS28=this.match(this.input,THIS,RescriptedParser.FOLLOW_THIS_in_chainable_expression1934); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    THIS28_tree = this.adaptor.create(THIS28);
                    this.adaptor.addChild(root_0, THIS28_tree);
                    }


                    break;
                case 12 :
                    // Rescripted.g:224:4: SELF
                    SELF29=this.match(this.input,SELF,RescriptedParser.FOLLOW_SELF_in_chainable_expression1939); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    SELF29_tree = this.adaptor.create(SELF29);
                    this.adaptor.addChild(root_0, SELF29_tree);
                    }


                    break;
                case 13 :
                    // Rescripted.g:225:4: WILDCARD
                    WILDCARD30=this.match(this.input,WILDCARD,RescriptedParser.FOLLOW_WILDCARD_in_chainable_expression1944); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    WILDCARD30_tree = this.adaptor.create(WILDCARD30);
                    this.adaptor.addChild(root_0, WILDCARD30_tree);
                    }


                    break;
                case 14 :
                    // Rescripted.g:226:4: ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal
                    this.pushFollow(RescriptedParser.FOLLOW_object_literal_in_chainable_expression1969);
                    object_literal31=this.object_literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, object_literal31.getTree());


                    break;
                case 15 :
                    // Rescripted.g:227:4: ( '{' '}' )=> object_literal
                    this.pushFollow(RescriptedParser.FOLLOW_object_literal_in_chainable_expression1982);
                    object_literal32=this.object_literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, object_literal32.getTree());


                    break;
                case 16 :
                    // Rescripted.g:228:4: array_literal
                    this.pushFollow(RescriptedParser.FOLLOW_array_literal_in_chainable_expression1987);
                    array_literal33=this.array_literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, array_literal33.getTree());


                    break;
                case 17 :
                    // Rescripted.g:229:4: ( '{' )=> block
                    this.pushFollow(RescriptedParser.FOLLOW_block_in_chainable_expression1998);
                    block34=this.block();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, block34.getTree());


                    break;
                case 18 :
                    // Rescripted.g:230:4: ( '(' )=> group
                    this.pushFollow(RescriptedParser.FOLLOW_group_in_chainable_expression2009);
                    group35=this.group();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, group35.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_return: (function() {
        RescriptedParser.expr_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:233:1: expr : ( chainable_expression ( ( chained_expression )=>chain+= chained_expression )* ) -> ^( EXPR chainable_expression ( $chain)* ) ;
    // $ANTLR start "expr"
    expr: function() {
        var retval = new RescriptedParser.expr_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var list_chain=null;
         var chainable_expression36 = null;
        var chain = null;
        var stream_chainable_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule chainable_expression");
        var stream_chained_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule chained_expression");
        try {
            // Rescripted.g:233:5: ( ( chainable_expression ( ( chained_expression )=>chain+= chained_expression )* ) -> ^( EXPR chainable_expression ( $chain)* ) )
            // Rescripted.g:233:7: ( chainable_expression ( ( chained_expression )=>chain+= chained_expression )* )
            // Rescripted.g:233:7: ( chainable_expression ( ( chained_expression )=>chain+= chained_expression )* )
            // Rescripted.g:233:8: chainable_expression ( ( chained_expression )=>chain+= chained_expression )*
            this.pushFollow(RescriptedParser.FOLLOW_chainable_expression_in_expr2020);
            chainable_expression36=this.chainable_expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_chainable_expression.add(chainable_expression36.getTree());
            // Rescripted.g:233:29: ( ( chained_expression )=>chain+= chained_expression )*
            loop11:
            do {
                var alt11=2;
                alt11 = this.dfa11.predict(this.input);
                switch (alt11) {
                case 1 :
                    // Rescripted.g:233:30: ( chained_expression )=>chain+= chained_expression
                    this.pushFollow(RescriptedParser.FOLLOW_chained_expression_in_expr2031);
                    chain=this.chained_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_chained_expression.add(chain.getTree());
                    if (org.antlr.lang.isNull(list_chain)) list_chain = [];
                    list_chain.push(chain.getTree());



                    break;

                default :
                    break loop11;
                }
            } while (true);






            // AST REWRITE
            // elements: chainable_expression, chain
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: chain
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_chain=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token chain",list_chain);
            root_0 = this.adaptor.nil();
            // 233:83: -> ^( EXPR chainable_expression ( $chain)* )
            {
                // Rescripted.g:233:86: ^( EXPR chainable_expression ( $chain)* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_1);

                this.adaptor.addChild(root_1, stream_chainable_expression.nextTree());
                // Rescripted.g:233:114: ( $chain)*
                while ( stream_chain.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_chain.nextTree());

                }
                stream_chain.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    chained_expression_return: (function() {
        RescriptedParser.chained_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.chained_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:234:1: chained_expression : ( ( '.' ID )=> expr_chain_select_property | ( '#' )=> expr_chain_binding | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal | ( '{' CASE )=> expr_chain_partial_function | ( '{' ( ID )* '=>' )=> expr_chain_lambda_a | ( '{' )=> expr_chain_block | ( '(' ':' )=> expr_chain_named_spread | ( '(' )=> argument_list ) ;
    // $ANTLR start "chained_expression"
    chained_expression: function() {
        var retval = new RescriptedParser.chained_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expr_chain_select_property37 = null;
         var expr_chain_binding38 = null;
         var expr_chain_object_literal39 = null;
         var expr_chain_partial_function40 = null;
         var expr_chain_lambda_a41 = null;
         var expr_chain_block42 = null;
         var expr_chain_named_spread43 = null;
         var argument_list44 = null;


        try {
            // Rescripted.g:234:19: ( ( ( '.' ID )=> expr_chain_select_property | ( '#' )=> expr_chain_binding | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal | ( '{' CASE )=> expr_chain_partial_function | ( '{' ( ID )* '=>' )=> expr_chain_lambda_a | ( '{' )=> expr_chain_block | ( '(' ':' )=> expr_chain_named_spread | ( '(' )=> argument_list ) )
            // Rescripted.g:234:21: ( ( '.' ID )=> expr_chain_select_property | ( '#' )=> expr_chain_binding | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal | ( '{' CASE )=> expr_chain_partial_function | ( '{' ( ID )* '=>' )=> expr_chain_lambda_a | ( '{' )=> expr_chain_block | ( '(' ':' )=> expr_chain_named_spread | ( '(' )=> argument_list )
            root_0 = this.adaptor.nil();

            // Rescripted.g:234:21: ( ( '.' ID )=> expr_chain_select_property | ( '#' )=> expr_chain_binding | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal | ( '{' CASE )=> expr_chain_partial_function | ( '{' ( ID )* '=>' )=> expr_chain_lambda_a | ( '{' )=> expr_chain_block | ( '(' ':' )=> expr_chain_named_spread | ( '(' )=> argument_list )
            var alt12=8;
            alt12 = this.dfa12.predict(this.input);
            switch (alt12) {
                case 1 :
                    // Rescripted.g:235:4: ( '.' ID )=> expr_chain_select_property
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_select_property_in_chained_expression2065);
                    expr_chain_select_property37=this.expr_chain_select_property();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_select_property37.getTree());


                    break;
                case 2 :
                    // Rescripted.g:236:4: ( '#' )=> expr_chain_binding
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_binding_in_chained_expression2076);
                    expr_chain_binding38=this.expr_chain_binding();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_binding38.getTree());


                    break;
                case 3 :
                    // Rescripted.g:237:4: ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_object_literal_in_chained_expression2101);
                    expr_chain_object_literal39=this.expr_chain_object_literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_object_literal39.getTree());


                    break;
                case 4 :
                    // Rescripted.g:238:4: ( '{' CASE )=> expr_chain_partial_function
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_partial_function_in_chained_expression2114);
                    expr_chain_partial_function40=this.expr_chain_partial_function();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_partial_function40.getTree());


                    break;
                case 5 :
                    // Rescripted.g:239:4: ( '{' ( ID )* '=>' )=> expr_chain_lambda_a
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_lambda_a_in_chained_expression2130);
                    expr_chain_lambda_a41=this.expr_chain_lambda_a();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_lambda_a41.getTree());


                    break;
                case 6 :
                    // Rescripted.g:240:4: ( '{' )=> expr_chain_block
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_block_in_chained_expression2141);
                    expr_chain_block42=this.expr_chain_block();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_block42.getTree());


                    break;
                case 7 :
                    // Rescripted.g:241:4: ( '(' ':' )=> expr_chain_named_spread
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_named_spread_in_chained_expression2154);
                    expr_chain_named_spread43=this.expr_chain_named_spread();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_chain_named_spread43.getTree());


                    break;
                case 8 :
                    // Rescripted.g:242:4: ( '(' )=> argument_list
                    this.pushFollow(RescriptedParser.FOLLOW_argument_list_in_chained_expression2165);
                    argument_list44=this.argument_list();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, argument_list44.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_named_spread_return: (function() {
        RescriptedParser.expr_chain_named_spread_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_named_spread_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:246:1: expr_chain_named_spread : '(' ':' expression ')' -> ^( ':' expression ) ;
    // $ANTLR start "expr_chain_named_spread"
    expr_chain_named_spread: function() {
        var retval = new RescriptedParser.expr_chain_named_spread_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal45 = null;
        var char_literal46 = null;
        var char_literal48 = null;
         var expression47 = null;

        var char_literal45_tree=null;
        var char_literal46_tree=null;
        var char_literal48_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // Rescripted.g:246:24: ( '(' ':' expression ')' -> ^( ':' expression ) )
            // Rescripted.g:246:26: '(' ':' expression ')'
            char_literal45=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_expr_chain_named_spread2176); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal45);

            char_literal46=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_expr_chain_named_spread2178); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_COLON.add(char_literal46);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_expr_chain_named_spread2180);
            expression47=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression47.getTree());
            char_literal48=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_expr_chain_named_spread2182); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal48);



            // AST REWRITE
            // elements: expression, COLON
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 246:49: -> ^( ':' expression )
            {
                // Rescripted.g:246:52: ^( ':' expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_COLON.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_lambda_a_return: (function() {
        RescriptedParser.expr_chain_lambda_a_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_lambda_a_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:247:1: expr_chain_lambda_a : lambda_a -> ^( ARGUMENT_LIST lambda_a ) ;
    // $ANTLR start "expr_chain_lambda_a"
    expr_chain_lambda_a: function() {
        var retval = new RescriptedParser.expr_chain_lambda_a_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var lambda_a49 = null;

        var stream_lambda_a=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule lambda_a");
        try {
            // Rescripted.g:247:20: ( lambda_a -> ^( ARGUMENT_LIST lambda_a ) )
            // Rescripted.g:247:22: lambda_a
            this.pushFollow(RescriptedParser.FOLLOW_lambda_a_in_expr_chain_lambda_a2196);
            lambda_a49=this.lambda_a();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_lambda_a.add(lambda_a49.getTree());


            // AST REWRITE
            // elements: lambda_a
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 247:31: -> ^( ARGUMENT_LIST lambda_a )
            {
                // Rescripted.g:247:34: ^( ARGUMENT_LIST lambda_a )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_LIST, "ARGUMENT_LIST"), root_1);

                this.adaptor.addChild(root_1, stream_lambda_a.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_partial_function_return: (function() {
        RescriptedParser.expr_chain_partial_function_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_partial_function_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:248:1: expr_chain_partial_function : partial_function -> ^( ARGUMENT_LIST partial_function ) ;
    // $ANTLR start "expr_chain_partial_function"
    expr_chain_partial_function: function() {
        var retval = new RescriptedParser.expr_chain_partial_function_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var partial_function50 = null;

        var stream_partial_function=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule partial_function");
        try {
            // Rescripted.g:248:28: ( partial_function -> ^( ARGUMENT_LIST partial_function ) )
            // Rescripted.g:248:30: partial_function
            this.pushFollow(RescriptedParser.FOLLOW_partial_function_in_expr_chain_partial_function2210);
            partial_function50=this.partial_function();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_partial_function.add(partial_function50.getTree());


            // AST REWRITE
            // elements: partial_function
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 248:47: -> ^( ARGUMENT_LIST partial_function )
            {
                // Rescripted.g:248:50: ^( ARGUMENT_LIST partial_function )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_LIST, "ARGUMENT_LIST"), root_1);

                this.adaptor.addChild(root_1, stream_partial_function.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_object_literal_return: (function() {
        RescriptedParser.expr_chain_object_literal_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_object_literal_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:249:1: expr_chain_object_literal : object_literal ;
    // $ANTLR start "expr_chain_object_literal"
    expr_chain_object_literal: function() {
        var retval = new RescriptedParser.expr_chain_object_literal_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var object_literal51 = null;


        try {
            // Rescripted.g:249:26: ( object_literal )
            // Rescripted.g:249:28: object_literal
            root_0 = this.adaptor.nil();

            this.pushFollow(RescriptedParser.FOLLOW_object_literal_in_expr_chain_object_literal2224);
            object_literal51=this.object_literal();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, object_literal51.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_block_return: (function() {
        RescriptedParser.expr_chain_block_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_block_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:250:1: expr_chain_block : '{' ( statement )+ '}' -> ^( ARGUMENT_LIST ^( LAMBDA ( statement )+ ) ) ;
    // $ANTLR start "expr_chain_block"
    expr_chain_block: function() {
        var retval = new RescriptedParser.expr_chain_block_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal52 = null;
        var char_literal54 = null;
         var statement53 = null;

        var char_literal52_tree=null;
        var char_literal54_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        try {
            // Rescripted.g:250:17: ( '{' ( statement )+ '}' -> ^( ARGUMENT_LIST ^( LAMBDA ( statement )+ ) ) )
            // Rescripted.g:250:19: '{' ( statement )+ '}'
            char_literal52=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_expr_chain_block2230); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_116.add(char_literal52);

            // Rescripted.g:250:23: ( statement )+
            var cnt13=0;
            loop13:
            do {
                var alt13=2;
                var LA13_0 = this.input.LA(1);

                if ( (LA13_0==IF||(LA13_0>=THROW && LA13_0<=TRY)||(LA13_0>=PUBLIC && LA13_0<=NATIVE)||(LA13_0>=VAR && LA13_0<=VAL)||(LA13_0>=FOR && LA13_0<=DO)||(LA13_0>=SELF && LA13_0<=RETURN)||(LA13_0>=NULL && LA13_0<=WILDCARD)||LA13_0==ID||LA13_0==INT||LA13_0==HEX_INT||LA13_0==FLOAT||LA13_0==XML_ELEM||(LA13_0>=STRING && LA13_0<=EXCLAMATION)||LA13_0==POUND||LA13_0==111||(LA13_0>=113 && LA13_0<=114)||LA13_0==116||LA13_0==119) ) {
                    alt13=1;
                }


                switch (alt13) {
                case 1 :
                    // Rescripted.g:250:23: statement
                    this.pushFollow(RescriptedParser.FOLLOW_statement_in_expr_chain_block2232);
                    statement53=this.statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_statement.add(statement53.getTree());


                    break;

                default :
                    if ( cnt13 >= 1 ) {
                        break loop13;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(13, this.input);
                        throw eee;
                }
                cnt13++;
            } while (true);

            char_literal54=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_expr_chain_block2235); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_117.add(char_literal54);



            // AST REWRITE
            // elements: statement
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 250:38: -> ^( ARGUMENT_LIST ^( LAMBDA ( statement )+ ) )
            {
                // Rescripted.g:250:41: ^( ARGUMENT_LIST ^( LAMBDA ( statement )+ ) )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_LIST, "ARGUMENT_LIST"), root_1);

                // Rescripted.g:250:57: ^( LAMBDA ( statement )+ )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(LAMBDA, "LAMBDA"), root_2);

                if ( !(stream_statement.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_statement.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_statement.nextTree());

                }
                stream_statement.reset();

                this.adaptor.addChild(root_1, root_2);
                }

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_select_property_return: (function() {
        RescriptedParser.expr_chain_select_property_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_select_property_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:251:1: expr_chain_select_property : '.' ID -> ^( '.' ID ) ;
    // $ANTLR start "expr_chain_select_property"
    expr_chain_select_property: function() {
        var retval = new RescriptedParser.expr_chain_select_property_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal55 = null;
        var ID56 = null;

        var char_literal55_tree=null;
        var ID56_tree=null;
        var stream_DOT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DOT");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");

        try {
            // Rescripted.g:251:27: ( '.' ID -> ^( '.' ID ) )
            // Rescripted.g:251:29: '.' ID
            char_literal55=this.match(this.input,DOT,RescriptedParser.FOLLOW_DOT_in_expr_chain_select_property2254); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_DOT.add(char_literal55);

            ID56=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_expr_chain_select_property2256); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID56);



            // AST REWRITE
            // elements: ID, DOT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 251:36: -> ^( '.' ID )
            {
                // Rescripted.g:251:39: ^( '.' ID )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_DOT.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_ID.nextNode());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_binding_return: (function() {
        RescriptedParser.expr_chain_binding_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_binding_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:253:1: expr_chain_binding : ( ( '#' '#' )=>segments+= expr_chain_bind_empty | ( '#' ID )=>segments+= expr_chain_bind_property | ( '#' '(' )=>segments+= expr_chain_bind_expression )* -> ^( BINDING ( $segments)* ) ;
    // $ANTLR start "expr_chain_binding"
    expr_chain_binding: function() {
        var retval = new RescriptedParser.expr_chain_binding_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var list_segments=null;
        var segments = null;
        var stream_expr_chain_bind_property=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expr_chain_bind_property");
        var stream_expr_chain_bind_empty=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expr_chain_bind_empty");
        var stream_expr_chain_bind_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expr_chain_bind_expression");
        try {
            // Rescripted.g:253:19: ( ( ( '#' '#' )=>segments+= expr_chain_bind_empty | ( '#' ID )=>segments+= expr_chain_bind_property | ( '#' '(' )=>segments+= expr_chain_bind_expression )* -> ^( BINDING ( $segments)* ) )
            // Rescripted.g:253:21: ( ( '#' '#' )=>segments+= expr_chain_bind_empty | ( '#' ID )=>segments+= expr_chain_bind_property | ( '#' '(' )=>segments+= expr_chain_bind_expression )*
            // Rescripted.g:253:21: ( ( '#' '#' )=>segments+= expr_chain_bind_empty | ( '#' ID )=>segments+= expr_chain_bind_property | ( '#' '(' )=>segments+= expr_chain_bind_expression )*
            loop14:
            do {
                var alt14=4;
                var LA14_0 = this.input.LA(1);

                if ( (LA14_0==POUND) ) {
                    var LA14_2 = this.input.LA(2);

                    if ( (this.synpred21_Rescripted()) ) {
                        alt14=1;
                    }
                    else if ( (this.synpred22_Rescripted()) ) {
                        alt14=2;
                    }
                    else if ( (this.synpred23_Rescripted()) ) {
                        alt14=3;
                    }


                }


                switch (alt14) {
                case 1 :
                    // Rescripted.g:254:3: ( '#' '#' )=>segments+= expr_chain_bind_empty
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_bind_empty_in_expr_chain_binding2286);
                    segments=this.expr_chain_bind_empty();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expr_chain_bind_empty.add(segments.getTree());
                    if (org.antlr.lang.isNull(list_segments)) list_segments = [];
                    list_segments.push(segments.getTree());



                    break;
                case 2 :
                    // Rescripted.g:255:4: ( '#' ID )=>segments+= expr_chain_bind_property
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_bind_property_in_expr_chain_binding2301);
                    segments=this.expr_chain_bind_property();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expr_chain_bind_property.add(segments.getTree());
                    if (org.antlr.lang.isNull(list_segments)) list_segments = [];
                    list_segments.push(segments.getTree());



                    break;
                case 3 :
                    // Rescripted.g:256:4: ( '#' '(' )=>segments+= expr_chain_bind_expression
                    this.pushFollow(RescriptedParser.FOLLOW_expr_chain_bind_expression_in_expr_chain_binding2316);
                    segments=this.expr_chain_bind_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expr_chain_bind_expression.add(segments.getTree());
                    if (org.antlr.lang.isNull(list_segments)) list_segments = [];
                    list_segments.push(segments.getTree());



                    break;

                default :
                    break loop14;
                }
            } while (true);



            // AST REWRITE
            // elements: segments
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: segments
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_segments=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token segments",list_segments);
            root_0 = this.adaptor.nil();
            // 257:5: -> ^( BINDING ( $segments)* )
            {
                // Rescripted.g:257:8: ^( BINDING ( $segments)* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BINDING, "BINDING"), root_1);

                // Rescripted.g:257:18: ( $segments)*
                while ( stream_segments.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_segments.nextTree());

                }
                stream_segments.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_bind_empty_return: (function() {
        RescriptedParser.expr_chain_bind_empty_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_bind_empty_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:258:1: expr_chain_bind_empty : '#' ;
    // $ANTLR start "expr_chain_bind_empty"
    expr_chain_bind_empty: function() {
        var retval = new RescriptedParser.expr_chain_bind_empty_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal57 = null;

        var char_literal57_tree=null;

        try {
            // Rescripted.g:258:22: ( '#' )
            // Rescripted.g:258:24: '#'
            root_0 = this.adaptor.nil();

            char_literal57=this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_expr_chain_bind_empty2337); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            char_literal57_tree = this.adaptor.create(char_literal57);
            this.adaptor.addChild(root_0, char_literal57_tree);
            }



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_bind_property_return: (function() {
        RescriptedParser.expr_chain_bind_property_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_bind_property_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:259:1: expr_chain_bind_property : '#' ID -> ^( BIND_PROPERTY ID ) ;
    // $ANTLR start "expr_chain_bind_property"
    expr_chain_bind_property: function() {
        var retval = new RescriptedParser.expr_chain_bind_property_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal58 = null;
        var ID59 = null;

        var char_literal58_tree=null;
        var ID59_tree=null;
        var stream_POUND=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token POUND");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");

        try {
            // Rescripted.g:259:25: ( '#' ID -> ^( BIND_PROPERTY ID ) )
            // Rescripted.g:259:27: '#' ID
            char_literal58=this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_expr_chain_bind_property2343); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_POUND.add(char_literal58);

            ID59=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_expr_chain_bind_property2345); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID59);



            // AST REWRITE
            // elements: ID
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 259:34: -> ^( BIND_PROPERTY ID )
            {
                // Rescripted.g:259:37: ^( BIND_PROPERTY ID )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BIND_PROPERTY, "BIND_PROPERTY"), root_1);

                this.adaptor.addChild(root_1, stream_ID.nextNode());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_chain_bind_expression_return: (function() {
        RescriptedParser.expr_chain_bind_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_chain_bind_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:260:1: expr_chain_bind_expression : '#' '(' expression ')' -> ^( BIND_EXPRESSION expression ) ;
    // $ANTLR start "expr_chain_bind_expression"
    expr_chain_bind_expression: function() {
        var retval = new RescriptedParser.expr_chain_bind_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal60 = null;
        var char_literal61 = null;
        var char_literal63 = null;
         var expression62 = null;

        var char_literal60_tree=null;
        var char_literal61_tree=null;
        var char_literal63_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_POUND=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token POUND");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // Rescripted.g:260:27: ( '#' '(' expression ')' -> ^( BIND_EXPRESSION expression ) )
            // Rescripted.g:260:29: '#' '(' expression ')'
            char_literal60=this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_expr_chain_bind_expression2360); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_POUND.add(char_literal60);

            char_literal61=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_expr_chain_bind_expression2362); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal61);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_expr_chain_bind_expression2364);
            expression62=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression62.getTree());
            char_literal63=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_expr_chain_bind_expression2366); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal63);



            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 260:52: -> ^( BIND_EXPRESSION expression )
            {
                // Rescripted.g:260:55: ^( BIND_EXPRESSION expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BIND_EXPRESSION, "BIND_EXPRESSION"), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    literal_return: (function() {
        RescriptedParser.literal_return = function(){};
        org.antlr.lang.extend(RescriptedParser.literal_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:263:1: literal : ( XML_ELEM | STRING | INT | HEX_INT | FLOAT | TRUE | FALSE | NULL );
    // $ANTLR start "literal"
    literal: function() {
        var retval = new RescriptedParser.literal_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set64 = null;

        var set64_tree=null;

        try {
            // Rescripted.g:263:8: ( XML_ELEM | STRING | INT | HEX_INT | FLOAT | TRUE | FALSE | NULL )
            // Rescripted.g:
            root_0 = this.adaptor.nil();

            set64=this.input.LT(1);
            if ( (this.input.LA(1)>=NULL && this.input.LA(1)<=FALSE)||this.input.LA(1)==INT||this.input.LA(1)==HEX_INT||this.input.LA(1)==FLOAT||this.input.LA(1)==XML_ELEM||this.input.LA(1)==STRING ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, this.adaptor.create(set64));
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    operator_and_other_expressions_return: (function() {
        RescriptedParser.operator_and_other_expressions_return = function(){};
        org.antlr.lang.extend(RescriptedParser.operator_and_other_expressions_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:265:1: operator_and_other_expressions : expr_operator ;
    // $ANTLR start "operator_and_other_expressions"
    operator_and_other_expressions: function() {
        var retval = new RescriptedParser.operator_and_other_expressions_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expr_operator65 = null;


        try {
            // Rescripted.g:265:31: ( expr_operator )
            // Rescripted.g:265:33: expr_operator
            root_0 = this.adaptor.nil();

            this.pushFollow(RescriptedParser.FOLLOW_expr_operator_in_operator_and_other_expressions2417);
            expr_operator65=this.expr_operator();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_operator65.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_unary_return: (function() {
        RescriptedParser.expr_unary_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_unary_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:267:1: expr_unary : ( ( PLUS | MINUS | EXCLAMATION ) )? expr ;
    // $ANTLR start "expr_unary"
    expr_unary: function() {
        var retval = new RescriptedParser.expr_unary_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set66 = null;
         var expr67 = null;

        var set66_tree=null;

        try {
            // Rescripted.g:267:11: ( ( ( PLUS | MINUS | EXCLAMATION ) )? expr )
            // Rescripted.g:267:13: ( ( PLUS | MINUS | EXCLAMATION ) )? expr
            root_0 = this.adaptor.nil();

            // Rescripted.g:267:13: ( ( PLUS | MINUS | EXCLAMATION ) )?
            var alt15=2;
            var LA15_0 = this.input.LA(1);

            if ( ((LA15_0>=MINUS && LA15_0<=EXCLAMATION)) ) {
                alt15=1;
            }
            switch (alt15) {
                case 1 :
                    // Rescripted.g:267:14: ( PLUS | MINUS | EXCLAMATION )
                    set66=input.LT(1);
                    set66=this.input.LT(1);
                    if ( (this.input.LA(1)>=MINUS && this.input.LA(1)<=EXCLAMATION) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set66), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }



                    break;

            }

            this.pushFollow(RescriptedParser.FOLLOW_expr_in_expr_unary2440);
            expr67=this.expr();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr67.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_mult_return: (function() {
        RescriptedParser.expr_mult_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_mult_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:268:1: expr_mult : expr_unary ( ( '*' | '/' | '%' )=> ( '*' | '/' | '%' ) expr_unary )* ;
    // $ANTLR start "expr_mult"
    expr_mult: function() {
        var retval = new RescriptedParser.expr_mult_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set69 = null;
         var expr_unary68 = null;
         var expr_unary70 = null;

        var set69_tree=null;

        try {
            // Rescripted.g:268:10: ( expr_unary ( ( '*' | '/' | '%' )=> ( '*' | '/' | '%' ) expr_unary )* )
            // Rescripted.g:268:12: expr_unary ( ( '*' | '/' | '%' )=> ( '*' | '/' | '%' ) expr_unary )*
            root_0 = this.adaptor.nil();

            this.pushFollow(RescriptedParser.FOLLOW_expr_unary_in_expr_mult2446);
            expr_unary68=this.expr_unary();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_unary68.getTree());
            // Rescripted.g:268:23: ( ( '*' | '/' | '%' )=> ( '*' | '/' | '%' ) expr_unary )*
            loop16:
            do {
                var alt16=2;
                var LA16_0 = this.input.LA(1);

                if ( ((LA16_0>=DIV && LA16_0<=MOD)) ) {
                    var LA16_2 = this.input.LA(2);

                    if ( (this.synpred24_Rescripted()) ) {
                        alt16=1;
                    }


                }


                switch (alt16) {
                case 1 :
                    // Rescripted.g:268:25: ( '*' | '/' | '%' )=> ( '*' | '/' | '%' ) expr_unary
                    set69=input.LT(1);
                    set69=this.input.LT(1);
                    if ( (this.input.LA(1)>=DIV && this.input.LA(1)<=MOD) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set69), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(RescriptedParser.FOLLOW_expr_unary_in_expr_mult2469);
                    expr_unary70=this.expr_unary();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_unary70.getTree());


                    break;

                default :
                    break loop16;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_add_return: (function() {
        RescriptedParser.expr_add_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_add_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:269:1: expr_add : expr_mult ( ( '+' | '-' )=> ( '+' | '-' ) expr_mult )* ;
    // $ANTLR start "expr_add"
    expr_add: function() {
        var retval = new RescriptedParser.expr_add_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set72 = null;
         var expr_mult71 = null;
         var expr_mult73 = null;

        var set72_tree=null;

        try {
            // Rescripted.g:269:9: ( expr_mult ( ( '+' | '-' )=> ( '+' | '-' ) expr_mult )* )
            // Rescripted.g:269:11: expr_mult ( ( '+' | '-' )=> ( '+' | '-' ) expr_mult )*
            root_0 = this.adaptor.nil();

            this.pushFollow(RescriptedParser.FOLLOW_expr_mult_in_expr_add2478);
            expr_mult71=this.expr_mult();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_mult71.getTree());
            // Rescripted.g:269:21: ( ( '+' | '-' )=> ( '+' | '-' ) expr_mult )*
            loop17:
            do {
                var alt17=2;
                var LA17_0 = this.input.LA(1);

                if ( ((LA17_0>=MINUS && LA17_0<=PLUS)) ) {
                    var LA17_1 = this.input.LA(2);

                    if ( (this.synpred25_Rescripted()) ) {
                        alt17=1;
                    }


                }


                switch (alt17) {
                case 1 :
                    // Rescripted.g:269:23: ( '+' | '-' )=> ( '+' | '-' ) expr_mult
                    set72=input.LT(1);
                    set72=this.input.LT(1);
                    if ( (this.input.LA(1)>=MINUS && this.input.LA(1)<=PLUS) ) {
                        this.input.consume();
                        if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set72), root_0);
                        this.state.errorRecovery=false;this.state.failed=false;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        throw mse;
                    }

                    this.pushFollow(RescriptedParser.FOLLOW_expr_mult_in_expr_add2497);
                    expr_mult73=this.expr_mult();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_mult73.getTree());


                    break;

                default :
                    break loop17;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expr_operator_return: (function() {
        RescriptedParser.expr_operator_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expr_operator_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:270:1: expr_operator : expr_add ( ( operator )=> operator expr_add )* ;
    // $ANTLR start "expr_operator"
    expr_operator: function() {
        var retval = new RescriptedParser.expr_operator_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expr_add74 = null;
         var operator75 = null;
         var expr_add76 = null;


        try {
            // Rescripted.g:270:14: ( expr_add ( ( operator )=> operator expr_add )* )
            // Rescripted.g:270:16: expr_add ( ( operator )=> operator expr_add )*
            root_0 = this.adaptor.nil();

            this.pushFollow(RescriptedParser.FOLLOW_expr_add_in_expr_operator2506);
            expr_add74=this.expr_add();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_add74.getTree());
            // Rescripted.g:270:25: ( ( operator )=> operator expr_add )*
            loop18:
            do {
                var alt18=2;
                switch ( this.input.LA(1) ) {
                case MINUS:
                case PLUS:
                    var LA18_2 = this.input.LA(2);

                    if ( (this.synpred26_Rescripted()) ) {
                        alt18=1;
                    }


                    break;
                case DIV:
                case STAR:
                case MOD:
                    var LA18_3 = this.input.LA(2);

                    if ( (this.synpred26_Rescripted()) ) {
                        alt18=1;
                    }


                    break;
                case EXCLAMATION:
                    var LA18_4 = this.input.LA(2);

                    if ( (this.synpred26_Rescripted()) ) {
                        alt18=1;
                    }


                    break;
                case EQ:
                case OPERATOR:
                    var LA18_5 = this.input.LA(2);

                    if ( (this.synpred26_Rescripted()) ) {
                        alt18=1;
                    }


                    break;

                }

                switch (alt18) {
                case 1 :
                    // Rescripted.g:270:26: ( operator )=> operator expr_add
                    this.pushFollow(RescriptedParser.FOLLOW_operator_in_expr_operator2515);
                    operator75=this.operator();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(operator75.getTree(), root_0);
                    this.pushFollow(RescriptedParser.FOLLOW_expr_add_in_expr_operator2518);
                    expr_add76=this.expr_add();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expr_add76.getTree());


                    break;

                default :
                    break loop18;
                }
            } while (true);




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    expression_return: (function() {
        RescriptedParser.expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:273:1: expression : ( while_loop | do_while_loop | try_expression | operator_and_other_expressions ) ;
    // $ANTLR start "expression"
    expression: function() {
        var retval = new RescriptedParser.expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var while_loop77 = null;
         var do_while_loop78 = null;
         var try_expression79 = null;
         var operator_and_other_expressions80 = null;


        try {
            // Rescripted.g:273:11: ( ( while_loop | do_while_loop | try_expression | operator_and_other_expressions ) )
            // Rescripted.g:274:2: ( while_loop | do_while_loop | try_expression | operator_and_other_expressions )
            root_0 = this.adaptor.nil();

            // Rescripted.g:274:2: ( while_loop | do_while_loop | try_expression | operator_and_other_expressions )
            var alt19=4;
            switch ( this.input.LA(1) ) {
            case WHILE:
                alt19=1;
                break;
            case DO:
                alt19=2;
                break;
            case TRY:
                alt19=3;
                break;
            case IF:
            case THROW:
            case FOR:
            case SELF:
            case THIS:
            case NULL:
            case TRUE:
            case FALSE:
            case WILDCARD:
            case ID:
            case INT:
            case HEX_INT:
            case FLOAT:
            case XML_ELEM:
            case STRING:
            case MINUS:
            case PLUS:
            case EXCLAMATION:
            case POUND:
            case 111:
            case 114:
            case 116:
            case 119:
                alt19=4;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 19, 0, this.input);

                throw nvae;
            }

            switch (alt19) {
                case 1 :
                    // Rescripted.g:275:5: while_loop
                    this.pushFollow(RescriptedParser.FOLLOW_while_loop_in_expression2535);
                    while_loop77=this.while_loop();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, while_loop77.getTree());


                    break;
                case 2 :
                    // Rescripted.g:276:5: do_while_loop
                    this.pushFollow(RescriptedParser.FOLLOW_do_while_loop_in_expression2541);
                    do_while_loop78=this.do_while_loop();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, do_while_loop78.getTree());


                    break;
                case 3 :
                    // Rescripted.g:277:5: try_expression
                    this.pushFollow(RescriptedParser.FOLLOW_try_expression_in_expression2547);
                    try_expression79=this.try_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, try_expression79.getTree());


                    break;
                case 4 :
                    // Rescripted.g:278:5: operator_and_other_expressions
                    this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_expression2553);
                    operator_and_other_expressions80=this.operator_and_other_expressions();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, operator_and_other_expressions80.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    block_return: (function() {
        RescriptedParser.block_return = function(){};
        org.antlr.lang.extend(RescriptedParser.block_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:282:1: block : '{' (s+= statement )* '}' -> ^( BLOCK ( $s)+ ) ;
    // $ANTLR start "block"
    block: function() {
        var retval = new RescriptedParser.block_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal81 = null;
        var char_literal82 = null;
        var list_s=null;
        var s = null;
        var char_literal81_tree=null;
        var char_literal82_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        try {
            // Rescripted.g:282:6: ( '{' (s+= statement )* '}' -> ^( BLOCK ( $s)+ ) )
            // Rescripted.g:282:8: '{' (s+= statement )* '}'
            char_literal81=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_block2564); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_116.add(char_literal81);

            // Rescripted.g:282:12: (s+= statement )*
            loop20:
            do {
                var alt20=2;
                var LA20_0 = this.input.LA(1);

                if ( (LA20_0==IF||(LA20_0>=THROW && LA20_0<=TRY)||(LA20_0>=PUBLIC && LA20_0<=NATIVE)||(LA20_0>=VAR && LA20_0<=VAL)||(LA20_0>=FOR && LA20_0<=DO)||(LA20_0>=SELF && LA20_0<=RETURN)||(LA20_0>=NULL && LA20_0<=WILDCARD)||LA20_0==ID||LA20_0==INT||LA20_0==HEX_INT||LA20_0==FLOAT||LA20_0==XML_ELEM||(LA20_0>=STRING && LA20_0<=EXCLAMATION)||LA20_0==POUND||LA20_0==111||(LA20_0>=113 && LA20_0<=114)||LA20_0==116||LA20_0==119) ) {
                    alt20=1;
                }


                switch (alt20) {
                case 1 :
                    // Rescripted.g:282:13: s+= statement
                    this.pushFollow(RescriptedParser.FOLLOW_statement_in_block2569);
                    s=this.statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_statement.add(s.getTree());
                    if (org.antlr.lang.isNull(list_s)) list_s = [];
                    list_s.push(s.getTree());



                    break;

                default :
                    break loop20;
                }
            } while (true);

            char_literal82=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_block2573); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_117.add(char_literal82);



            // AST REWRITE
            // elements: s
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: s
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_s=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token s",list_s);
            root_0 = this.adaptor.nil();
            // 282:32: -> ^( BLOCK ( $s)+ )
            {
                // Rescripted.g:282:35: ^( BLOCK ( $s)+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(BLOCK, "BLOCK"), root_1);

                if ( !(stream_s.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_s.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_s.nextTree());

                }
                stream_s.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    group_return: (function() {
        RescriptedParser.group_return = function(){};
        org.antlr.lang.extend(RescriptedParser.group_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:283:1: group : '(' expression ')' -> ^( GROUP expression ) ;
    // $ANTLR start "group"
    group: function() {
        var retval = new RescriptedParser.group_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal83 = null;
        var char_literal85 = null;
         var expression84 = null;

        var char_literal83_tree=null;
        var char_literal85_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // Rescripted.g:283:6: ( '(' expression ')' -> ^( GROUP expression ) )
            // Rescripted.g:283:8: '(' expression ')'
            char_literal83=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_group2589); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal83);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_group2591);
            expression84=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression84.getTree());
            char_literal85=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_group2593); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal85);



            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 283:27: -> ^( GROUP expression )
            {
                // Rescripted.g:283:30: ^( GROUP expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(GROUP, "GROUP"), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    object_literal_return: (function() {
        RescriptedParser.object_literal_return = function(){};
        org.antlr.lang.extend(RescriptedParser.object_literal_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:285:1: object_literal : ( '(' ( object_literal_pair )+ ')' -> ^( OBJECT_LITERAL ( object_literal_pair )+ ) | '{' ( object_literal_pair )* '}' -> ^( OBJECT_LITERAL ( object_literal_pair )* ) );
    // $ANTLR start "object_literal"
    object_literal: function() {
        var retval = new RescriptedParser.object_literal_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal86 = null;
        var char_literal88 = null;
        var char_literal89 = null;
        var char_literal91 = null;
         var object_literal_pair87 = null;
         var object_literal_pair90 = null;

        var char_literal86_tree=null;
        var char_literal88_tree=null;
        var char_literal89_tree=null;
        var char_literal91_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_object_literal_pair=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule object_literal_pair");
        try {
            // Rescripted.g:285:15: ( '(' ( object_literal_pair )+ ')' -> ^( OBJECT_LITERAL ( object_literal_pair )+ ) | '{' ( object_literal_pair )* '}' -> ^( OBJECT_LITERAL ( object_literal_pair )* ) )
            var alt23=2;
            var LA23_0 = this.input.LA(1);

            if ( (LA23_0==114) ) {
                alt23=1;
            }
            else if ( (LA23_0==116) ) {
                alt23=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 23, 0, this.input);

                throw nvae;
            }
            switch (alt23) {
                case 1 :
                    // Rescripted.g:286:3: '(' ( object_literal_pair )+ ')'
                    char_literal86=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_object_literal2610); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_114.add(char_literal86);

                    // Rescripted.g:286:7: ( object_literal_pair )+
                    var cnt21=0;
                    loop21:
                    do {
                        var alt21=2;
                        var LA21_0 = this.input.LA(1);

                        if ( (LA21_0==ID||LA21_0==OBJECT_LITERAL_ID||LA21_0==STRING) ) {
                            alt21=1;
                        }


                        switch (alt21) {
                        case 1 :
                            // Rescripted.g:286:7: object_literal_pair
                            this.pushFollow(RescriptedParser.FOLLOW_object_literal_pair_in_object_literal2612);
                            object_literal_pair87=this.object_literal_pair();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_object_literal_pair.add(object_literal_pair87.getTree());


                            break;

                        default :
                            if ( cnt21 >= 1 ) {
                                break loop21;
                            }
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                                var eee = new org.antlr.runtime.EarlyExitException(21, this.input);
                                throw eee;
                        }
                        cnt21++;
                    } while (true);

                    char_literal88=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_object_literal2615); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_115.add(char_literal88);



                    // AST REWRITE
                    // elements: object_literal_pair
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 286:32: -> ^( OBJECT_LITERAL ( object_literal_pair )+ )
                    {
                        // Rescripted.g:286:35: ^( OBJECT_LITERAL ( object_literal_pair )+ )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(OBJECT_LITERAL, "OBJECT_LITERAL"), root_1);

                        if ( !(stream_object_literal_pair.hasNext()) ) {
                            throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                        }
                        while ( stream_object_literal_pair.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_object_literal_pair.nextTree());

                        }
                        stream_object_literal_pair.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // Rescripted.g:287:4: '{' ( object_literal_pair )* '}'
                    char_literal89=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_object_literal2629); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_116.add(char_literal89);

                    // Rescripted.g:287:8: ( object_literal_pair )*
                    loop22:
                    do {
                        var alt22=2;
                        var LA22_0 = this.input.LA(1);

                        if ( (LA22_0==ID||LA22_0==OBJECT_LITERAL_ID||LA22_0==STRING) ) {
                            alt22=1;
                        }


                        switch (alt22) {
                        case 1 :
                            // Rescripted.g:287:8: object_literal_pair
                            this.pushFollow(RescriptedParser.FOLLOW_object_literal_pair_in_object_literal2631);
                            object_literal_pair90=this.object_literal_pair();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_object_literal_pair.add(object_literal_pair90.getTree());


                            break;

                        default :
                            break loop22;
                        }
                    } while (true);

                    char_literal91=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_object_literal2634); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_117.add(char_literal91);



                    // AST REWRITE
                    // elements: object_literal_pair
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 287:33: -> ^( OBJECT_LITERAL ( object_literal_pair )* )
                    {
                        // Rescripted.g:287:36: ^( OBJECT_LITERAL ( object_literal_pair )* )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(OBJECT_LITERAL, "OBJECT_LITERAL"), root_1);

                        // Rescripted.g:287:53: ( object_literal_pair )*
                        while ( stream_object_literal_pair.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_object_literal_pair.nextTree());

                        }
                        stream_object_literal_pair.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    object_literal_pair_return: (function() {
        RescriptedParser.object_literal_pair_return = function(){};
        org.antlr.lang.extend(RescriptedParser.object_literal_pair_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:290:1: object_literal_pair : (key= ID | key= STRING | key= OBJECT_LITERAL_ID ) ':' expression delimiter -> ^( PAIR $key expression ) ;
    // $ANTLR start "object_literal_pair"
    object_literal_pair: function() {
        var retval = new RescriptedParser.object_literal_pair_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var key = null;
        var char_literal92 = null;
         var expression93 = null;
         var delimiter94 = null;

        var key_tree=null;
        var char_literal92_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_OBJECT_LITERAL_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token OBJECT_LITERAL_ID");
        var stream_STRING=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token STRING");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        try {
            // Rescripted.g:290:20: ( (key= ID | key= STRING | key= OBJECT_LITERAL_ID ) ':' expression delimiter -> ^( PAIR $key expression ) )
            // Rescripted.g:290:22: (key= ID | key= STRING | key= OBJECT_LITERAL_ID ) ':' expression delimiter
            // Rescripted.g:290:22: (key= ID | key= STRING | key= OBJECT_LITERAL_ID )
            var alt24=3;
            switch ( this.input.LA(1) ) {
            case ID:
                alt24=1;
                break;
            case STRING:
                alt24=2;
                break;
            case OBJECT_LITERAL_ID:
                alt24=3;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 24, 0, this.input);

                throw nvae;
            }

            switch (alt24) {
                case 1 :
                    // Rescripted.g:290:23: key= ID
                    key=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_object_literal_pair2656); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(key);



                    break;
                case 2 :
                    // Rescripted.g:290:30: key= STRING
                    key=this.match(this.input,STRING,RescriptedParser.FOLLOW_STRING_in_object_literal_pair2660); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_STRING.add(key);



                    break;
                case 3 :
                    // Rescripted.g:290:41: key= OBJECT_LITERAL_ID
                    key=this.match(this.input,OBJECT_LITERAL_ID,RescriptedParser.FOLLOW_OBJECT_LITERAL_ID_in_object_literal_pair2664); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_OBJECT_LITERAL_ID.add(key);



                    break;

            }

            char_literal92=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_object_literal_pair2667); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_COLON.add(char_literal92);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_object_literal_pair2669);
            expression93=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression93.getTree());
            this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_object_literal_pair2671);
            delimiter94=this.delimiter();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter94.getTree());


            // AST REWRITE
            // elements: key, expression
            // token labels: key
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_key=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token key",key);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 290:89: -> ^( PAIR $key expression )
            {
                // Rescripted.g:290:92: ^( PAIR $key expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(PAIR, "PAIR"), root_1);

                this.adaptor.addChild(root_1, stream_key.nextNode());
                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    array_literal_return: (function() {
        RescriptedParser.array_literal_return = function(){};
        org.antlr.lang.extend(RescriptedParser.array_literal_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:292:1: array_literal : '[' ( expression delimiter )* ']' -> ^( ARRAY_LITERAL ( expression )* ) ;
    // $ANTLR start "array_literal"
    array_literal: function() {
        var retval = new RescriptedParser.array_literal_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal95 = null;
        var char_literal98 = null;
         var expression96 = null;
         var delimiter97 = null;

        var char_literal95_tree=null;
        var char_literal98_tree=null;
        var stream_112=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 112");
        var stream_111=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 111");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        try {
            // Rescripted.g:292:14: ( '[' ( expression delimiter )* ']' -> ^( ARRAY_LITERAL ( expression )* ) )
            // Rescripted.g:292:16: '[' ( expression delimiter )* ']'
            char_literal95=this.match(this.input,111,RescriptedParser.FOLLOW_111_in_array_literal2689); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_111.add(char_literal95);

            // Rescripted.g:292:20: ( expression delimiter )*
            loop25:
            do {
                var alt25=2;
                var LA25_0 = this.input.LA(1);

                if ( (LA25_0==IF||(LA25_0>=THROW && LA25_0<=TRY)||(LA25_0>=FOR && LA25_0<=DO)||(LA25_0>=SELF && LA25_0<=THIS)||(LA25_0>=NULL && LA25_0<=WILDCARD)||LA25_0==ID||LA25_0==INT||LA25_0==HEX_INT||LA25_0==FLOAT||LA25_0==XML_ELEM||(LA25_0>=STRING && LA25_0<=EXCLAMATION)||LA25_0==POUND||LA25_0==111||LA25_0==114||LA25_0==116||LA25_0==119) ) {
                    alt25=1;
                }


                switch (alt25) {
                case 1 :
                    // Rescripted.g:292:21: expression delimiter
                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_array_literal2692);
                    expression96=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expression.add(expression96.getTree());
                    this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_array_literal2694);
                    delimiter97=this.delimiter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter97.getTree());


                    break;

                default :
                    break loop25;
                }
            } while (true);

            char_literal98=this.match(this.input,112,RescriptedParser.FOLLOW_112_in_array_literal2698); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_112.add(char_literal98);



            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 292:48: -> ^( ARRAY_LITERAL ( expression )* )
            {
                // Rescripted.g:292:51: ^( ARRAY_LITERAL ( expression )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARRAY_LITERAL, "ARRAY_LITERAL"), root_1);

                // Rescripted.g:292:67: ( expression )*
                while ( stream_expression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_expression.nextTree());

                }
                stream_expression.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    if_expression_return: (function() {
        RescriptedParser.if_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.if_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:295:1: if_expression : IF '(' operator_and_other_expressions ')' control_flow_statement ( ( ELSE )=> ( ELSE control_flow_statement ) )? -> ^( IF operator_and_other_expressions control_flow_statement ( control_flow_statement )? ) ;
    // $ANTLR start "if_expression"
    if_expression: function() {
        var retval = new RescriptedParser.if_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IF99 = null;
        var char_literal100 = null;
        var char_literal102 = null;
        var ELSE104 = null;
         var operator_and_other_expressions101 = null;
         var control_flow_statement103 = null;
         var control_flow_statement105 = null;

        var IF99_tree=null;
        var char_literal100_tree=null;
        var char_literal102_tree=null;
        var ELSE104_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_IF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IF");
        var stream_ELSE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ELSE");
        var stream_operator_and_other_expressions=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule operator_and_other_expressions");
        var stream_control_flow_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule control_flow_statement");
        try {
            // Rescripted.g:295:14: ( IF '(' operator_and_other_expressions ')' control_flow_statement ( ( ELSE )=> ( ELSE control_flow_statement ) )? -> ^( IF operator_and_other_expressions control_flow_statement ( control_flow_statement )? ) )
            // Rescripted.g:296:2: IF '(' operator_and_other_expressions ')' control_flow_statement ( ( ELSE )=> ( ELSE control_flow_statement ) )?
            IF99=this.match(this.input,IF,RescriptedParser.FOLLOW_IF_in_if_expression2717); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IF.add(IF99);

            char_literal100=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_if_expression2719); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal100);

            this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_if_expression2721);
            operator_and_other_expressions101=this.operator_and_other_expressions();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_operator_and_other_expressions.add(operator_and_other_expressions101.getTree());
            char_literal102=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_if_expression2723); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal102);

            this.pushFollow(RescriptedParser.FOLLOW_control_flow_statement_in_if_expression2725);
            control_flow_statement103=this.control_flow_statement();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_control_flow_statement.add(control_flow_statement103.getTree());
            // Rescripted.g:297:2: ( ( ELSE )=> ( ELSE control_flow_statement ) )?
            var alt26=2;
            var LA26_0 = this.input.LA(1);

            if ( (LA26_0==ELSE) ) {
                var LA26_1 = this.input.LA(2);

                if ( (this.synpred27_Rescripted()) ) {
                    alt26=1;
                }
            }
            switch (alt26) {
                case 1 :
                    // Rescripted.g:297:3: ( ELSE )=> ( ELSE control_flow_statement )
                    // Rescripted.g:297:13: ( ELSE control_flow_statement )
                    // Rescripted.g:297:14: ELSE control_flow_statement
                    ELSE104=this.match(this.input,ELSE,RescriptedParser.FOLLOW_ELSE_in_if_expression2736); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ELSE.add(ELSE104);

                    this.pushFollow(RescriptedParser.FOLLOW_control_flow_statement_in_if_expression2738);
                    control_flow_statement105=this.control_flow_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_control_flow_statement.add(control_flow_statement105.getTree());





                    break;

            }



            // AST REWRITE
            // elements: control_flow_statement, operator_and_other_expressions, control_flow_statement, IF
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 298:2: -> ^( IF operator_and_other_expressions control_flow_statement ( control_flow_statement )? )
            {
                // Rescripted.g:298:5: ^( IF operator_and_other_expressions control_flow_statement ( control_flow_statement )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_IF.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_operator_and_other_expressions.nextTree());
                this.adaptor.addChild(root_1, stream_control_flow_statement.nextTree());
                // Rescripted.g:298:64: ( control_flow_statement )?
                if ( stream_control_flow_statement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_control_flow_statement.nextTree());

                }
                stream_control_flow_statement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    try_expression_return: (function() {
        RescriptedParser.try_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.try_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:301:1: try_expression : ( TRY ( comprehension_body ( YIELD )? expression | control_flow_statement ) ( ( CATCH )=> catch_part )? ( ( FINALLY )=> finally_part )? ) ;
    // $ANTLR start "try_expression"
    try_expression: function() {
        var retval = new RescriptedParser.try_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var TRY106 = null;
        var YIELD108 = null;
         var comprehension_body107 = null;
         var expression109 = null;
         var control_flow_statement110 = null;
         var catch_part111 = null;
         var finally_part112 = null;

        var TRY106_tree=null;
        var YIELD108_tree=null;

        try {
            // Rescripted.g:301:15: ( ( TRY ( comprehension_body ( YIELD )? expression | control_flow_statement ) ( ( CATCH )=> catch_part )? ( ( FINALLY )=> finally_part )? ) )
            // Rescripted.g:302:2: ( TRY ( comprehension_body ( YIELD )? expression | control_flow_statement ) ( ( CATCH )=> catch_part )? ( ( FINALLY )=> finally_part )? )
            root_0 = this.adaptor.nil();

            // Rescripted.g:302:2: ( TRY ( comprehension_body ( YIELD )? expression | control_flow_statement ) ( ( CATCH )=> catch_part )? ( ( FINALLY )=> finally_part )? )
            // Rescripted.g:302:3: TRY ( comprehension_body ( YIELD )? expression | control_flow_statement ) ( ( CATCH )=> catch_part )? ( ( FINALLY )=> finally_part )?
            TRY106=this.match(this.input,TRY,RescriptedParser.FOLLOW_TRY_in_try_expression2765); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            TRY106_tree = this.adaptor.create(TRY106);
            root_0 = this.adaptor.becomeRoot(TRY106_tree, root_0);
            }
            // Rescripted.g:303:3: ( comprehension_body ( YIELD )? expression | control_flow_statement )
            var alt28=2;
            alt28 = this.dfa28.predict(this.input);
            switch (alt28) {
                case 1 :
                    // Rescripted.g:304:7: comprehension_body ( YIELD )? expression
                    this.pushFollow(RescriptedParser.FOLLOW_comprehension_body_in_try_expression2778);
                    comprehension_body107=this.comprehension_body();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, comprehension_body107.getTree());
                    // Rescripted.g:304:26: ( YIELD )?
                    var alt27=2;
                    var LA27_0 = this.input.LA(1);

                    if ( (LA27_0==YIELD) ) {
                        alt27=1;
                    }
                    switch (alt27) {
                        case 1 :
                            // Rescripted.g:304:26: YIELD
                            YIELD108=this.match(this.input,YIELD,RescriptedParser.FOLLOW_YIELD_in_try_expression2780); if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) {
                            YIELD108_tree = this.adaptor.create(YIELD108);
                            this.adaptor.addChild(root_0, YIELD108_tree);
                            }


                            break;

                    }

                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_try_expression2783);
                    expression109=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression109.getTree());


                    break;
                case 2 :
                    // Rescripted.g:305:7: control_flow_statement
                    this.pushFollow(RescriptedParser.FOLLOW_control_flow_statement_in_try_expression2791);
                    control_flow_statement110=this.control_flow_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, control_flow_statement110.getTree());


                    break;

            }

            // Rescripted.g:307:2: ( ( CATCH )=> catch_part )?
            var alt29=2;
            var LA29_0 = this.input.LA(1);

            if ( (LA29_0==CATCH) ) {
                var LA29_1 = this.input.LA(2);

                if ( (this.synpred28_Rescripted()) ) {
                    alt29=1;
                }
            }
            switch (alt29) {
                case 1 :
                    // Rescripted.g:307:3: ( CATCH )=> catch_part
                    this.pushFollow(RescriptedParser.FOLLOW_catch_part_in_try_expression2805);
                    catch_part111=this.catch_part();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, catch_part111.getTree());


                    break;

            }

            // Rescripted.g:308:2: ( ( FINALLY )=> finally_part )?
            var alt30=2;
            var LA30_0 = this.input.LA(1);

            if ( (LA30_0==FINALLY) ) {
                var LA30_1 = this.input.LA(2);

                if ( (this.synpred29_Rescripted()) ) {
                    alt30=1;
                }
            }
            switch (alt30) {
                case 1 :
                    // Rescripted.g:308:3: ( FINALLY )=> finally_part
                    this.pushFollow(RescriptedParser.FOLLOW_finally_part_in_try_expression2817);
                    finally_part112=this.finally_part();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, finally_part112.getTree());


                    break;

            }







            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    catch_part_return: (function() {
        RescriptedParser.catch_part_return = function(){};
        org.antlr.lang.extend(RescriptedParser.catch_part_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:310:1: catch_part : ( CATCH )=> CATCH operator_and_other_expressions ;
    // $ANTLR start "catch_part"
    catch_part: function() {
        var retval = new RescriptedParser.catch_part_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CATCH113 = null;
         var operator_and_other_expressions114 = null;

        var CATCH113_tree=null;

        try {
            // Rescripted.g:310:11: ( ( CATCH )=> CATCH operator_and_other_expressions )
            // Rescripted.g:310:13: ( CATCH )=> CATCH operator_and_other_expressions
            root_0 = this.adaptor.nil();

            CATCH113=this.match(this.input,CATCH,RescriptedParser.FOLLOW_CATCH_in_catch_part2834); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            CATCH113_tree = this.adaptor.create(CATCH113);
            root_0 = this.adaptor.becomeRoot(CATCH113_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_catch_part2837);
            operator_and_other_expressions114=this.operator_and_other_expressions();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, operator_and_other_expressions114.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    finally_part_return: (function() {
        RescriptedParser.finally_part_return = function(){};
        org.antlr.lang.extend(RescriptedParser.finally_part_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:311:1: finally_part : ( FINALLY )=> FINALLY operator_and_other_expressions ;
    // $ANTLR start "finally_part"
    finally_part: function() {
        var retval = new RescriptedParser.finally_part_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FINALLY115 = null;
         var operator_and_other_expressions116 = null;

        var FINALLY115_tree=null;

        try {
            // Rescripted.g:311:13: ( ( FINALLY )=> FINALLY operator_and_other_expressions )
            // Rescripted.g:311:15: ( FINALLY )=> FINALLY operator_and_other_expressions
            root_0 = this.adaptor.nil();

            FINALLY115=this.match(this.input,FINALLY,RescriptedParser.FOLLOW_FINALLY_in_finally_part2849); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            FINALLY115_tree = this.adaptor.create(FINALLY115);
            root_0 = this.adaptor.becomeRoot(FINALLY115_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_finally_part2852);
            operator_and_other_expressions116=this.operator_and_other_expressions();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, operator_and_other_expressions116.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    for_comprehension_return: (function() {
        RescriptedParser.for_comprehension_return = function(){};
        org.antlr.lang.extend(RescriptedParser.for_comprehension_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:314:1: for_comprehension : FOR comprehension_body ( YIELD )? control_flow_statement ;
    // $ANTLR start "for_comprehension"
    for_comprehension: function() {
        var retval = new RescriptedParser.for_comprehension_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var FOR117 = null;
        var YIELD119 = null;
         var comprehension_body118 = null;
         var control_flow_statement120 = null;

        var FOR117_tree=null;
        var YIELD119_tree=null;

        try {
            // Rescripted.g:314:18: ( FOR comprehension_body ( YIELD )? control_flow_statement )
            // Rescripted.g:314:20: FOR comprehension_body ( YIELD )? control_flow_statement
            root_0 = this.adaptor.nil();

            FOR117=this.match(this.input,FOR,RescriptedParser.FOLLOW_FOR_in_for_comprehension2860); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            FOR117_tree = this.adaptor.create(FOR117);
            root_0 = this.adaptor.becomeRoot(FOR117_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_comprehension_body_in_for_comprehension2863);
            comprehension_body118=this.comprehension_body();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, comprehension_body118.getTree());
            // Rescripted.g:314:44: ( YIELD )?
            var alt31=2;
            var LA31_0 = this.input.LA(1);

            if ( (LA31_0==YIELD) ) {
                alt31=1;
            }
            switch (alt31) {
                case 1 :
                    // Rescripted.g:314:44: YIELD
                    YIELD119=this.match(this.input,YIELD,RescriptedParser.FOLLOW_YIELD_in_for_comprehension2865); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    YIELD119_tree = this.adaptor.create(YIELD119);
                    this.adaptor.addChild(root_0, YIELD119_tree);
                    }


                    break;

            }

            this.pushFollow(RescriptedParser.FOLLOW_control_flow_statement_in_for_comprehension2868);
            control_flow_statement120=this.control_flow_statement();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, control_flow_statement120.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    comprehension_body_return: (function() {
        RescriptedParser.comprehension_body_return = function(){};
        org.antlr.lang.extend(RescriptedParser.comprehension_body_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:315:1: comprehension_body : '(' ( for_in_expression )+ ( comprehension_filter )* ')' -> ^( COMPREHENSION_BODY ( for_in_expression )+ ( comprehension_filter )* ) ;
    // $ANTLR start "comprehension_body"
    comprehension_body: function() {
        var retval = new RescriptedParser.comprehension_body_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal121 = null;
        var char_literal124 = null;
         var for_in_expression122 = null;
         var comprehension_filter123 = null;

        var char_literal121_tree=null;
        var char_literal124_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_comprehension_filter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule comprehension_filter");
        var stream_for_in_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule for_in_expression");
        try {
            // Rescripted.g:315:19: ( '(' ( for_in_expression )+ ( comprehension_filter )* ')' -> ^( COMPREHENSION_BODY ( for_in_expression )+ ( comprehension_filter )* ) )
            // Rescripted.g:315:21: '(' ( for_in_expression )+ ( comprehension_filter )* ')'
            char_literal121=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_comprehension_body2874); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal121);

            // Rescripted.g:315:25: ( for_in_expression )+
            var cnt32=0;
            loop32:
            do {
                var alt32=2;
                var LA32_0 = this.input.LA(1);

                if ( (LA32_0==ID) ) {
                    alt32=1;
                }


                switch (alt32) {
                case 1 :
                    // Rescripted.g:315:25: for_in_expression
                    this.pushFollow(RescriptedParser.FOLLOW_for_in_expression_in_comprehension_body2876);
                    for_in_expression122=this.for_in_expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_for_in_expression.add(for_in_expression122.getTree());


                    break;

                default :
                    if ( cnt32 >= 1 ) {
                        break loop32;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(32, this.input);
                        throw eee;
                }
                cnt32++;
            } while (true);

            // Rescripted.g:315:44: ( comprehension_filter )*
            loop33:
            do {
                var alt33=2;
                var LA33_0 = this.input.LA(1);

                if ( (LA33_0==IF) ) {
                    alt33=1;
                }


                switch (alt33) {
                case 1 :
                    // Rescripted.g:315:44: comprehension_filter
                    this.pushFollow(RescriptedParser.FOLLOW_comprehension_filter_in_comprehension_body2879);
                    comprehension_filter123=this.comprehension_filter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_comprehension_filter.add(comprehension_filter123.getTree());


                    break;

                default :
                    break loop33;
                }
            } while (true);

            char_literal124=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_comprehension_body2882); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal124);



            // AST REWRITE
            // elements: for_in_expression, comprehension_filter
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 315:70: -> ^( COMPREHENSION_BODY ( for_in_expression )+ ( comprehension_filter )* )
            {
                // Rescripted.g:315:73: ^( COMPREHENSION_BODY ( for_in_expression )+ ( comprehension_filter )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(COMPREHENSION_BODY, "COMPREHENSION_BODY"), root_1);

                if ( !(stream_for_in_expression.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_for_in_expression.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_for_in_expression.nextTree());

                }
                stream_for_in_expression.reset();
                // Rescripted.g:315:113: ( comprehension_filter )*
                while ( stream_comprehension_filter.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_comprehension_filter.nextTree());

                }
                stream_comprehension_filter.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    for_in_expression_return: (function() {
        RescriptedParser.for_in_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.for_in_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:316:1: for_in_expression : ID ( ',' ID )* '<-' expression delimiter -> ^( FOR_IN ( ID )* expression ) ;
    // $ANTLR start "for_in_expression"
    for_in_expression: function() {
        var retval = new RescriptedParser.for_in_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var ID125 = null;
        var char_literal126 = null;
        var ID127 = null;
        var string_literal128 = null;
         var expression129 = null;
         var delimiter130 = null;

        var ID125_tree=null;
        var char_literal126_tree=null;
        var ID127_tree=null;
        var string_literal128_tree=null;
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_118=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 118");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        try {
            // Rescripted.g:316:18: ( ID ( ',' ID )* '<-' expression delimiter -> ^( FOR_IN ( ID )* expression ) )
            // Rescripted.g:316:20: ID ( ',' ID )* '<-' expression delimiter
            ID125=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_for_in_expression2900); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID125);

            // Rescripted.g:316:23: ( ',' ID )*
            loop34:
            do {
                var alt34=2;
                var LA34_0 = this.input.LA(1);

                if ( (LA34_0==COMMA) ) {
                    alt34=1;
                }


                switch (alt34) {
                case 1 :
                    // Rescripted.g:316:24: ',' ID
                    char_literal126=this.match(this.input,COMMA,RescriptedParser.FOLLOW_COMMA_in_for_in_expression2903); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal126);

                    ID127=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_for_in_expression2905); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID127);



                    break;

                default :
                    break loop34;
                }
            } while (true);

            string_literal128=this.match(this.input,118,RescriptedParser.FOLLOW_118_in_for_in_expression2909); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_118.add(string_literal128);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_for_in_expression2911);
            expression129=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression129.getTree());
            this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_for_in_expression2913);
            delimiter130=this.delimiter();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter130.getTree());


            // AST REWRITE
            // elements: ID, expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 316:59: -> ^( FOR_IN ( ID )* expression )
            {
                // Rescripted.g:316:62: ^( FOR_IN ( ID )* expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(FOR_IN, "FOR_IN"), root_1);

                // Rescripted.g:316:71: ( ID )*
                while ( stream_ID.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_ID.nextNode());

                }
                stream_ID.reset();
                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    comprehension_filter_return: (function() {
        RescriptedParser.comprehension_filter_return = function(){};
        org.antlr.lang.extend(RescriptedParser.comprehension_filter_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:317:1: comprehension_filter : IF expression delimiter -> ^( GUARD expression ) ;
    // $ANTLR start "comprehension_filter"
    comprehension_filter: function() {
        var retval = new RescriptedParser.comprehension_filter_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IF131 = null;
         var expression132 = null;
         var delimiter133 = null;

        var IF131_tree=null;
        var stream_IF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IF");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        try {
            // Rescripted.g:317:21: ( IF expression delimiter -> ^( GUARD expression ) )
            // Rescripted.g:317:23: IF expression delimiter
            IF131=this.match(this.input,IF,RescriptedParser.FOLLOW_IF_in_comprehension_filter2930); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_IF.add(IF131);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_comprehension_filter2932);
            expression132=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression132.getTree());
            this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_comprehension_filter2934);
            delimiter133=this.delimiter();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter133.getTree());


            // AST REWRITE
            // elements: expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 317:47: -> ^( GUARD expression )
            {
                // Rescripted.g:317:50: ^( GUARD expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(GUARD, "GUARD"), root_1);

                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    while_loop_return: (function() {
        RescriptedParser.while_loop_return = function(){};
        org.antlr.lang.extend(RescriptedParser.while_loop_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:320:1: while_loop : WHILE '(' expression ')' expression ;
    // $ANTLR start "while_loop"
    while_loop: function() {
        var retval = new RescriptedParser.while_loop_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var WHILE134 = null;
        var char_literal135 = null;
        var char_literal137 = null;
         var expression136 = null;
         var expression138 = null;

        var WHILE134_tree=null;
        var char_literal135_tree=null;
        var char_literal137_tree=null;

        try {
            // Rescripted.g:320:11: ( WHILE '(' expression ')' expression )
            // Rescripted.g:320:13: WHILE '(' expression ')' expression
            root_0 = this.adaptor.nil();

            WHILE134=this.match(this.input,WHILE,RescriptedParser.FOLLOW_WHILE_in_while_loop2950); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            WHILE134_tree = this.adaptor.create(WHILE134);
            root_0 = this.adaptor.becomeRoot(WHILE134_tree, root_0);
            }
            char_literal135=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_while_loop2953); if (this.state.failed) return retval;
            this.pushFollow(RescriptedParser.FOLLOW_expression_in_while_loop2956);
            expression136=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression136.getTree());
            char_literal137=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_while_loop2958); if (this.state.failed) return retval;
            this.pushFollow(RescriptedParser.FOLLOW_expression_in_while_loop2961);
            expression138=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression138.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    do_while_loop_return: (function() {
        RescriptedParser.do_while_loop_return = function(){};
        org.antlr.lang.extend(RescriptedParser.do_while_loop_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:321:1: do_while_loop : DO expression WHILE '(' expression ')' ;
    // $ANTLR start "do_while_loop"
    do_while_loop: function() {
        var retval = new RescriptedParser.do_while_loop_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var DO139 = null;
        var WHILE141 = null;
        var char_literal142 = null;
        var char_literal144 = null;
         var expression140 = null;
         var expression143 = null;

        var DO139_tree=null;
        var WHILE141_tree=null;
        var char_literal142_tree=null;
        var char_literal144_tree=null;

        try {
            // Rescripted.g:321:14: ( DO expression WHILE '(' expression ')' )
            // Rescripted.g:321:16: DO expression WHILE '(' expression ')'
            root_0 = this.adaptor.nil();

            DO139=this.match(this.input,DO,RescriptedParser.FOLLOW_DO_in_do_while_loop2968); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            DO139_tree = this.adaptor.create(DO139);
            root_0 = this.adaptor.becomeRoot(DO139_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_expression_in_do_while_loop2971);
            expression140=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression140.getTree());
            WHILE141=this.match(this.input,WHILE,RescriptedParser.FOLLOW_WHILE_in_do_while_loop2973); if (this.state.failed) return retval;
            char_literal142=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_do_while_loop2976); if (this.state.failed) return retval;
            this.pushFollow(RescriptedParser.FOLLOW_expression_in_do_while_loop2979);
            expression143=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression143.getTree());
            char_literal144=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_do_while_loop2981); if (this.state.failed) return retval;



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    lambda_argument_declaration_return: (function() {
        RescriptedParser.lambda_argument_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.lambda_argument_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:324:1: lambda_argument_declaration : '(' ( ID delimiter )* ')' -> ^( ARGUMENT_DECLARATION ( ID )* ) ;
    // $ANTLR start "lambda_argument_declaration"
    lambda_argument_declaration: function() {
        var retval = new RescriptedParser.lambda_argument_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal145 = null;
        var ID146 = null;
        var char_literal148 = null;
         var delimiter147 = null;

        var char_literal145_tree=null;
        var ID146_tree=null;
        var char_literal148_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        try {
            // Rescripted.g:324:28: ( '(' ( ID delimiter )* ')' -> ^( ARGUMENT_DECLARATION ( ID )* ) )
            // Rescripted.g:324:30: '(' ( ID delimiter )* ')'
            char_literal145=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_lambda_argument_declaration2991); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal145);

            // Rescripted.g:324:34: ( ID delimiter )*
            loop35:
            do {
                var alt35=2;
                var LA35_0 = this.input.LA(1);

                if ( (LA35_0==ID) ) {
                    alt35=1;
                }


                switch (alt35) {
                case 1 :
                    // Rescripted.g:324:35: ID delimiter
                    ID146=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_lambda_argument_declaration2994); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID146);

                    this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_lambda_argument_declaration2996);
                    delimiter147=this.delimiter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter147.getTree());


                    break;

                default :
                    break loop35;
                }
            } while (true);

            char_literal148=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_lambda_argument_declaration3000); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal148);



            // AST REWRITE
            // elements: ID
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 324:54: -> ^( ARGUMENT_DECLARATION ( ID )* )
            {
                // Rescripted.g:324:57: ^( ARGUMENT_DECLARATION ( ID )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_DECLARATION, "ARGUMENT_DECLARATION"), root_1);

                // Rescripted.g:324:80: ( ID )*
                while ( stream_ID.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_ID.nextNode());

                }
                stream_ID.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    argument_declaration_return: (function() {
        RescriptedParser.argument_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.argument_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:325:1: argument_declaration : '(' (arguments+= argument_definition )* (wildcard= '...' arguments+= argument_definition )? ')' -> ^( ARGUMENT_DECLARATION ( $arguments)* ( $wildcard)? ) ;
    // $ANTLR start "argument_declaration"
    argument_declaration: function() {
        var retval = new RescriptedParser.argument_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var wildcard = null;
        var char_literal149 = null;
        var char_literal150 = null;
        var list_arguments=null;
        var arguments = null;
        var wildcard_tree=null;
        var char_literal149_tree=null;
        var char_literal150_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_VARARGS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token VARARGS");
        var stream_argument_definition=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule argument_definition");
        try {
            // Rescripted.g:325:21: ( '(' (arguments+= argument_definition )* (wildcard= '...' arguments+= argument_definition )? ')' -> ^( ARGUMENT_DECLARATION ( $arguments)* ( $wildcard)? ) )
            // Rescripted.g:325:23: '(' (arguments+= argument_definition )* (wildcard= '...' arguments+= argument_definition )? ')'
            char_literal149=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_argument_declaration3015); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal149);

            // Rescripted.g:325:27: (arguments+= argument_definition )*
            loop36:
            do {
                var alt36=2;
                var LA36_0 = this.input.LA(1);

                if ( (LA36_0==ID) ) {
                    alt36=1;
                }


                switch (alt36) {
                case 1 :
                    // Rescripted.g:325:28: arguments+= argument_definition
                    this.pushFollow(RescriptedParser.FOLLOW_argument_definition_in_argument_declaration3020);
                    arguments=this.argument_definition();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_definition.add(arguments.getTree());
                    if (org.antlr.lang.isNull(list_arguments)) list_arguments = [];
                    list_arguments.push(arguments.getTree());



                    break;

                default :
                    break loop36;
                }
            } while (true);

            // Rescripted.g:325:61: (wildcard= '...' arguments+= argument_definition )?
            var alt37=2;
            var LA37_0 = this.input.LA(1);

            if ( (LA37_0==VARARGS) ) {
                alt37=1;
            }
            switch (alt37) {
                case 1 :
                    // Rescripted.g:325:62: wildcard= '...' arguments+= argument_definition
                    wildcard=this.match(this.input,VARARGS,RescriptedParser.FOLLOW_VARARGS_in_argument_declaration3027); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_VARARGS.add(wildcard);

                    this.pushFollow(RescriptedParser.FOLLOW_argument_definition_in_argument_declaration3031);
                    arguments=this.argument_definition();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_definition.add(arguments.getTree());
                    if (org.antlr.lang.isNull(list_arguments)) list_arguments = [];
                    list_arguments.push(arguments.getTree());



                    break;

            }

            char_literal150=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_argument_declaration3035); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal150);



            // AST REWRITE
            // elements: arguments, wildcard
            // token labels: wildcard
            // rule labels: retval
            // token list labels: 
            // rule list labels: arguments
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_wildcard=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token wildcard",wildcard);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_arguments=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token arguments",list_arguments);
            root_0 = this.adaptor.nil();
            // 325:114: -> ^( ARGUMENT_DECLARATION ( $arguments)* ( $wildcard)? )
            {
                // Rescripted.g:325:117: ^( ARGUMENT_DECLARATION ( $arguments)* ( $wildcard)? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_DECLARATION, "ARGUMENT_DECLARATION"), root_1);

                // Rescripted.g:325:140: ( $arguments)*
                while ( stream_arguments.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_arguments.nextTree());

                }
                stream_arguments.reset();
                // Rescripted.g:325:152: ( $wildcard)?
                if ( stream_wildcard.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_wildcard.nextNode());

                }
                stream_wildcard.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    argument_definition_return: (function() {
        RescriptedParser.argument_definition_return = function(){};
        org.antlr.lang.extend(RescriptedParser.argument_definition_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:326:1: argument_definition : ID ( ':' type_name )? ( '=' operator_and_other_expressions )? ( ',' | ';' )? -> ^( ARGUMENT_DEFINITION ID ( type_name )? ( operator_and_other_expressions )? ) ;
    // $ANTLR start "argument_definition"
    argument_definition: function() {
        var retval = new RescriptedParser.argument_definition_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var ID151 = null;
        var char_literal152 = null;
        var char_literal154 = null;
        var char_literal156 = null;
        var char_literal157 = null;
         var type_name153 = null;
         var operator_and_other_expressions155 = null;

        var ID151_tree=null;
        var char_literal152_tree=null;
        var char_literal154_tree=null;
        var char_literal156_tree=null;
        var char_literal157_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_EQ=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EQ");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_COMMA=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COMMA");
        var stream_SEMI=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token SEMI");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        var stream_operator_and_other_expressions=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule operator_and_other_expressions");
        try {
            // Rescripted.g:326:20: ( ID ( ':' type_name )? ( '=' operator_and_other_expressions )? ( ',' | ';' )? -> ^( ARGUMENT_DEFINITION ID ( type_name )? ( operator_and_other_expressions )? ) )
            // Rescripted.g:326:22: ID ( ':' type_name )? ( '=' operator_and_other_expressions )? ( ',' | ';' )?
            ID151=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_argument_definition3055); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID151);

            // Rescripted.g:326:25: ( ':' type_name )?
            var alt38=2;
            var LA38_0 = this.input.LA(1);

            if ( (LA38_0==COLON) ) {
                alt38=1;
            }
            switch (alt38) {
                case 1 :
                    // Rescripted.g:326:26: ':' type_name
                    char_literal152=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_argument_definition3058); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(char_literal152);

                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_argument_definition3060);
                    type_name153=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_type_name.add(type_name153.getTree());


                    break;

            }

            // Rescripted.g:326:42: ( '=' operator_and_other_expressions )?
            var alt39=2;
            var LA39_0 = this.input.LA(1);

            if ( (LA39_0==EQ) ) {
                alt39=1;
            }
            switch (alt39) {
                case 1 :
                    // Rescripted.g:326:43: '=' operator_and_other_expressions
                    char_literal154=this.match(this.input,EQ,RescriptedParser.FOLLOW_EQ_in_argument_definition3065); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_EQ.add(char_literal154);

                    this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_argument_definition3067);
                    operator_and_other_expressions155=this.operator_and_other_expressions();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_operator_and_other_expressions.add(operator_and_other_expressions155.getTree());


                    break;

            }

            // Rescripted.g:326:80: ( ',' | ';' )?
            var alt40=3;
            var LA40_0 = this.input.LA(1);

            if ( (LA40_0==COMMA) ) {
                alt40=1;
            }
            else if ( (LA40_0==SEMI) ) {
                alt40=2;
            }
            switch (alt40) {
                case 1 :
                    // Rescripted.g:326:81: ','
                    char_literal156=this.match(this.input,COMMA,RescriptedParser.FOLLOW_COMMA_in_argument_definition3072); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COMMA.add(char_literal156);



                    break;
                case 2 :
                    // Rescripted.g:326:85: ';'
                    char_literal157=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_argument_definition3074); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_SEMI.add(char_literal157);



                    break;

            }



            // AST REWRITE
            // elements: ID, type_name, operator_and_other_expressions
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 326:91: -> ^( ARGUMENT_DEFINITION ID ( type_name )? ( operator_and_other_expressions )? )
            {
                // Rescripted.g:326:94: ^( ARGUMENT_DEFINITION ID ( type_name )? ( operator_and_other_expressions )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_DEFINITION, "ARGUMENT_DEFINITION"), root_1);

                this.adaptor.addChild(root_1, stream_ID.nextNode());
                // Rescripted.g:326:119: ( type_name )?
                if ( stream_type_name.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_type_name.nextTree());

                }
                stream_type_name.reset();
                // Rescripted.g:326:130: ( operator_and_other_expressions )?
                if ( stream_operator_and_other_expressions.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_operator_and_other_expressions.nextTree());

                }
                stream_operator_and_other_expressions.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    argument_list_return: (function() {
        RescriptedParser.argument_list_return = function(){};
        org.antlr.lang.extend(RescriptedParser.argument_list_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:328:1: argument_list : '(' (args+= operator_and_other_expressions delimiter )* (wildcard= '...' args+= operator_and_other_expressions delimiter )? ')' -> ^( ARGUMENT_LIST ( $args)* ( $wildcard)? ) ;
    // $ANTLR start "argument_list"
    argument_list: function() {
        var retval = new RescriptedParser.argument_list_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var wildcard = null;
        var char_literal158 = null;
        var char_literal161 = null;
        var list_args=null;
         var delimiter159 = null;
         var delimiter160 = null;
        var args = null;
        var wildcard_tree=null;
        var char_literal158_tree=null;
        var char_literal161_tree=null;
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_VARARGS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token VARARGS");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        var stream_operator_and_other_expressions=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule operator_and_other_expressions");
        try {
            // Rescripted.g:328:14: ( '(' (args+= operator_and_other_expressions delimiter )* (wildcard= '...' args+= operator_and_other_expressions delimiter )? ')' -> ^( ARGUMENT_LIST ( $args)* ( $wildcard)? ) )
            // Rescripted.g:328:17: '(' (args+= operator_and_other_expressions delimiter )* (wildcard= '...' args+= operator_and_other_expressions delimiter )? ')'
            char_literal158=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_argument_list3098); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_114.add(char_literal158);

            // Rescripted.g:328:21: (args+= operator_and_other_expressions delimiter )*
            loop41:
            do {
                var alt41=2;
                var LA41_0 = this.input.LA(1);

                if ( (LA41_0==IF||LA41_0==THROW||LA41_0==FOR||(LA41_0>=SELF && LA41_0<=THIS)||(LA41_0>=NULL && LA41_0<=WILDCARD)||LA41_0==ID||LA41_0==INT||LA41_0==HEX_INT||LA41_0==FLOAT||LA41_0==XML_ELEM||(LA41_0>=STRING && LA41_0<=EXCLAMATION)||LA41_0==POUND||LA41_0==111||LA41_0==114||LA41_0==116||LA41_0==119) ) {
                    alt41=1;
                }


                switch (alt41) {
                case 1 :
                    // Rescripted.g:328:22: args+= operator_and_other_expressions delimiter
                    this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_argument_list3103);
                    args=this.operator_and_other_expressions();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_operator_and_other_expressions.add(args.getTree());
                    if (org.antlr.lang.isNull(list_args)) list_args = [];
                    list_args.push(args.getTree());

                    this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_argument_list3105);
                    delimiter159=this.delimiter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter159.getTree());


                    break;

                default :
                    break loop41;
                }
            } while (true);

            // Rescripted.g:328:71: (wildcard= '...' args+= operator_and_other_expressions delimiter )?
            var alt42=2;
            var LA42_0 = this.input.LA(1);

            if ( (LA42_0==VARARGS) ) {
                alt42=1;
            }
            switch (alt42) {
                case 1 :
                    // Rescripted.g:328:72: wildcard= '...' args+= operator_and_other_expressions delimiter
                    wildcard=this.match(this.input,VARARGS,RescriptedParser.FOLLOW_VARARGS_in_argument_list3112); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_VARARGS.add(wildcard);

                    this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_argument_list3116);
                    args=this.operator_and_other_expressions();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_operator_and_other_expressions.add(args.getTree());
                    if (org.antlr.lang.isNull(list_args)) list_args = [];
                    list_args.push(args.getTree());

                    this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_argument_list3118);
                    delimiter160=this.delimiter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter160.getTree());


                    break;

            }

            char_literal161=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_argument_list3122); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_115.add(char_literal161);



            // AST REWRITE
            // elements: wildcard, args
            // token labels: wildcard
            // rule labels: retval
            // token list labels: 
            // rule list labels: args
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_wildcard=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token wildcard",wildcard);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_args=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token args",list_args);
            root_0 = this.adaptor.nil();
            // 328:141: -> ^( ARGUMENT_LIST ( $args)* ( $wildcard)? )
            {
                // Rescripted.g:328:144: ^( ARGUMENT_LIST ( $args)* ( $wildcard)? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_LIST, "ARGUMENT_LIST"), root_1);

                // Rescripted.g:328:160: ( $args)*
                while ( stream_args.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_args.nextTree());

                }
                stream_args.reset();
                // Rescripted.g:328:167: ( $wildcard)?
                if ( stream_wildcard.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_wildcard.nextNode());

                }
                stream_wildcard.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    lambda_a_return: (function() {
        RescriptedParser.lambda_a_return = function(){};
        org.antlr.lang.extend(RescriptedParser.lambda_a_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:331:1: lambda_a : '{' ( ID delimiter )* '=>' ( statement )* '}' -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )* ) ( statement )* ) ;
    // $ANTLR start "lambda_a"
    lambda_a: function() {
        var retval = new RescriptedParser.lambda_a_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal162 = null;
        var ID163 = null;
        var string_literal165 = null;
        var char_literal167 = null;
         var delimiter164 = null;
         var statement166 = null;

        var char_literal162_tree=null;
        var ID163_tree=null;
        var string_literal165_tree=null;
        var char_literal167_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_119=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 119");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        try {
            // Rescripted.g:331:9: ( '{' ( ID delimiter )* '=>' ( statement )* '}' -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )* ) ( statement )* ) )
            // Rescripted.g:331:11: '{' ( ID delimiter )* '=>' ( statement )* '}'
            char_literal162=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_lambda_a3145); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_116.add(char_literal162);

            // Rescripted.g:331:15: ( ID delimiter )*
            loop43:
            do {
                var alt43=2;
                var LA43_0 = this.input.LA(1);

                if ( (LA43_0==ID) ) {
                    alt43=1;
                }


                switch (alt43) {
                case 1 :
                    // Rescripted.g:331:16: ID delimiter
                    ID163=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_lambda_a3148); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID163);

                    this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_lambda_a3150);
                    delimiter164=this.delimiter();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter164.getTree());


                    break;

                default :
                    break loop43;
                }
            } while (true);

            string_literal165=this.match(this.input,119,RescriptedParser.FOLLOW_119_in_lambda_a3154); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_119.add(string_literal165);

            // Rescripted.g:331:36: ( statement )*
            loop44:
            do {
                var alt44=2;
                var LA44_0 = this.input.LA(1);

                if ( (LA44_0==IF||(LA44_0>=THROW && LA44_0<=TRY)||(LA44_0>=PUBLIC && LA44_0<=NATIVE)||(LA44_0>=VAR && LA44_0<=VAL)||(LA44_0>=FOR && LA44_0<=DO)||(LA44_0>=SELF && LA44_0<=RETURN)||(LA44_0>=NULL && LA44_0<=WILDCARD)||LA44_0==ID||LA44_0==INT||LA44_0==HEX_INT||LA44_0==FLOAT||LA44_0==XML_ELEM||(LA44_0>=STRING && LA44_0<=EXCLAMATION)||LA44_0==POUND||LA44_0==111||(LA44_0>=113 && LA44_0<=114)||LA44_0==116||LA44_0==119) ) {
                    alt44=1;
                }


                switch (alt44) {
                case 1 :
                    // Rescripted.g:331:36: statement
                    this.pushFollow(RescriptedParser.FOLLOW_statement_in_lambda_a3156);
                    statement166=this.statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_statement.add(statement166.getTree());


                    break;

                default :
                    break loop44;
                }
            } while (true);

            char_literal167=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_lambda_a3159); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_117.add(char_literal167);



            // AST REWRITE
            // elements: statement, ID
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 331:51: -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )* ) ( statement )* )
            {
                // Rescripted.g:331:54: ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )* ) ( statement )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LAMBDA, "LAMBDA"), root_1);

                // Rescripted.g:331:63: ^( ARGUMENT_DECLARATION ( ID )* )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_DECLARATION, "ARGUMENT_DECLARATION"), root_2);

                // Rescripted.g:331:86: ( ID )*
                while ( stream_ID.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_ID.nextNode());

                }
                stream_ID.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                // Rescripted.g:331:91: ( statement )*
                while ( stream_statement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_statement.nextTree());

                }
                stream_statement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    lambda_b_return: (function() {
        RescriptedParser.lambda_b_return = function(){};
        org.antlr.lang.extend(RescriptedParser.lambda_b_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:332:1: lambda_b : ( ID )? '=>' expression -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )? ) expression ) ;
    // $ANTLR start "lambda_b"
    lambda_b: function() {
        var retval = new RescriptedParser.lambda_b_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var ID168 = null;
        var string_literal169 = null;
         var expression170 = null;

        var ID168_tree=null;
        var string_literal169_tree=null;
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_119=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 119");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        try {
            // Rescripted.g:332:9: ( ( ID )? '=>' expression -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )? ) expression ) )
            // Rescripted.g:332:11: ( ID )? '=>' expression
            // Rescripted.g:332:11: ( ID )?
            var alt45=2;
            var LA45_0 = this.input.LA(1);

            if ( (LA45_0==ID) ) {
                alt45=1;
            }
            switch (alt45) {
                case 1 :
                    // Rescripted.g:332:11: ID
                    ID168=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_lambda_b3181); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID168);



                    break;

            }

            string_literal169=this.match(this.input,119,RescriptedParser.FOLLOW_119_in_lambda_b3184); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_119.add(string_literal169);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_lambda_b3186);
            expression170=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression170.getTree());


            // AST REWRITE
            // elements: expression, ID
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 332:31: -> ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )? ) expression )
            {
                // Rescripted.g:332:34: ^( LAMBDA ^( ARGUMENT_DECLARATION ( ID )? ) expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LAMBDA, "LAMBDA"), root_1);

                // Rescripted.g:332:43: ^( ARGUMENT_DECLARATION ( ID )? )
                {
                var root_2 = this.adaptor.nil();
                root_2 = this.adaptor.becomeRoot(this.adaptor.create(ARGUMENT_DECLARATION, "ARGUMENT_DECLARATION"), root_2);

                // Rescripted.g:332:66: ( ID )?
                if ( stream_ID.hasNext() ) {
                    this.adaptor.addChild(root_2, stream_ID.nextNode());

                }
                stream_ID.reset();

                this.adaptor.addChild(root_1, root_2);
                }
                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    lambda_c_return: (function() {
        RescriptedParser.lambda_c_return = function(){};
        org.antlr.lang.extend(RescriptedParser.lambda_c_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:333:1: lambda_c : lambda_argument_declaration '=>' expression -> ^( LAMBDA lambda_argument_declaration expression ) ;
    // $ANTLR start "lambda_c"
    lambda_c: function() {
        var retval = new RescriptedParser.lambda_c_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var string_literal172 = null;
         var lambda_argument_declaration171 = null;
         var expression173 = null;

        var string_literal172_tree=null;
        var stream_119=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 119");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_lambda_argument_declaration=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule lambda_argument_declaration");
        try {
            // Rescripted.g:333:9: ( lambda_argument_declaration '=>' expression -> ^( LAMBDA lambda_argument_declaration expression ) )
            // Rescripted.g:333:11: lambda_argument_declaration '=>' expression
            this.pushFollow(RescriptedParser.FOLLOW_lambda_argument_declaration_in_lambda_c3207);
            lambda_argument_declaration171=this.lambda_argument_declaration();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_lambda_argument_declaration.add(lambda_argument_declaration171.getTree());
            string_literal172=this.match(this.input,119,RescriptedParser.FOLLOW_119_in_lambda_c3209); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_119.add(string_literal172);

            this.pushFollow(RescriptedParser.FOLLOW_expression_in_lambda_c3211);
            expression173=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_expression.add(expression173.getTree());


            // AST REWRITE
            // elements: lambda_argument_declaration, expression
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 333:55: -> ^( LAMBDA lambda_argument_declaration expression )
            {
                // Rescripted.g:333:58: ^( LAMBDA lambda_argument_declaration expression )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(LAMBDA, "LAMBDA"), root_1);

                this.adaptor.addChild(root_1, stream_lambda_argument_declaration.nextTree());
                this.adaptor.addChild(root_1, stream_expression.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    lambda_return: (function() {
        RescriptedParser.lambda_return = function(){};
        org.antlr.lang.extend(RescriptedParser.lambda_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:334:1: lambda : ( lambda_a | lambda_b | lambda_c );
    // $ANTLR start "lambda"
    lambda: function() {
        var retval = new RescriptedParser.lambda_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var lambda_a174 = null;
         var lambda_b175 = null;
         var lambda_c176 = null;


        try {
            // Rescripted.g:334:7: ( lambda_a | lambda_b | lambda_c )
            var alt46=3;
            switch ( this.input.LA(1) ) {
            case 116:
                alt46=1;
                break;
            case ID:
            case 119:
                alt46=2;
                break;
            case 114:
                alt46=3;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 46, 0, this.input);

                throw nvae;
            }

            switch (alt46) {
                case 1 :
                    // Rescripted.g:334:9: lambda_a
                    root_0 = this.adaptor.nil();

                    this.pushFollow(RescriptedParser.FOLLOW_lambda_a_in_lambda3227);
                    lambda_a174=this.lambda_a();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda_a174.getTree());


                    break;
                case 2 :
                    // Rescripted.g:334:20: lambda_b
                    root_0 = this.adaptor.nil();

                    this.pushFollow(RescriptedParser.FOLLOW_lambda_b_in_lambda3231);
                    lambda_b175=this.lambda_b();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda_b175.getTree());


                    break;
                case 3 :
                    // Rescripted.g:334:31: lambda_c
                    root_0 = this.adaptor.nil();

                    this.pushFollow(RescriptedParser.FOLLOW_lambda_c_in_lambda3235);
                    lambda_c176=this.lambda_c();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, lambda_c176.getTree());


                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    partial_function_return: (function() {
        RescriptedParser.partial_function_return = function(){};
        org.antlr.lang.extend(RescriptedParser.partial_function_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:338:1: partial_function : '{' ( partial_function_case )+ '}' -> ^( PARTIAL_FUNCTION ( partial_function_case )+ ) ;
    // $ANTLR start "partial_function"
    partial_function: function() {
        var retval = new RescriptedParser.partial_function_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal177 = null;
        var char_literal179 = null;
         var partial_function_case178 = null;

        var char_literal177_tree=null;
        var char_literal179_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_partial_function_case=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule partial_function_case");
        try {
            // Rescripted.g:338:17: ( '{' ( partial_function_case )+ '}' -> ^( PARTIAL_FUNCTION ( partial_function_case )+ ) )
            // Rescripted.g:338:19: '{' ( partial_function_case )+ '}'
            char_literal177=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_partial_function3246); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_116.add(char_literal177);

            // Rescripted.g:338:23: ( partial_function_case )+
            var cnt47=0;
            loop47:
            do {
                var alt47=2;
                var LA47_0 = this.input.LA(1);

                if ( (LA47_0==CASE) ) {
                    alt47=1;
                }


                switch (alt47) {
                case 1 :
                    // Rescripted.g:338:23: partial_function_case
                    this.pushFollow(RescriptedParser.FOLLOW_partial_function_case_in_partial_function3248);
                    partial_function_case178=this.partial_function_case();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_partial_function_case.add(partial_function_case178.getTree());


                    break;

                default :
                    if ( cnt47 >= 1 ) {
                        break loop47;
                    }
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var eee = new org.antlr.runtime.EarlyExitException(47, this.input);
                        throw eee;
                }
                cnt47++;
            } while (true);

            char_literal179=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_partial_function3251); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_117.add(char_literal179);



            // AST REWRITE
            // elements: partial_function_case
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 338:50: -> ^( PARTIAL_FUNCTION ( partial_function_case )+ )
            {
                // Rescripted.g:338:53: ^( PARTIAL_FUNCTION ( partial_function_case )+ )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(PARTIAL_FUNCTION, "PARTIAL_FUNCTION"), root_1);

                if ( !(stream_partial_function_case.hasNext()) ) {
                    throw new org.antlr.runtime.tree.RewriteEarlyExitException();
                }
                while ( stream_partial_function_case.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_partial_function_case.nextTree());

                }
                stream_partial_function_case.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    partial_function_case_return: (function() {
        RescriptedParser.partial_function_case_return = function(){};
        org.antlr.lang.extend(RescriptedParser.partial_function_case_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:340:1: partial_function_case : CASE partial_function_pattern ( IF expression )? '=>' ( statement )* -> ^( CASE partial_function_pattern ( ^( GUARD expression ) )? ( statement )* ) ;
    // $ANTLR start "partial_function_case"
    partial_function_case: function() {
        var retval = new RescriptedParser.partial_function_case_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CASE180 = null;
        var IF182 = null;
        var string_literal184 = null;
         var partial_function_pattern181 = null;
         var expression183 = null;
         var statement185 = null;

        var CASE180_tree=null;
        var IF182_tree=null;
        var string_literal184_tree=null;
        var stream_IF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token IF");
        var stream_CASE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CASE");
        var stream_119=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 119");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        var stream_partial_function_pattern=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule partial_function_pattern");
        try {
            // Rescripted.g:340:22: ( CASE partial_function_pattern ( IF expression )? '=>' ( statement )* -> ^( CASE partial_function_pattern ( ^( GUARD expression ) )? ( statement )* ) )
            // Rescripted.g:340:24: CASE partial_function_pattern ( IF expression )? '=>' ( statement )*
            CASE180=this.match(this.input,CASE,RescriptedParser.FOLLOW_CASE_in_partial_function_case3267); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_CASE.add(CASE180);

            this.pushFollow(RescriptedParser.FOLLOW_partial_function_pattern_in_partial_function_case3269);
            partial_function_pattern181=this.partial_function_pattern();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_partial_function_pattern.add(partial_function_pattern181.getTree());
            // Rescripted.g:340:54: ( IF expression )?
            var alt48=2;
            var LA48_0 = this.input.LA(1);

            if ( (LA48_0==IF) ) {
                alt48=1;
            }
            switch (alt48) {
                case 1 :
                    // Rescripted.g:340:55: IF expression
                    IF182=this.match(this.input,IF,RescriptedParser.FOLLOW_IF_in_partial_function_case3272); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_IF.add(IF182);

                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_partial_function_case3274);
                    expression183=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_expression.add(expression183.getTree());


                    break;

            }

            string_literal184=this.match(this.input,119,RescriptedParser.FOLLOW_119_in_partial_function_case3278); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_119.add(string_literal184);

            // Rescripted.g:340:76: ( statement )*
            loop49:
            do {
                var alt49=2;
                var LA49_0 = this.input.LA(1);

                if ( (LA49_0==IF||(LA49_0>=THROW && LA49_0<=TRY)||(LA49_0>=PUBLIC && LA49_0<=NATIVE)||(LA49_0>=VAR && LA49_0<=VAL)||(LA49_0>=FOR && LA49_0<=DO)||(LA49_0>=SELF && LA49_0<=RETURN)||(LA49_0>=NULL && LA49_0<=WILDCARD)||LA49_0==ID||LA49_0==INT||LA49_0==HEX_INT||LA49_0==FLOAT||LA49_0==XML_ELEM||(LA49_0>=STRING && LA49_0<=EXCLAMATION)||LA49_0==POUND||LA49_0==111||(LA49_0>=113 && LA49_0<=114)||LA49_0==116||LA49_0==119) ) {
                    alt49=1;
                }


                switch (alt49) {
                case 1 :
                    // Rescripted.g:340:76: statement
                    this.pushFollow(RescriptedParser.FOLLOW_statement_in_partial_function_case3280);
                    statement185=this.statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_statement.add(statement185.getTree());


                    break;

                default :
                    break loop49;
                }
            } while (true);



            // AST REWRITE
            // elements: expression, CASE, partial_function_pattern, statement
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 340:87: -> ^( CASE partial_function_pattern ( ^( GUARD expression ) )? ( statement )* )
            {
                // Rescripted.g:340:90: ^( CASE partial_function_pattern ( ^( GUARD expression ) )? ( statement )* )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_CASE.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_partial_function_pattern.nextTree());
                // Rescripted.g:340:122: ( ^( GUARD expression ) )?
                if ( stream_expression.hasNext() ) {
                    // Rescripted.g:340:122: ^( GUARD expression )
                    {
                    var root_2 = this.adaptor.nil();
                    root_2 = this.adaptor.becomeRoot(this.adaptor.create(GUARD, "GUARD"), root_2);

                    this.adaptor.addChild(root_2, stream_expression.nextTree());

                    this.adaptor.addChild(root_1, root_2);
                    }

                }
                stream_expression.reset();
                // Rescripted.g:340:143: ( statement )*
                while ( stream_statement.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_statement.nextTree());

                }
                stream_statement.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    partial_function_pattern_return: (function() {
        RescriptedParser.partial_function_pattern_return = function(){};
        org.antlr.lang.extend(RescriptedParser.partial_function_pattern_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:341:1: partial_function_pattern : ( ID -> ^( NAME_PATTERN ID ) | WILDCARD -> ^( WILDCARD ) | literal -> ^( EQUALS_PATTERN literal ) | '`' qualified_id '`' -> ^( EQUALS_PATTERN qualified_id ) | ID ':' type_name -> ^( TYPED_PATTERN ID type_name ) | ( ID '@' )? qualified_id '(' (patterns+= partial_function_pattern delimiter )* (varargs= '...' patterns+= partial_function_pattern delimiter )? ')' -> ^( EXTRACTOR_PATTERN ( ID )? qualified_id ( $patterns)* ( $varargs)? ) );
    // $ANTLR start "partial_function_pattern"
    partial_function_pattern: function() {
        var retval = new RescriptedParser.partial_function_pattern_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var varargs = null;
        var ID186 = null;
        var WILDCARD187 = null;
        var char_literal189 = null;
        var char_literal191 = null;
        var ID192 = null;
        var char_literal193 = null;
        var ID195 = null;
        var char_literal196 = null;
        var char_literal198 = null;
        var char_literal201 = null;
        var list_patterns=null;
         var literal188 = null;
         var qualified_id190 = null;
         var type_name194 = null;
         var qualified_id197 = null;
         var delimiter199 = null;
         var delimiter200 = null;
        var patterns = null;
        var varargs_tree=null;
        var ID186_tree=null;
        var WILDCARD187_tree=null;
        var char_literal189_tree=null;
        var char_literal191_tree=null;
        var ID192_tree=null;
        var char_literal193_tree=null;
        var ID195_tree=null;
        var char_literal196_tree=null;
        var char_literal198_tree=null;
        var char_literal201_tree=null;
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_114=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 114");
        var stream_115=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 115");
        var stream_113=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 113");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_VARARGS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token VARARGS");
        var stream_120=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 120");
        var stream_WILDCARD=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token WILDCARD");
        var stream_delimiter=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule delimiter");
        var stream_qualified_id=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule qualified_id");
        var stream_partial_function_pattern=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule partial_function_pattern");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        var stream_literal=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule literal");
        try {
            // Rescripted.g:341:25: ( ID -> ^( NAME_PATTERN ID ) | WILDCARD -> ^( WILDCARD ) | literal -> ^( EQUALS_PATTERN literal ) | '`' qualified_id '`' -> ^( EQUALS_PATTERN qualified_id ) | ID ':' type_name -> ^( TYPED_PATTERN ID type_name ) | ( ID '@' )? qualified_id '(' (patterns+= partial_function_pattern delimiter )* (varargs= '...' patterns+= partial_function_pattern delimiter )? ')' -> ^( EXTRACTOR_PATTERN ( ID )? qualified_id ( $patterns)* ( $varargs)? ) )
            var alt53=6;
            switch ( this.input.LA(1) ) {
            case ID:
                switch ( this.input.LA(2) ) {
                case COLON:
                    alt53=5;
                    break;
                case DOT:
                case 113:
                case 114:
                    alt53=6;
                    break;
                case IF:
                case VARARGS:
                case NULL:
                case TRUE:
                case FALSE:
                case WILDCARD:
                case ID:
                case INT:
                case HEX_INT:
                case FLOAT:
                case XML_ELEM:
                case STRING:
                case SEMI:
                case COMMA:
                case 115:
                case 119:
                case 120:
                    alt53=1;
                    break;
                default:
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 53, 1, this.input);

                    throw nvae;
                }

                break;
            case WILDCARD:
                alt53=2;
                break;
            case NULL:
            case TRUE:
            case FALSE:
            case INT:
            case HEX_INT:
            case FLOAT:
            case XML_ELEM:
            case STRING:
                alt53=3;
                break;
            case 120:
                alt53=4;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 53, 0, this.input);

                throw nvae;
            }

            switch (alt53) {
                case 1 :
                    // Rescripted.g:342:3: ID
                    ID186=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_partial_function_pattern3307); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID186);



                    // AST REWRITE
                    // elements: ID
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 342:6: -> ^( NAME_PATTERN ID )
                    {
                        // Rescripted.g:342:9: ^( NAME_PATTERN ID )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(NAME_PATTERN, "NAME_PATTERN"), root_1);

                        this.adaptor.addChild(root_1, stream_ID.nextNode());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // Rescripted.g:343:4: WILDCARD
                    WILDCARD187=this.match(this.input,WILDCARD,RescriptedParser.FOLLOW_WILDCARD_in_partial_function_pattern3320); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_WILDCARD.add(WILDCARD187);



                    // AST REWRITE
                    // elements: WILDCARD
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 343:13: -> ^( WILDCARD )
                    {
                        // Rescripted.g:343:16: ^( WILDCARD )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(stream_WILDCARD.nextNode(), root_1);

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 3 :
                    // Rescripted.g:344:4: literal
                    this.pushFollow(RescriptedParser.FOLLOW_literal_in_partial_function_pattern3331);
                    literal188=this.literal();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_literal.add(literal188.getTree());


                    // AST REWRITE
                    // elements: literal
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 344:12: -> ^( EQUALS_PATTERN literal )
                    {
                        // Rescripted.g:344:15: ^( EQUALS_PATTERN literal )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(EQUALS_PATTERN, "EQUALS_PATTERN"), root_1);

                        this.adaptor.addChild(root_1, stream_literal.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 4 :
                    // Rescripted.g:345:4: '`' qualified_id '`'
                    char_literal189=this.match(this.input,120,RescriptedParser.FOLLOW_120_in_partial_function_pattern3344); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_120.add(char_literal189);

                    this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_partial_function_pattern3346);
                    qualified_id190=this.qualified_id();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_qualified_id.add(qualified_id190.getTree());
                    char_literal191=this.match(this.input,120,RescriptedParser.FOLLOW_120_in_partial_function_pattern3348); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_120.add(char_literal191);



                    // AST REWRITE
                    // elements: qualified_id
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 345:25: -> ^( EQUALS_PATTERN qualified_id )
                    {
                        // Rescripted.g:345:28: ^( EQUALS_PATTERN qualified_id )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(EQUALS_PATTERN, "EQUALS_PATTERN"), root_1);

                        this.adaptor.addChild(root_1, stream_qualified_id.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 5 :
                    // Rescripted.g:346:4: ID ':' type_name
                    ID192=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_partial_function_pattern3362); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(ID192);

                    char_literal193=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_partial_function_pattern3364); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(char_literal193);

                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_partial_function_pattern3366);
                    type_name194=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_type_name.add(type_name194.getTree());


                    // AST REWRITE
                    // elements: type_name, ID
                    // token labels: 
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

                    root_0 = this.adaptor.nil();
                    // 346:21: -> ^( TYPED_PATTERN ID type_name )
                    {
                        // Rescripted.g:346:24: ^( TYPED_PATTERN ID type_name )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(TYPED_PATTERN, "TYPED_PATTERN"), root_1);

                        this.adaptor.addChild(root_1, stream_ID.nextNode());
                        this.adaptor.addChild(root_1, stream_type_name.nextTree());

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 6 :
                    // Rescripted.g:347:4: ( ID '@' )? qualified_id '(' (patterns+= partial_function_pattern delimiter )* (varargs= '...' patterns+= partial_function_pattern delimiter )? ')'
                    // Rescripted.g:347:4: ( ID '@' )?
                    var alt50=2;
                    var LA50_0 = this.input.LA(1);

                    if ( (LA50_0==ID) ) {
                        var LA50_1 = this.input.LA(2);

                        if ( (LA50_1==113) ) {
                            alt50=1;
                        }
                    }
                    switch (alt50) {
                        case 1 :
                            // Rescripted.g:347:5: ID '@'
                            ID195=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_partial_function_pattern3382); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_ID.add(ID195);

                            char_literal196=this.match(this.input,113,RescriptedParser.FOLLOW_113_in_partial_function_pattern3384); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_113.add(char_literal196);



                            break;

                    }

                    this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_partial_function_pattern3388);
                    qualified_id197=this.qualified_id();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_qualified_id.add(qualified_id197.getTree());
                    char_literal198=this.match(this.input,114,RescriptedParser.FOLLOW_114_in_partial_function_pattern3390); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_114.add(char_literal198);

                    // Rescripted.g:347:31: (patterns+= partial_function_pattern delimiter )*
                    loop51:
                    do {
                        var alt51=2;
                        var LA51_0 = this.input.LA(1);

                        if ( ((LA51_0>=NULL && LA51_0<=WILDCARD)||LA51_0==ID||LA51_0==INT||LA51_0==HEX_INT||LA51_0==FLOAT||LA51_0==XML_ELEM||LA51_0==STRING||LA51_0==120) ) {
                            alt51=1;
                        }


                        switch (alt51) {
                        case 1 :
                            // Rescripted.g:347:32: patterns+= partial_function_pattern delimiter
                            this.pushFollow(RescriptedParser.FOLLOW_partial_function_pattern_in_partial_function_pattern3395);
                            patterns=this.partial_function_pattern();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_partial_function_pattern.add(patterns.getTree());
                            if (org.antlr.lang.isNull(list_patterns)) list_patterns = [];
                            list_patterns.push(patterns.getTree());

                            this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_partial_function_pattern3397);
                            delimiter199=this.delimiter();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter199.getTree());


                            break;

                        default :
                            break loop51;
                        }
                    } while (true);

                    // Rescripted.g:347:79: (varargs= '...' patterns+= partial_function_pattern delimiter )?
                    var alt52=2;
                    var LA52_0 = this.input.LA(1);

                    if ( (LA52_0==VARARGS) ) {
                        alt52=1;
                    }
                    switch (alt52) {
                        case 1 :
                            // Rescripted.g:347:80: varargs= '...' patterns+= partial_function_pattern delimiter
                            varargs=this.match(this.input,VARARGS,RescriptedParser.FOLLOW_VARARGS_in_partial_function_pattern3404); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_VARARGS.add(varargs);

                            this.pushFollow(RescriptedParser.FOLLOW_partial_function_pattern_in_partial_function_pattern3408);
                            patterns=this.partial_function_pattern();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_partial_function_pattern.add(patterns.getTree());
                            if (org.antlr.lang.isNull(list_patterns)) list_patterns = [];
                            list_patterns.push(patterns.getTree());

                            this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_partial_function_pattern3410);
                            delimiter200=this.delimiter();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_delimiter.add(delimiter200.getTree());


                            break;

                    }

                    char_literal201=this.match(this.input,115,RescriptedParser.FOLLOW_115_in_partial_function_pattern3414); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_115.add(char_literal201);



                    // AST REWRITE
                    // elements: varargs, ID, qualified_id, patterns
                    // token labels: varargs
                    // rule labels: retval
                    // token list labels: 
                    // rule list labels: patterns
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_varargs=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token varargs",varargs);
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_patterns=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token patterns",list_patterns);
                    root_0 = this.adaptor.nil();
                    // 347:145: -> ^( EXTRACTOR_PATTERN ( ID )? qualified_id ( $patterns)* ( $varargs)? )
                    {
                        // Rescripted.g:347:148: ^( EXTRACTOR_PATTERN ( ID )? qualified_id ( $patterns)* ( $varargs)? )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(this.adaptor.create(EXTRACTOR_PATTERN, "EXTRACTOR_PATTERN"), root_1);

                        // Rescripted.g:347:168: ( ID )?
                        if ( stream_ID.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_ID.nextNode());

                        }
                        stream_ID.reset();
                        this.adaptor.addChild(root_1, stream_qualified_id.nextTree());
                        // Rescripted.g:347:185: ( $patterns)*
                        while ( stream_patterns.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_patterns.nextTree());

                        }
                        stream_patterns.reset();
                        // Rescripted.g:347:196: ( $varargs)?
                        if ( stream_varargs.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_varargs.nextNode());

                        }
                        stream_varargs.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }
            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    statement_return: (function() {
        RescriptedParser.statement_return = function(){};
        org.antlr.lang.extend(RescriptedParser.statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:351:1: statement : ( annotations declaration | expression | return_value ) ( ';' )=> ( ';' )? ;
    // $ANTLR start "statement"
    statement: function() {
        var retval = new RescriptedParser.statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal206 = null;
         var annotations202 = null;
         var declaration203 = null;
         var expression204 = null;
         var return_value205 = null;

        var char_literal206_tree=null;

        try {
            // Rescripted.g:351:10: ( ( annotations declaration | expression | return_value ) ( ';' )=> ( ';' )? )
            // Rescripted.g:352:2: ( annotations declaration | expression | return_value ) ( ';' )=> ( ';' )?
            root_0 = this.adaptor.nil();

            // Rescripted.g:352:2: ( annotations declaration | expression | return_value )
            var alt54=3;
            switch ( this.input.LA(1) ) {
            case PUBLIC:
            case PRIVATE:
            case PROTECTED:
            case OVERRIDE:
            case FINAL:
            case NATIVE:
            case VAR:
            case VAL:
            case 113:
                alt54=1;
                break;
            case IF:
            case THROW:
            case TRY:
            case FOR:
            case WHILE:
            case DO:
            case SELF:
            case THIS:
            case NULL:
            case TRUE:
            case FALSE:
            case WILDCARD:
            case ID:
            case INT:
            case HEX_INT:
            case FLOAT:
            case XML_ELEM:
            case STRING:
            case MINUS:
            case PLUS:
            case EXCLAMATION:
            case POUND:
            case 111:
            case 114:
            case 116:
            case 119:
                alt54=2;
                break;
            case RETURN:
                alt54=3;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 54, 0, this.input);

                throw nvae;
            }

            switch (alt54) {
                case 1 :
                    // Rescripted.g:353:2: annotations declaration
                    this.pushFollow(RescriptedParser.FOLLOW_annotations_in_statement3447);
                    annotations202=this.annotations();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(annotations202.getTree(), root_0);
                    this.pushFollow(RescriptedParser.FOLLOW_declaration_in_statement3450);
                    declaration203=this.declaration();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, declaration203.getTree());


                    break;
                case 2 :
                    // Rescripted.g:353:29: expression
                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_statement3454);
                    expression204=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression204.getTree());


                    break;
                case 3 :
                    // Rescripted.g:353:42: return_value
                    this.pushFollow(RescriptedParser.FOLLOW_return_value_in_statement3458);
                    return_value205=this.return_value();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, return_value205.getTree());


                    break;

            }

            // Rescripted.g:354:16: ( ';' )?
            var alt55=2;
            var LA55_0 = this.input.LA(1);

            if ( (LA55_0==SEMI) ) {
                alt55=1;
            }
            switch (alt55) {
                case 1 :
                    // Rescripted.g:354:16: ';'
                    char_literal206=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_statement3469); if (this.state.failed) return retval;


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    control_flow_statement_return: (function() {
        RescriptedParser.control_flow_statement_return = function(){};
        org.antlr.lang.extend(RescriptedParser.control_flow_statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:356:1: control_flow_statement : ( expression | return_value ) ;
    // $ANTLR start "control_flow_statement"
    control_flow_statement: function() {
        var retval = new RescriptedParser.control_flow_statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

         var expression207 = null;
         var return_value208 = null;


        try {
            // Rescripted.g:356:23: ( ( expression | return_value ) )
            // Rescripted.g:357:2: ( expression | return_value )
            root_0 = this.adaptor.nil();

            // Rescripted.g:357:2: ( expression | return_value )
            var alt56=2;
            var LA56_0 = this.input.LA(1);

            if ( (LA56_0==IF||(LA56_0>=THROW && LA56_0<=TRY)||(LA56_0>=FOR && LA56_0<=DO)||(LA56_0>=SELF && LA56_0<=THIS)||(LA56_0>=NULL && LA56_0<=WILDCARD)||LA56_0==ID||LA56_0==INT||LA56_0==HEX_INT||LA56_0==FLOAT||LA56_0==XML_ELEM||(LA56_0>=STRING && LA56_0<=EXCLAMATION)||LA56_0==POUND||LA56_0==111||LA56_0==114||LA56_0==116||LA56_0==119) ) {
                alt56=1;
            }
            else if ( (LA56_0==RETURN) ) {
                alt56=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 56, 0, this.input);

                throw nvae;
            }
            switch (alt56) {
                case 1 :
                    // Rescripted.g:358:2: expression
                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_control_flow_statement3482);
                    expression207=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression207.getTree());


                    break;
                case 2 :
                    // Rescripted.g:358:15: return_value
                    this.pushFollow(RescriptedParser.FOLLOW_return_value_in_control_flow_statement3486);
                    return_value208=this.return_value();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, return_value208.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    class_statement_return: (function() {
        RescriptedParser.class_statement_return = function(){};
        org.antlr.lang.extend(RescriptedParser.class_statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:362:1: class_statement : ( ( annotations ( method | declaration ) ) | expression ) ( ';' )=> ( ';' )? ;
    // $ANTLR start "class_statement"
    class_statement: function() {
        var retval = new RescriptedParser.class_statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal213 = null;
         var annotations209 = null;
         var method210 = null;
         var declaration211 = null;
         var expression212 = null;

        var char_literal213_tree=null;

        try {
            // Rescripted.g:362:16: ( ( ( annotations ( method | declaration ) ) | expression ) ( ';' )=> ( ';' )? )
            // Rescripted.g:363:2: ( ( annotations ( method | declaration ) ) | expression ) ( ';' )=> ( ';' )?
            root_0 = this.adaptor.nil();

            // Rescripted.g:363:2: ( ( annotations ( method | declaration ) ) | expression )
            var alt58=2;
            var LA58_0 = this.input.LA(1);

            if ( ((LA58_0>=PUBLIC && LA58_0<=VAL)||LA58_0==113) ) {
                alt58=1;
            }
            else if ( (LA58_0==IF||(LA58_0>=THROW && LA58_0<=TRY)||(LA58_0>=FOR && LA58_0<=DO)||(LA58_0>=SELF && LA58_0<=THIS)||(LA58_0>=NULL && LA58_0<=WILDCARD)||LA58_0==ID||LA58_0==INT||LA58_0==HEX_INT||LA58_0==FLOAT||LA58_0==XML_ELEM||(LA58_0>=STRING && LA58_0<=EXCLAMATION)||LA58_0==POUND||LA58_0==111||LA58_0==114||LA58_0==116||LA58_0==119) ) {
                alt58=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 58, 0, this.input);

                throw nvae;
            }
            switch (alt58) {
                case 1 :
                    // Rescripted.g:364:2: ( annotations ( method | declaration ) )
                    // Rescripted.g:364:2: ( annotations ( method | declaration ) )
                    // Rescripted.g:364:3: annotations ( method | declaration )
                    this.pushFollow(RescriptedParser.FOLLOW_annotations_in_class_statement3503);
                    annotations209=this.annotations();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(annotations209.getTree(), root_0);
                    // Rescripted.g:364:16: ( method | declaration )
                    var alt57=2;
                    var LA57_0 = this.input.LA(1);

                    if ( (LA57_0==DEF) ) {
                        alt57=1;
                    }
                    else if ( ((LA57_0>=VAR && LA57_0<=VAL)) ) {
                        alt57=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 57, 0, this.input);

                        throw nvae;
                    }
                    switch (alt57) {
                        case 1 :
                            // Rescripted.g:364:17: method
                            this.pushFollow(RescriptedParser.FOLLOW_method_in_class_statement3507);
                            method210=this.method();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, method210.getTree());


                            break;
                        case 2 :
                            // Rescripted.g:364:26: declaration
                            this.pushFollow(RescriptedParser.FOLLOW_declaration_in_class_statement3511);
                            declaration211=this.declaration();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, declaration211.getTree());


                            break;

                    }






                    break;
                case 2 :
                    // Rescripted.g:364:43: expression
                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_class_statement3518);
                    expression212=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression212.getTree());


                    break;

            }

            // Rescripted.g:365:16: ( ';' )?
            var alt59=2;
            var LA59_0 = this.input.LA(1);

            if ( (LA59_0==SEMI) ) {
                alt59=1;
            }
            switch (alt59) {
                case 1 :
                    // Rescripted.g:365:16: ';'
                    char_literal213=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_class_statement3529); if (this.state.failed) return retval;


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    top_level_statement_return: (function() {
        RescriptedParser.top_level_statement_return = function(){};
        org.antlr.lang.extend(RescriptedParser.top_level_statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:368:1: top_level_statement : ( import_statement | package_declaration | annotations ( object_declaration | class_declaration | trait_declaration | method | declaration ) ) ( ';' )=> ( ';' )? ;
    // $ANTLR start "top_level_statement"
    top_level_statement: function() {
        var retval = new RescriptedParser.top_level_statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal222 = null;
         var import_statement214 = null;
         var package_declaration215 = null;
         var annotations216 = null;
         var object_declaration217 = null;
         var class_declaration218 = null;
         var trait_declaration219 = null;
         var method220 = null;
         var declaration221 = null;

        var char_literal222_tree=null;

        try {
            // Rescripted.g:368:20: ( ( import_statement | package_declaration | annotations ( object_declaration | class_declaration | trait_declaration | method | declaration ) ) ( ';' )=> ( ';' )? )
            // Rescripted.g:369:2: ( import_statement | package_declaration | annotations ( object_declaration | class_declaration | trait_declaration | method | declaration ) ) ( ';' )=> ( ';' )?
            root_0 = this.adaptor.nil();

            // Rescripted.g:369:2: ( import_statement | package_declaration | annotations ( object_declaration | class_declaration | trait_declaration | method | declaration ) )
            var alt61=3;
            switch ( this.input.LA(1) ) {
            case IMPORT:
                alt61=1;
                break;
            case PACKAGE:
                alt61=2;
                break;
            case CLASS:
            case OBJECT:
            case TRAIT:
            case CASE:
            case PUBLIC:
            case PRIVATE:
            case PROTECTED:
            case OVERRIDE:
            case FINAL:
            case NATIVE:
            case DEF:
            case VAR:
            case VAL:
            case 113:
                alt61=3;
                break;
            default:
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 61, 0, this.input);

                throw nvae;
            }

            switch (alt61) {
                case 1 :
                    // Rescripted.g:370:3: import_statement
                    this.pushFollow(RescriptedParser.FOLLOW_import_statement_in_top_level_statement3546);
                    import_statement214=this.import_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, import_statement214.getTree());


                    break;
                case 2 :
                    // Rescripted.g:371:4: package_declaration
                    this.pushFollow(RescriptedParser.FOLLOW_package_declaration_in_top_level_statement3551);
                    package_declaration215=this.package_declaration();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, package_declaration215.getTree());


                    break;
                case 3 :
                    // Rescripted.g:372:4: annotations ( object_declaration | class_declaration | trait_declaration | method | declaration )
                    this.pushFollow(RescriptedParser.FOLLOW_annotations_in_top_level_statement3556);
                    annotations216=this.annotations();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(annotations216.getTree(), root_0);
                    // Rescripted.g:372:17: ( object_declaration | class_declaration | trait_declaration | method | declaration )
                    var alt60=5;
                    switch ( this.input.LA(1) ) {
                    case CASE:
                        var LA60_1 = this.input.LA(2);

                        if ( (LA60_1==OBJECT) ) {
                            alt60=1;
                        }
                        else if ( (LA60_1==CLASS) ) {
                            alt60=2;
                        }
                        else {
                            if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                            var nvae =
                                new org.antlr.runtime.NoViableAltException("", 60, 1, this.input);

                            throw nvae;
                        }
                        break;
                    case OBJECT:
                        alt60=1;
                        break;
                    case CLASS:
                        alt60=2;
                        break;
                    case TRAIT:
                        alt60=3;
                        break;
                    case DEF:
                        alt60=4;
                        break;
                    case VAR:
                    case VAL:
                        alt60=5;
                        break;
                    default:
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 60, 0, this.input);

                        throw nvae;
                    }

                    switch (alt60) {
                        case 1 :
                            // Rescripted.g:372:19: object_declaration
                            this.pushFollow(RescriptedParser.FOLLOW_object_declaration_in_top_level_statement3561);
                            object_declaration217=this.object_declaration();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, object_declaration217.getTree());


                            break;
                        case 2 :
                            // Rescripted.g:372:40: class_declaration
                            this.pushFollow(RescriptedParser.FOLLOW_class_declaration_in_top_level_statement3565);
                            class_declaration218=this.class_declaration();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, class_declaration218.getTree());


                            break;
                        case 3 :
                            // Rescripted.g:372:60: trait_declaration
                            this.pushFollow(RescriptedParser.FOLLOW_trait_declaration_in_top_level_statement3569);
                            trait_declaration219=this.trait_declaration();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, trait_declaration219.getTree());


                            break;
                        case 4 :
                            // Rescripted.g:372:80: method
                            this.pushFollow(RescriptedParser.FOLLOW_method_in_top_level_statement3573);
                            method220=this.method();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, method220.getTree());


                            break;
                        case 5 :
                            // Rescripted.g:372:89: declaration
                            this.pushFollow(RescriptedParser.FOLLOW_declaration_in_top_level_statement3577);
                            declaration221=this.declaration();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, declaration221.getTree());


                            break;

                    }



                    break;

            }

            // Rescripted.g:373:16: ( ';' )?
            var alt62=2;
            var LA62_0 = this.input.LA(1);

            if ( (LA62_0==SEMI) ) {
                alt62=1;
            }
            switch (alt62) {
                case 1 :
                    // Rescripted.g:373:16: ';'
                    char_literal222=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_top_level_statement3591); if (this.state.failed) return retval;


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    method_name_return: (function() {
        RescriptedParser.method_name_return = function(){};
        org.antlr.lang.extend(RescriptedParser.method_name_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:376:1: method_name : (name= ID | name= OPERATOR ) -> ^( METHOD_NAME $name) ;
    // $ANTLR start "method_name"
    method_name: function() {
        var retval = new RescriptedParser.method_name_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var name = null;

        var name_tree=null;
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_OPERATOR=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token OPERATOR");

        try {
            // Rescripted.g:376:12: ( (name= ID | name= OPERATOR ) -> ^( METHOD_NAME $name) )
            // Rescripted.g:376:14: (name= ID | name= OPERATOR )
            // Rescripted.g:376:14: (name= ID | name= OPERATOR )
            var alt63=2;
            var LA63_0 = this.input.LA(1);

            if ( (LA63_0==ID) ) {
                alt63=1;
            }
            else if ( (LA63_0==OPERATOR) ) {
                alt63=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 63, 0, this.input);

                throw nvae;
            }
            switch (alt63) {
                case 1 :
                    // Rescripted.g:376:15: name= ID
                    name=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_method_name3605); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_ID.add(name);



                    break;
                case 2 :
                    // Rescripted.g:376:25: name= OPERATOR
                    name=this.match(this.input,OPERATOR,RescriptedParser.FOLLOW_OPERATOR_in_method_name3611); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_OPERATOR.add(name);



                    break;

            }



            // AST REWRITE
            // elements: name
            // token labels: name
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_name=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token name",name);
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 376:40: -> ^( METHOD_NAME $name)
            {
                // Rescripted.g:376:43: ^( METHOD_NAME $name)
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(this.adaptor.create(METHOD_NAME, "METHOD_NAME"), root_1);

                this.adaptor.addChild(root_1, stream_name.nextNode());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    method_return: (function() {
        RescriptedParser.method_return = function(){};
        org.antlr.lang.extend(RescriptedParser.method_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:377:1: method : DEF name= method_name ( argument_declaration )* ( ':' type_name )? ( '=' ( '???' | body+= expression ) -> ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? ) | '{' ( statement )* '}' -> ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? ) ) ;
    // $ANTLR start "method"
    method: function() {
        var retval = new RescriptedParser.method_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var DEF223 = null;
        var char_literal225 = null;
        var char_literal227 = null;
        var string_literal228 = null;
        var char_literal229 = null;
        var char_literal231 = null;
        var list_body=null;
         var name = null;
         var argument_declaration224 = null;
         var type_name226 = null;
         var statement230 = null;
        var body = null;
        var DEF223_tree=null;
        var char_literal225_tree=null;
        var char_literal227_tree=null;
        var string_literal228_tree=null;
        var char_literal229_tree=null;
        var char_literal231_tree=null;
        var stream_116=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 116");
        var stream_COLON=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token COLON");
        var stream_117=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 117");
        var stream_121=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token 121");
        var stream_DEF=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token DEF");
        var stream_EQ=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EQ");
        var stream_argument_declaration=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule argument_declaration");
        var stream_expression=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule expression");
        var stream_statement=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule statement");
        var stream_method_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule method_name");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        try {
            // Rescripted.g:377:7: ( DEF name= method_name ( argument_declaration )* ( ':' type_name )? ( '=' ( '???' | body+= expression ) -> ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? ) | '{' ( statement )* '}' -> ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? ) ) )
            // Rescripted.g:378:2: DEF name= method_name ( argument_declaration )* ( ':' type_name )? ( '=' ( '???' | body+= expression ) -> ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? ) | '{' ( statement )* '}' -> ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? ) )
            DEF223=this.match(this.input,DEF,RescriptedParser.FOLLOW_DEF_in_method3628); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_DEF.add(DEF223);

            this.pushFollow(RescriptedParser.FOLLOW_method_name_in_method3632);
            name=this.method_name();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_method_name.add(name.getTree());
            // Rescripted.g:378:23: ( argument_declaration )*
            loop64:
            do {
                var alt64=2;
                var LA64_0 = this.input.LA(1);

                if ( (LA64_0==114) ) {
                    alt64=1;
                }


                switch (alt64) {
                case 1 :
                    // Rescripted.g:378:23: argument_declaration
                    this.pushFollow(RescriptedParser.FOLLOW_argument_declaration_in_method3634);
                    argument_declaration224=this.argument_declaration();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_declaration.add(argument_declaration224.getTree());


                    break;

                default :
                    break loop64;
                }
            } while (true);

            // Rescripted.g:378:46: ( ':' type_name )?
            var alt65=2;
            var LA65_0 = this.input.LA(1);

            if ( (LA65_0==COLON) ) {
                alt65=1;
            }
            switch (alt65) {
                case 1 :
                    // Rescripted.g:378:47: ':' type_name
                    char_literal225=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_method3639); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_COLON.add(char_literal225);

                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_method3641);
                    type_name226=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_type_name.add(type_name226.getTree());


                    break;

            }

            // Rescripted.g:379:2: ( '=' ( '???' | body+= expression ) -> ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? ) | '{' ( statement )* '}' -> ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? ) )
            var alt68=2;
            var LA68_0 = this.input.LA(1);

            if ( (LA68_0==EQ) ) {
                alt68=1;
            }
            else if ( (LA68_0==116) ) {
                alt68=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 68, 0, this.input);

                throw nvae;
            }
            switch (alt68) {
                case 1 :
                    // Rescripted.g:380:4: '=' ( '???' | body+= expression )
                    char_literal227=this.match(this.input,EQ,RescriptedParser.FOLLOW_EQ_in_method3651); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_EQ.add(char_literal227);

                    // Rescripted.g:380:8: ( '???' | body+= expression )
                    var alt66=2;
                    var LA66_0 = this.input.LA(1);

                    if ( (LA66_0==121) ) {
                        alt66=1;
                    }
                    else if ( (LA66_0==IF||(LA66_0>=THROW && LA66_0<=TRY)||(LA66_0>=FOR && LA66_0<=DO)||(LA66_0>=SELF && LA66_0<=THIS)||(LA66_0>=NULL && LA66_0<=WILDCARD)||LA66_0==ID||LA66_0==INT||LA66_0==HEX_INT||LA66_0==FLOAT||LA66_0==XML_ELEM||(LA66_0>=STRING && LA66_0<=EXCLAMATION)||LA66_0==POUND||LA66_0==111||LA66_0==114||LA66_0==116||LA66_0==119) ) {
                        alt66=2;
                    }
                    else {
                        if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                        var nvae =
                            new org.antlr.runtime.NoViableAltException("", 66, 0, this.input);

                        throw nvae;
                    }
                    switch (alt66) {
                        case 1 :
                            // Rescripted.g:380:9: '???'
                            string_literal228=this.match(this.input,121,RescriptedParser.FOLLOW_121_in_method3654); if (this.state.failed) return retval; 
                            if ( this.state.backtracking===0 ) stream_121.add(string_literal228);



                            break;
                        case 2 :
                            // Rescripted.g:380:17: body+= expression
                            this.pushFollow(RescriptedParser.FOLLOW_expression_in_method3660);
                            body=this.expression();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_expression.add(body.getTree());
                            if (org.antlr.lang.isNull(list_body)) list_body = [];
                            list_body.push(body.getTree());



                            break;

                    }



                    // AST REWRITE
                    // elements: type_name, argument_declaration, DEF, body, name
                    // token labels: 
                    // rule labels: retval, name
                    // token list labels: 
                    // rule list labels: body
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token name",name!=null?name.tree:null);
                    var stream_body=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token body",list_body);
                    root_0 = this.adaptor.nil();
                    // 380:35: -> ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? )
                    {
                        // Rescripted.g:380:38: ^( DEF $name ( argument_declaration )* ( $body)* ( type_name )? )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(stream_DEF.nextNode(), root_1);

                        this.adaptor.addChild(root_1, stream_name.nextTree());
                        // Rescripted.g:380:50: ( argument_declaration )*
                        while ( stream_argument_declaration.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_argument_declaration.nextTree());

                        }
                        stream_argument_declaration.reset();
                        // Rescripted.g:380:72: ( $body)*
                        while ( stream_body.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_body.nextTree());

                        }
                        stream_body.reset();
                        // Rescripted.g:380:79: ( type_name )?
                        if ( stream_type_name.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_type_name.nextTree());

                        }
                        stream_type_name.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;
                case 2 :
                    // Rescripted.g:381:4: '{' ( statement )* '}'
                    char_literal229=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_method3685); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_116.add(char_literal229);

                    // Rescripted.g:381:8: ( statement )*
                    loop67:
                    do {
                        var alt67=2;
                        var LA67_0 = this.input.LA(1);

                        if ( (LA67_0==IF||(LA67_0>=THROW && LA67_0<=TRY)||(LA67_0>=PUBLIC && LA67_0<=NATIVE)||(LA67_0>=VAR && LA67_0<=VAL)||(LA67_0>=FOR && LA67_0<=DO)||(LA67_0>=SELF && LA67_0<=RETURN)||(LA67_0>=NULL && LA67_0<=WILDCARD)||LA67_0==ID||LA67_0==INT||LA67_0==HEX_INT||LA67_0==FLOAT||LA67_0==XML_ELEM||(LA67_0>=STRING && LA67_0<=EXCLAMATION)||LA67_0==POUND||LA67_0==111||(LA67_0>=113 && LA67_0<=114)||LA67_0==116||LA67_0==119) ) {
                            alt67=1;
                        }


                        switch (alt67) {
                        case 1 :
                            // Rescripted.g:381:8: statement
                            this.pushFollow(RescriptedParser.FOLLOW_statement_in_method3687);
                            statement230=this.statement();

                            this.state._fsp--;
                            if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) stream_statement.add(statement230.getTree());


                            break;

                        default :
                            break loop67;
                        }
                    } while (true);

                    char_literal231=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_method3690); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_117.add(char_literal231);



                    // AST REWRITE
                    // elements: DEF, argument_declaration, statement, name, type_name
                    // token labels: 
                    // rule labels: retval, name
                    // token list labels: 
                    // rule list labels: 
                    if ( this.state.backtracking===0 ) {
                    retval.tree = root_0;
                    var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
                    var stream_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token name",name!=null?name.tree:null);

                    root_0 = this.adaptor.nil();
                    // 381:23: -> ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? )
                    {
                        // Rescripted.g:381:26: ^( DEF $name ( argument_declaration )* ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) ) ( type_name )? )
                        {
                        var root_1 = this.adaptor.nil();
                        root_1 = this.adaptor.becomeRoot(stream_DEF.nextNode(), root_1);

                        this.adaptor.addChild(root_1, stream_name.nextTree());
                        // Rescripted.g:381:38: ( argument_declaration )*
                        while ( stream_argument_declaration.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_argument_declaration.nextTree());

                        }
                        stream_argument_declaration.reset();
                        // Rescripted.g:381:60: ^( EXPR ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) ) )
                        {
                        var root_2 = this.adaptor.nil();
                        root_2 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_2);

                        // Rescripted.g:381:67: ^( BLOCK ( statement )* ^( EXPR NULL[\"null\"] ) )
                        {
                        var root_3 = this.adaptor.nil();
                        root_3 = this.adaptor.becomeRoot(this.adaptor.create(BLOCK, "BLOCK"), root_3);

                        // Rescripted.g:381:75: ( statement )*
                        while ( stream_statement.hasNext() ) {
                            this.adaptor.addChild(root_3, stream_statement.nextTree());

                        }
                        stream_statement.reset();
                        // Rescripted.g:381:86: ^( EXPR NULL[\"null\"] )
                        {
                        var root_4 = this.adaptor.nil();
                        root_4 = this.adaptor.becomeRoot(this.adaptor.create(EXPR, "EXPR"), root_4);

                        this.adaptor.addChild(root_4, this.adaptor.create(NULL, "null"));

                        this.adaptor.addChild(root_3, root_4);
                        }

                        this.adaptor.addChild(root_2, root_3);
                        }

                        this.adaptor.addChild(root_1, root_2);
                        }
                        // Rescripted.g:381:109: ( type_name )?
                        if ( stream_type_name.hasNext() ) {
                            this.adaptor.addChild(root_1, stream_type_name.nextTree());

                        }
                        stream_type_name.reset();

                        this.adaptor.addChild(root_0, root_1);
                        }

                    }

                    retval.tree = root_0;}

                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    declaration_return: (function() {
        RescriptedParser.declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:384:1: declaration : ( VAL | VAR ) ID ( ':' type_name )? '=' expression ;
    // $ANTLR start "declaration"
    declaration: function() {
        var retval = new RescriptedParser.declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var set232 = null;
        var ID233 = null;
        var char_literal234 = null;
        var char_literal236 = null;
         var type_name235 = null;
         var expression237 = null;

        var set232_tree=null;
        var ID233_tree=null;
        var char_literal234_tree=null;
        var char_literal236_tree=null;

        try {
            // Rescripted.g:384:12: ( ( VAL | VAR ) ID ( ':' type_name )? '=' expression )
            // Rescripted.g:384:14: ( VAL | VAR ) ID ( ':' type_name )? '=' expression
            root_0 = this.adaptor.nil();

            set232=input.LT(1);
            set232=this.input.LT(1);
            if ( (this.input.LA(1)>=VAR && this.input.LA(1)<=VAL) ) {
                this.input.consume();
                if ( this.state.backtracking===0 ) root_0 = this.adaptor.becomeRoot(this.adaptor.create(set232), root_0);
                this.state.errorRecovery=false;this.state.failed=false;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                throw mse;
            }

            ID233=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_declaration3744); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            ID233_tree = this.adaptor.create(ID233);
            this.adaptor.addChild(root_0, ID233_tree);
            }
            // Rescripted.g:384:28: ( ':' type_name )?
            var alt69=2;
            var LA69_0 = this.input.LA(1);

            if ( (LA69_0==COLON) ) {
                alt69=1;
            }
            switch (alt69) {
                case 1 :
                    // Rescripted.g:384:29: ':' type_name
                    char_literal234=this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_declaration3747); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    char_literal234_tree = this.adaptor.create(char_literal234);
                    this.adaptor.addChild(root_0, char_literal234_tree);
                    }
                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_declaration3749);
                    type_name235=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, type_name235.getTree());


                    break;

            }

            char_literal236=this.match(this.input,EQ,RescriptedParser.FOLLOW_EQ_in_declaration3753); if (this.state.failed) return retval;
            this.pushFollow(RescriptedParser.FOLLOW_expression_in_declaration3756);
            expression237=this.expression();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression237.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    return_value_return: (function() {
        RescriptedParser.return_value_return = function(){};
        org.antlr.lang.extend(RescriptedParser.return_value_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:386:1: return_value : RETURN ( ';' | expression ) ;
    // $ANTLR start "return_value"
    return_value: function() {
        var retval = new RescriptedParser.return_value_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var RETURN238 = null;
        var char_literal239 = null;
         var expression240 = null;

        var RETURN238_tree=null;
        var char_literal239_tree=null;

        try {
            // Rescripted.g:386:13: ( RETURN ( ';' | expression ) )
            // Rescripted.g:386:15: RETURN ( ';' | expression )
            root_0 = this.adaptor.nil();

            RETURN238=this.match(this.input,RETURN,RescriptedParser.FOLLOW_RETURN_in_return_value3763); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            RETURN238_tree = this.adaptor.create(RETURN238);
            root_0 = this.adaptor.becomeRoot(RETURN238_tree, root_0);
            }
            // Rescripted.g:386:23: ( ';' | expression )
            var alt70=2;
            var LA70_0 = this.input.LA(1);

            if ( (LA70_0==SEMI) ) {
                alt70=1;
            }
            else if ( (LA70_0==IF||(LA70_0>=THROW && LA70_0<=TRY)||(LA70_0>=FOR && LA70_0<=DO)||(LA70_0>=SELF && LA70_0<=THIS)||(LA70_0>=NULL && LA70_0<=WILDCARD)||LA70_0==ID||LA70_0==INT||LA70_0==HEX_INT||LA70_0==FLOAT||LA70_0==XML_ELEM||(LA70_0>=STRING && LA70_0<=EXCLAMATION)||LA70_0==POUND||LA70_0==111||LA70_0==114||LA70_0==116||LA70_0==119) ) {
                alt70=2;
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 70, 0, this.input);

                throw nvae;
            }
            switch (alt70) {
                case 1 :
                    // Rescripted.g:386:24: ';'
                    char_literal239=this.match(this.input,SEMI,RescriptedParser.FOLLOW_SEMI_in_return_value3767); if (this.state.failed) return retval;


                    break;
                case 2 :
                    // Rescripted.g:386:31: expression
                    this.pushFollow(RescriptedParser.FOLLOW_expression_in_return_value3772);
                    expression240=this.expression();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, expression240.getTree());


                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    throw_expression_return: (function() {
        RescriptedParser.throw_expression_return = function(){};
        org.antlr.lang.extend(RescriptedParser.throw_expression_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:387:1: throw_expression : THROW operator_and_other_expressions ;
    // $ANTLR start "throw_expression"
    throw_expression: function() {
        var retval = new RescriptedParser.throw_expression_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var THROW241 = null;
         var operator_and_other_expressions242 = null;

        var THROW241_tree=null;

        try {
            // Rescripted.g:387:17: ( THROW operator_and_other_expressions )
            // Rescripted.g:387:19: THROW operator_and_other_expressions
            root_0 = this.adaptor.nil();

            THROW241=this.match(this.input,THROW,RescriptedParser.FOLLOW_THROW_in_throw_expression3779); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            THROW241_tree = this.adaptor.create(THROW241);
            root_0 = this.adaptor.becomeRoot(THROW241_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_operator_and_other_expressions_in_throw_expression3782);
            operator_and_other_expressions242=this.operator_and_other_expressions();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, operator_and_other_expressions242.getTree());



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    package_declaration_return: (function() {
        RescriptedParser.package_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.package_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:390:1: package_declaration : PACKAGE qualified_id '{' ( top_level_statement )* '}' ;
    // $ANTLR start "package_declaration"
    package_declaration: function() {
        var retval = new RescriptedParser.package_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var PACKAGE243 = null;
        var char_literal245 = null;
        var char_literal247 = null;
         var qualified_id244 = null;
         var top_level_statement246 = null;

        var PACKAGE243_tree=null;
        var char_literal245_tree=null;
        var char_literal247_tree=null;

        try {
            // Rescripted.g:390:20: ( PACKAGE qualified_id '{' ( top_level_statement )* '}' )
            // Rescripted.g:390:22: PACKAGE qualified_id '{' ( top_level_statement )* '}'
            root_0 = this.adaptor.nil();

            PACKAGE243=this.match(this.input,PACKAGE,RescriptedParser.FOLLOW_PACKAGE_in_package_declaration3790); if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) {
            PACKAGE243_tree = this.adaptor.create(PACKAGE243);
            root_0 = this.adaptor.becomeRoot(PACKAGE243_tree, root_0);
            }
            this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_package_declaration3793);
            qualified_id244=this.qualified_id();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, qualified_id244.getTree());
            char_literal245=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_package_declaration3795); if (this.state.failed) return retval;
            // Rescripted.g:390:49: ( top_level_statement )*
            loop71:
            do {
                var alt71=2;
                var LA71_0 = this.input.LA(1);

                if ( ((LA71_0>=IMPORT && LA71_0<=TRAIT)||LA71_0==CASE||(LA71_0>=PUBLIC && LA71_0<=VAL)||LA71_0==113) ) {
                    alt71=1;
                }


                switch (alt71) {
                case 1 :
                    // Rescripted.g:390:49: top_level_statement
                    this.pushFollow(RescriptedParser.FOLLOW_top_level_statement_in_package_declaration3798);
                    top_level_statement246=this.top_level_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, top_level_statement246.getTree());


                    break;

                default :
                    break loop71;
                }
            } while (true);

            char_literal247=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_package_declaration3801); if (this.state.failed) return retval;



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    import_statement_return: (function() {
        RescriptedParser.import_statement_return = function(){};
        org.antlr.lang.extend(RescriptedParser.import_statement_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:391:1: import_statement : ( IMPORT NATIVE qualified_id | IMPORT qualified_id ( '.' WILDCARD )? ) ;
    // $ANTLR start "import_statement"
    import_statement: function() {
        var retval = new RescriptedParser.import_statement_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var IMPORT248 = null;
        var NATIVE249 = null;
        var IMPORT251 = null;
        var char_literal253 = null;
        var WILDCARD254 = null;
         var qualified_id250 = null;
         var qualified_id252 = null;

        var IMPORT248_tree=null;
        var NATIVE249_tree=null;
        var IMPORT251_tree=null;
        var char_literal253_tree=null;
        var WILDCARD254_tree=null;

        try {
            // Rescripted.g:391:17: ( ( IMPORT NATIVE qualified_id | IMPORT qualified_id ( '.' WILDCARD )? ) )
            // Rescripted.g:392:2: ( IMPORT NATIVE qualified_id | IMPORT qualified_id ( '.' WILDCARD )? )
            root_0 = this.adaptor.nil();

            // Rescripted.g:392:2: ( IMPORT NATIVE qualified_id | IMPORT qualified_id ( '.' WILDCARD )? )
            var alt73=2;
            var LA73_0 = this.input.LA(1);

            if ( (LA73_0==IMPORT) ) {
                var LA73_1 = this.input.LA(2);

                if ( (LA73_1==NATIVE) ) {
                    alt73=1;
                }
                else if ( (LA73_1==ID) ) {
                    alt73=2;
                }
                else {
                    if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 73, 1, this.input);

                    throw nvae;
                }
            }
            else {
                if (this.state.backtracking>0) {this.state.failed=true; return retval;}
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 73, 0, this.input);

                throw nvae;
            }
            switch (alt73) {
                case 1 :
                    // Rescripted.g:393:3: IMPORT NATIVE qualified_id
                    IMPORT248=this.match(this.input,IMPORT,RescriptedParser.FOLLOW_IMPORT_in_import_statement3813); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    IMPORT248_tree = this.adaptor.create(IMPORT248);
                    root_0 = this.adaptor.becomeRoot(IMPORT248_tree, root_0);
                    }
                    NATIVE249=this.match(this.input,NATIVE,RescriptedParser.FOLLOW_NATIVE_in_import_statement3816); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    NATIVE249_tree = this.adaptor.create(NATIVE249);
                    this.adaptor.addChild(root_0, NATIVE249_tree);
                    }
                    this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_import_statement3818);
                    qualified_id250=this.qualified_id();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, qualified_id250.getTree());


                    break;
                case 2 :
                    // Rescripted.g:394:4: IMPORT qualified_id ( '.' WILDCARD )?
                    IMPORT251=this.match(this.input,IMPORT,RescriptedParser.FOLLOW_IMPORT_in_import_statement3823); if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) {
                    IMPORT251_tree = this.adaptor.create(IMPORT251);
                    root_0 = this.adaptor.becomeRoot(IMPORT251_tree, root_0);
                    }
                    this.pushFollow(RescriptedParser.FOLLOW_qualified_id_in_import_statement3826);
                    qualified_id252=this.qualified_id();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, qualified_id252.getTree());
                    // Rescripted.g:394:25: ( '.' WILDCARD )?
                    var alt72=2;
                    var LA72_0 = this.input.LA(1);

                    if ( (LA72_0==DOT) ) {
                        alt72=1;
                    }
                    switch (alt72) {
                        case 1 :
                            // Rescripted.g:394:26: '.' WILDCARD
                            char_literal253=this.match(this.input,DOT,RescriptedParser.FOLLOW_DOT_in_import_statement3829); if (this.state.failed) return retval;
                            WILDCARD254=this.match(this.input,WILDCARD,RescriptedParser.FOLLOW_WILDCARD_in_import_statement3832); if (this.state.failed) return retval;
                            if ( this.state.backtracking===0 ) {
                            WILDCARD254_tree = this.adaptor.create(WILDCARD254);
                            this.adaptor.addChild(root_0, WILDCARD254_tree);
                            }


                            break;

                    }



                    break;

            }




            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    object_declaration_return: (function() {
        RescriptedParser.object_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.object_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:398:1: object_declaration : ( CASE )? OBJECT ID ( extends_clause )? ( ( '{' )=> class_body )? -> ^( OBJECT ( CASE )? ID ( extends_clause )? ( class_body )? ) ;
    // $ANTLR start "object_declaration"
    object_declaration: function() {
        var retval = new RescriptedParser.object_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CASE255 = null;
        var OBJECT256 = null;
        var ID257 = null;
         var extends_clause258 = null;
         var class_body259 = null;

        var CASE255_tree=null;
        var OBJECT256_tree=null;
        var ID257_tree=null;
        var stream_OBJECT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token OBJECT");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_CASE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CASE");
        var stream_class_body=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule class_body");
        var stream_extends_clause=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule extends_clause");
        try {
            // Rescripted.g:398:19: ( ( CASE )? OBJECT ID ( extends_clause )? ( ( '{' )=> class_body )? -> ^( OBJECT ( CASE )? ID ( extends_clause )? ( class_body )? ) )
            // Rescripted.g:399:2: ( CASE )? OBJECT ID ( extends_clause )? ( ( '{' )=> class_body )?
            // Rescripted.g:399:2: ( CASE )?
            var alt74=2;
            var LA74_0 = this.input.LA(1);

            if ( (LA74_0==CASE) ) {
                alt74=1;
            }
            switch (alt74) {
                case 1 :
                    // Rescripted.g:399:2: CASE
                    CASE255=this.match(this.input,CASE,RescriptedParser.FOLLOW_CASE_in_object_declaration3846); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_CASE.add(CASE255);



                    break;

            }

            OBJECT256=this.match(this.input,OBJECT,RescriptedParser.FOLLOW_OBJECT_in_object_declaration3849); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_OBJECT.add(OBJECT256);

            ID257=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_object_declaration3851); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID257);

            // Rescripted.g:399:18: ( extends_clause )?
            var alt75=2;
            var LA75_0 = this.input.LA(1);

            if ( (LA75_0==EXTENDS) ) {
                alt75=1;
            }
            switch (alt75) {
                case 1 :
                    // Rescripted.g:399:18: extends_clause
                    this.pushFollow(RescriptedParser.FOLLOW_extends_clause_in_object_declaration3853);
                    extends_clause258=this.extends_clause();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_extends_clause.add(extends_clause258.getTree());


                    break;

            }

            // Rescripted.g:399:34: ( ( '{' )=> class_body )?
            var alt76=2;
            var LA76_0 = this.input.LA(1);

            if ( (LA76_0==116) && (this.synpred35_Rescripted())) {
                alt76=1;
            }
            switch (alt76) {
                case 1 :
                    // Rescripted.g:399:35: ( '{' )=> class_body
                    this.pushFollow(RescriptedParser.FOLLOW_class_body_in_object_declaration3863);
                    class_body259=this.class_body();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_class_body.add(class_body259.getTree());


                    break;

            }



            // AST REWRITE
            // elements: class_body, extends_clause, OBJECT, CASE, ID
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 399:57: -> ^( OBJECT ( CASE )? ID ( extends_clause )? ( class_body )? )
            {
                // Rescripted.g:399:60: ^( OBJECT ( CASE )? ID ( extends_clause )? ( class_body )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_OBJECT.nextNode(), root_1);

                // Rescripted.g:399:69: ( CASE )?
                if ( stream_CASE.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_CASE.nextNode());

                }
                stream_CASE.reset();
                this.adaptor.addChild(root_1, stream_ID.nextNode());
                // Rescripted.g:399:78: ( extends_clause )?
                if ( stream_extends_clause.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_extends_clause.nextTree());

                }
                stream_extends_clause.reset();
                // Rescripted.g:399:94: ( class_body )?
                if ( stream_class_body.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_class_body.nextTree());

                }
                stream_class_body.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    class_declaration_return: (function() {
        RescriptedParser.class_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.class_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:401:1: class_declaration : ( CASE )? CLASS ID ( argument_declaration )? ( extends_clause )? ( ( '{' )=> class_body )? -> ^( CLASS ( CASE )? ID ( argument_declaration )? ( extends_clause )? ( class_body )? ) ;
    // $ANTLR start "class_declaration"
    class_declaration: function() {
        var retval = new RescriptedParser.class_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var CASE260 = null;
        var CLASS261 = null;
        var ID262 = null;
         var argument_declaration263 = null;
         var extends_clause264 = null;
         var class_body265 = null;

        var CASE260_tree=null;
        var CLASS261_tree=null;
        var ID262_tree=null;
        var stream_CLASS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CLASS");
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_CASE=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token CASE");
        var stream_argument_declaration=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule argument_declaration");
        var stream_class_body=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule class_body");
        var stream_extends_clause=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule extends_clause");
        try {
            // Rescripted.g:401:18: ( ( CASE )? CLASS ID ( argument_declaration )? ( extends_clause )? ( ( '{' )=> class_body )? -> ^( CLASS ( CASE )? ID ( argument_declaration )? ( extends_clause )? ( class_body )? ) )
            // Rescripted.g:402:2: ( CASE )? CLASS ID ( argument_declaration )? ( extends_clause )? ( ( '{' )=> class_body )?
            // Rescripted.g:402:2: ( CASE )?
            var alt77=2;
            var LA77_0 = this.input.LA(1);

            if ( (LA77_0==CASE) ) {
                alt77=1;
            }
            switch (alt77) {
                case 1 :
                    // Rescripted.g:402:2: CASE
                    CASE260=this.match(this.input,CASE,RescriptedParser.FOLLOW_CASE_in_class_declaration3891); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_CASE.add(CASE260);



                    break;

            }

            CLASS261=this.match(this.input,CLASS,RescriptedParser.FOLLOW_CLASS_in_class_declaration3894); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_CLASS.add(CLASS261);

            ID262=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_class_declaration3896); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID262);

            // Rescripted.g:402:17: ( argument_declaration )?
            var alt78=2;
            var LA78_0 = this.input.LA(1);

            if ( (LA78_0==114) ) {
                alt78=1;
            }
            switch (alt78) {
                case 1 :
                    // Rescripted.g:402:17: argument_declaration
                    this.pushFollow(RescriptedParser.FOLLOW_argument_declaration_in_class_declaration3898);
                    argument_declaration263=this.argument_declaration();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_declaration.add(argument_declaration263.getTree());


                    break;

            }

            // Rescripted.g:402:39: ( extends_clause )?
            var alt79=2;
            var LA79_0 = this.input.LA(1);

            if ( (LA79_0==EXTENDS) ) {
                alt79=1;
            }
            switch (alt79) {
                case 1 :
                    // Rescripted.g:402:39: extends_clause
                    this.pushFollow(RescriptedParser.FOLLOW_extends_clause_in_class_declaration3901);
                    extends_clause264=this.extends_clause();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_extends_clause.add(extends_clause264.getTree());


                    break;

            }

            // Rescripted.g:402:55: ( ( '{' )=> class_body )?
            var alt80=2;
            var LA80_0 = this.input.LA(1);

            if ( (LA80_0==116) && (this.synpred36_Rescripted())) {
                alt80=1;
            }
            switch (alt80) {
                case 1 :
                    // Rescripted.g:402:56: ( '{' )=> class_body
                    this.pushFollow(RescriptedParser.FOLLOW_class_body_in_class_declaration3911);
                    class_body265=this.class_body();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_class_body.add(class_body265.getTree());


                    break;

            }



            // AST REWRITE
            // elements: class_body, extends_clause, ID, argument_declaration, CLASS, CASE
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 402:78: -> ^( CLASS ( CASE )? ID ( argument_declaration )? ( extends_clause )? ( class_body )? )
            {
                // Rescripted.g:402:81: ^( CLASS ( CASE )? ID ( argument_declaration )? ( extends_clause )? ( class_body )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_CLASS.nextNode(), root_1);

                // Rescripted.g:402:89: ( CASE )?
                if ( stream_CASE.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_CASE.nextNode());

                }
                stream_CASE.reset();
                this.adaptor.addChild(root_1, stream_ID.nextNode());
                // Rescripted.g:402:98: ( argument_declaration )?
                if ( stream_argument_declaration.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_argument_declaration.nextTree());

                }
                stream_argument_declaration.reset();
                // Rescripted.g:402:120: ( extends_clause )?
                if ( stream_extends_clause.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_extends_clause.nextTree());

                }
                stream_extends_clause.reset();
                // Rescripted.g:402:136: ( class_body )?
                if ( stream_class_body.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_class_body.nextTree());

                }
                stream_class_body.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    trait_declaration_return: (function() {
        RescriptedParser.trait_declaration_return = function(){};
        org.antlr.lang.extend(RescriptedParser.trait_declaration_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:404:1: trait_declaration : TRAIT ID ( trait_extends_clause )? ( ( '{' )=> class_body )? -> ^( TRAIT ID ( trait_extends_clause )? ( class_body )? ) ;
    // $ANTLR start "trait_declaration"
    trait_declaration: function() {
        var retval = new RescriptedParser.trait_declaration_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var TRAIT266 = null;
        var ID267 = null;
         var trait_extends_clause268 = null;
         var class_body269 = null;

        var TRAIT266_tree=null;
        var ID267_tree=null;
        var stream_ID=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token ID");
        var stream_TRAIT=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token TRAIT");
        var stream_class_body=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule class_body");
        var stream_trait_extends_clause=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule trait_extends_clause");
        try {
            // Rescripted.g:404:18: ( TRAIT ID ( trait_extends_clause )? ( ( '{' )=> class_body )? -> ^( TRAIT ID ( trait_extends_clause )? ( class_body )? ) )
            // Rescripted.g:405:2: TRAIT ID ( trait_extends_clause )? ( ( '{' )=> class_body )?
            TRAIT266=this.match(this.input,TRAIT,RescriptedParser.FOLLOW_TRAIT_in_trait_declaration3942); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_TRAIT.add(TRAIT266);

            ID267=this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_trait_declaration3944); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_ID.add(ID267);

            // Rescripted.g:405:11: ( trait_extends_clause )?
            var alt81=2;
            var LA81_0 = this.input.LA(1);

            if ( (LA81_0==EXTENDS) ) {
                alt81=1;
            }
            switch (alt81) {
                case 1 :
                    // Rescripted.g:405:11: trait_extends_clause
                    this.pushFollow(RescriptedParser.FOLLOW_trait_extends_clause_in_trait_declaration3946);
                    trait_extends_clause268=this.trait_extends_clause();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_trait_extends_clause.add(trait_extends_clause268.getTree());


                    break;

            }

            // Rescripted.g:405:33: ( ( '{' )=> class_body )?
            var alt82=2;
            var LA82_0 = this.input.LA(1);

            if ( (LA82_0==116) && (this.synpred37_Rescripted())) {
                alt82=1;
            }
            switch (alt82) {
                case 1 :
                    // Rescripted.g:405:34: ( '{' )=> class_body
                    this.pushFollow(RescriptedParser.FOLLOW_class_body_in_trait_declaration3956);
                    class_body269=this.class_body();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_class_body.add(class_body269.getTree());


                    break;

            }



            // AST REWRITE
            // elements: trait_extends_clause, class_body, ID, TRAIT
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: 
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);

            root_0 = this.adaptor.nil();
            // 405:56: -> ^( TRAIT ID ( trait_extends_clause )? ( class_body )? )
            {
                // Rescripted.g:405:59: ^( TRAIT ID ( trait_extends_clause )? ( class_body )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_TRAIT.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_ID.nextNode());
                // Rescripted.g:405:70: ( trait_extends_clause )?
                if ( stream_trait_extends_clause.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_trait_extends_clause.nextTree());

                }
                stream_trait_extends_clause.reset();
                // Rescripted.g:405:92: ( class_body )?
                if ( stream_class_body.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_class_body.nextTree());

                }
                stream_class_body.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    extends_clause_return: (function() {
        RescriptedParser.extends_clause_return = function(){};
        org.antlr.lang.extend(RescriptedParser.extends_clause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:407:1: extends_clause : EXTENDS names+= type_name ( argument_list )? ( WITH names+= type_name )* -> ^( EXTENDS $names ( argument_list )? ) ;
    // $ANTLR start "extends_clause"
    extends_clause: function() {
        var retval = new RescriptedParser.extends_clause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var EXTENDS270 = null;
        var WITH272 = null;
        var list_names=null;
         var argument_list271 = null;
        var names = null;
        var EXTENDS270_tree=null;
        var WITH272_tree=null;
        var stream_EXTENDS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EXTENDS");
        var stream_WITH=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token WITH");
        var stream_argument_list=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule argument_list");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        try {
            // Rescripted.g:407:15: ( EXTENDS names+= type_name ( argument_list )? ( WITH names+= type_name )* -> ^( EXTENDS $names ( argument_list )? ) )
            // Rescripted.g:407:17: EXTENDS names+= type_name ( argument_list )? ( WITH names+= type_name )*
            EXTENDS270=this.match(this.input,EXTENDS,RescriptedParser.FOLLOW_EXTENDS_in_extends_clause3979); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_EXTENDS.add(EXTENDS270);

            this.pushFollow(RescriptedParser.FOLLOW_type_name_in_extends_clause3983);
            names=this.type_name();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_type_name.add(names.getTree());
            if (org.antlr.lang.isNull(list_names)) list_names = [];
            list_names.push(names.getTree());

            // Rescripted.g:407:42: ( argument_list )?
            var alt83=2;
            var LA83_0 = this.input.LA(1);

            if ( (LA83_0==114) ) {
                alt83=1;
            }
            switch (alt83) {
                case 1 :
                    // Rescripted.g:407:42: argument_list
                    this.pushFollow(RescriptedParser.FOLLOW_argument_list_in_extends_clause3985);
                    argument_list271=this.argument_list();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_argument_list.add(argument_list271.getTree());


                    break;

            }

            // Rescripted.g:407:57: ( WITH names+= type_name )*
            loop84:
            do {
                var alt84=2;
                var LA84_0 = this.input.LA(1);

                if ( (LA84_0==WITH) ) {
                    alt84=1;
                }


                switch (alt84) {
                case 1 :
                    // Rescripted.g:407:58: WITH names+= type_name
                    WITH272=this.match(this.input,WITH,RescriptedParser.FOLLOW_WITH_in_extends_clause3989); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_WITH.add(WITH272);

                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_extends_clause3993);
                    names=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_type_name.add(names.getTree());
                    if (org.antlr.lang.isNull(list_names)) list_names = [];
                    list_names.push(names.getTree());



                    break;

                default :
                    break loop84;
                }
            } while (true);



            // AST REWRITE
            // elements: EXTENDS, names, argument_list
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: names
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_names=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token names",list_names);
            root_0 = this.adaptor.nil();
            // 407:82: -> ^( EXTENDS $names ( argument_list )? )
            {
                // Rescripted.g:407:85: ^( EXTENDS $names ( argument_list )? )
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_EXTENDS.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_names.nextTree());
                // Rescripted.g:407:102: ( argument_list )?
                if ( stream_argument_list.hasNext() ) {
                    this.adaptor.addChild(root_1, stream_argument_list.nextTree());

                }
                stream_argument_list.reset();

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    trait_extends_clause_return: (function() {
        RescriptedParser.trait_extends_clause_return = function(){};
        org.antlr.lang.extend(RescriptedParser.trait_extends_clause_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:408:1: trait_extends_clause : EXTENDS names+= type_name ( WITH names+= type_name )* -> ^( EXTENDS $names) ;
    // $ANTLR start "trait_extends_clause"
    trait_extends_clause: function() {
        var retval = new RescriptedParser.trait_extends_clause_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var EXTENDS273 = null;
        var WITH274 = null;
        var list_names=null;
        var names = null;
        var EXTENDS273_tree=null;
        var WITH274_tree=null;
        var stream_EXTENDS=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token EXTENDS");
        var stream_WITH=new org.antlr.runtime.tree.RewriteRuleTokenStream(this.adaptor,"token WITH");
        var stream_type_name=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"rule type_name");
        try {
            // Rescripted.g:408:21: ( EXTENDS names+= type_name ( WITH names+= type_name )* -> ^( EXTENDS $names) )
            // Rescripted.g:408:23: EXTENDS names+= type_name ( WITH names+= type_name )*
            EXTENDS273=this.match(this.input,EXTENDS,RescriptedParser.FOLLOW_EXTENDS_in_trait_extends_clause4013); if (this.state.failed) return retval; 
            if ( this.state.backtracking===0 ) stream_EXTENDS.add(EXTENDS273);

            this.pushFollow(RescriptedParser.FOLLOW_type_name_in_trait_extends_clause4017);
            names=this.type_name();

            this.state._fsp--;
            if (this.state.failed) return retval;
            if ( this.state.backtracking===0 ) stream_type_name.add(names.getTree());
            if (org.antlr.lang.isNull(list_names)) list_names = [];
            list_names.push(names.getTree());

            // Rescripted.g:408:48: ( WITH names+= type_name )*
            loop85:
            do {
                var alt85=2;
                var LA85_0 = this.input.LA(1);

                if ( (LA85_0==WITH) ) {
                    alt85=1;
                }


                switch (alt85) {
                case 1 :
                    // Rescripted.g:408:49: WITH names+= type_name
                    WITH274=this.match(this.input,WITH,RescriptedParser.FOLLOW_WITH_in_trait_extends_clause4020); if (this.state.failed) return retval; 
                    if ( this.state.backtracking===0 ) stream_WITH.add(WITH274);

                    this.pushFollow(RescriptedParser.FOLLOW_type_name_in_trait_extends_clause4024);
                    names=this.type_name();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) stream_type_name.add(names.getTree());
                    if (org.antlr.lang.isNull(list_names)) list_names = [];
                    list_names.push(names.getTree());



                    break;

                default :
                    break loop85;
                }
            } while (true);



            // AST REWRITE
            // elements: names, EXTENDS
            // token labels: 
            // rule labels: retval
            // token list labels: 
            // rule list labels: names
            if ( this.state.backtracking===0 ) {
            retval.tree = root_0;
            var stream_retval=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token retval",retval!=null?retval.tree:null);
            var stream_names=new org.antlr.runtime.tree.RewriteRuleSubtreeStream(this.adaptor,"token names",list_names);
            root_0 = this.adaptor.nil();
            // 408:73: -> ^( EXTENDS $names)
            {
                // Rescripted.g:408:76: ^( EXTENDS $names)
                {
                var root_1 = this.adaptor.nil();
                root_1 = this.adaptor.becomeRoot(stream_EXTENDS.nextNode(), root_1);

                this.adaptor.addChild(root_1, stream_names.nextTree());

                this.adaptor.addChild(root_0, root_1);
                }

            }

            retval.tree = root_0;}


            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    class_body_return: (function() {
        RescriptedParser.class_body_return = function(){};
        org.antlr.lang.extend(RescriptedParser.class_body_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:409:1: class_body : '{' ( class_statement )* '}' ;
    // $ANTLR start "class_body"
    class_body: function() {
        var retval = new RescriptedParser.class_body_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var char_literal275 = null;
        var char_literal277 = null;
         var class_statement276 = null;

        var char_literal275_tree=null;
        var char_literal277_tree=null;

        try {
            // Rescripted.g:409:11: ( '{' ( class_statement )* '}' )
            // Rescripted.g:409:13: '{' ( class_statement )* '}'
            root_0 = this.adaptor.nil();

            char_literal275=this.match(this.input,116,RescriptedParser.FOLLOW_116_in_class_body4041); if (this.state.failed) return retval;
            // Rescripted.g:409:18: ( class_statement )*
            loop86:
            do {
                var alt86=2;
                var LA86_0 = this.input.LA(1);

                if ( (LA86_0==IF||(LA86_0>=THROW && LA86_0<=TRY)||(LA86_0>=PUBLIC && LA86_0<=VAL)||(LA86_0>=FOR && LA86_0<=DO)||(LA86_0>=SELF && LA86_0<=THIS)||(LA86_0>=NULL && LA86_0<=WILDCARD)||LA86_0==ID||LA86_0==INT||LA86_0==HEX_INT||LA86_0==FLOAT||LA86_0==XML_ELEM||(LA86_0>=STRING && LA86_0<=EXCLAMATION)||LA86_0==POUND||LA86_0==111||(LA86_0>=113 && LA86_0<=114)||LA86_0==116||LA86_0==119) ) {
                    alt86=1;
                }


                switch (alt86) {
                case 1 :
                    // Rescripted.g:409:18: class_statement
                    this.pushFollow(RescriptedParser.FOLLOW_class_statement_in_class_body4044);
                    class_statement276=this.class_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, class_statement276.getTree());


                    break;

                default :
                    break loop86;
                }
            } while (true);

            char_literal277=this.match(this.input,117,RescriptedParser.FOLLOW_117_in_class_body4047); if (this.state.failed) return retval;



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // inline static return class
    program_return: (function() {
        RescriptedParser.program_return = function(){};
        org.antlr.lang.extend(RescriptedParser.program_return,
                          org.antlr.runtime.ParserRuleReturnScope,
        {
            getTree: function() { return this.tree; }
        });
        return;
    })(),

    // Rescripted.g:412:1: program : ( top_level_statement )* EOF ;
    // $ANTLR start "program"
    program: function() {
        var retval = new RescriptedParser.program_return();
        retval.start = this.input.LT(1);

        var root_0 = null;

        var EOF279 = null;
         var top_level_statement278 = null;

        var EOF279_tree=null;

        try {
            // Rescripted.g:412:9: ( ( top_level_statement )* EOF )
            // Rescripted.g:412:11: ( top_level_statement )* EOF
            root_0 = this.adaptor.nil();

            // Rescripted.g:412:11: ( top_level_statement )*
            loop87:
            do {
                var alt87=2;
                var LA87_0 = this.input.LA(1);

                if ( ((LA87_0>=IMPORT && LA87_0<=TRAIT)||LA87_0==CASE||(LA87_0>=PUBLIC && LA87_0<=VAL)||LA87_0==113) ) {
                    alt87=1;
                }


                switch (alt87) {
                case 1 :
                    // Rescripted.g:412:11: top_level_statement
                    this.pushFollow(RescriptedParser.FOLLOW_top_level_statement_in_program4057);
                    top_level_statement278=this.top_level_statement();

                    this.state._fsp--;
                    if (this.state.failed) return retval;
                    if ( this.state.backtracking===0 ) this.adaptor.addChild(root_0, top_level_statement278.getTree());


                    break;

                default :
                    break loop87;
                }
            } while (true);

            EOF279=this.match(this.input,EOF,RescriptedParser.FOLLOW_EOF_in_program4060); if (this.state.failed) return retval;



            retval.stop = this.input.LT(-1);

            if ( this.state.backtracking===0 ) {

            retval.tree = this.adaptor.rulePostProcessing(root_0);
            this.adaptor.setTokenBoundaries(retval.tree, retval.start, retval.stop);
            }
        }
        catch (re) {
            if (re instanceof org.antlr.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
                retval.tree = this.adaptor.errorNode(this.input, retval.start, this.input.LT(-1), re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return retval;
    },

    // $ANTLR start "synpred1_Rescripted"
    synpred1_Rescripted_fragment: function() {
        // Rescripted.g:194:23: ( '.' )
        // Rescripted.g:194:24: '.'
        this.match(this.input,DOT,RescriptedParser.FOLLOW_DOT_in_synpred1_Rescripted1670); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred1_Rescripted",

    // $ANTLR start "synpred2_Rescripted"
    synpred2_Rescripted_fragment: function() {
        // Rescripted.g:217:4: ( '#' )
        // Rescripted.g:217:5: '#'
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred2_Rescripted1852); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred2_Rescripted",

    // $ANTLR start "synpred3_Rescripted"
    synpred3_Rescripted_fragment: function() {
        // Rescripted.g:218:4: ( ( ID )? '=>' )
        // Rescripted.g:218:5: ( ID )? '=>'
        // Rescripted.g:218:5: ( ID )?
        var alt88=2;
        var LA88_0 = this.input.LA(1);

        if ( (LA88_0==ID) ) {
            alt88=1;
        }
        switch (alt88) {
            case 1 :
                // Rescripted.g:218:5: ID
                this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred3_Rescripted1863); if (this.state.failed) return ;


                break;

        }

        this.match(this.input,119,RescriptedParser.FOLLOW_119_in_synpred3_Rescripted1866); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred3_Rescripted",

    // $ANTLR start "synpred4_Rescripted"
    synpred4_Rescripted_fragment: function() {
        // Rescripted.g:219:4: ( lambda_argument_declaration '=>' )
        // Rescripted.g:219:5: lambda_argument_declaration '=>'
        this.pushFollow(RescriptedParser.FOLLOW_lambda_argument_declaration_in_synpred4_Rescripted1877);
        this.lambda_argument_declaration();

        this.state._fsp--;
        if (this.state.failed) return ;
        this.match(this.input,119,RescriptedParser.FOLLOW_119_in_synpred4_Rescripted1879); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred4_Rescripted",

    // $ANTLR start "synpred5_Rescripted"
    synpred5_Rescripted_fragment: function() {
        // Rescripted.g:220:4: ( '{' ( ID delimiter )* '=>' )
        // Rescripted.g:220:5: '{' ( ID delimiter )* '=>'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred5_Rescripted1890); if (this.state.failed) return ;
        // Rescripted.g:220:9: ( ID delimiter )*
        loop89:
        do {
            var alt89=2;
            var LA89_0 = this.input.LA(1);

            if ( (LA89_0==ID) ) {
                alt89=1;
            }


            switch (alt89) {
            case 1 :
                // Rescripted.g:220:10: ID delimiter
                this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred5_Rescripted1893); if (this.state.failed) return ;
                this.pushFollow(RescriptedParser.FOLLOW_delimiter_in_synpred5_Rescripted1895);
                this.delimiter();

                this.state._fsp--;
                if (this.state.failed) return ;


                break;

            default :
                break loop89;
            }
        } while (true);

        this.match(this.input,119,RescriptedParser.FOLLOW_119_in_synpred5_Rescripted1899); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred5_Rescripted",

    // $ANTLR start "synpred6_Rescripted"
    synpred6_Rescripted_fragment: function() {
        // Rescripted.g:221:4: ( '{' CASE )
        // Rescripted.g:221:5: '{' CASE
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred6_Rescripted1911); if (this.state.failed) return ;
        this.match(this.input,CASE,RescriptedParser.FOLLOW_CASE_in_synpred6_Rescripted1913); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred6_Rescripted",

    // $ANTLR start "synpred7_Rescripted"
    synpred7_Rescripted_fragment: function() {
        // Rescripted.g:222:4: ( ID )
        // Rescripted.g:222:5: ID
        this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred7_Rescripted1924); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred7_Rescripted",

    // $ANTLR start "synpred8_Rescripted"
    synpred8_Rescripted_fragment: function() {
        // Rescripted.g:226:4: ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )
        // Rescripted.g:226:5: ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':'
        if ( this.input.LA(1)==114||this.input.LA(1)==116 ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        if ( this.input.LA(1)==ID||this.input.LA(1)==OBJECT_LITERAL_ID||this.input.LA(1)==STRING ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_synpred8_Rescripted1964); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred8_Rescripted",

    // $ANTLR start "synpred9_Rescripted"
    synpred9_Rescripted_fragment: function() {
        // Rescripted.g:227:4: ( '{' '}' )
        // Rescripted.g:227:5: '{' '}'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred9_Rescripted1975); if (this.state.failed) return ;
        this.match(this.input,117,RescriptedParser.FOLLOW_117_in_synpred9_Rescripted1977); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred9_Rescripted",

    // $ANTLR start "synpred10_Rescripted"
    synpred10_Rescripted_fragment: function() {
        // Rescripted.g:229:4: ( '{' )
        // Rescripted.g:229:5: '{'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred10_Rescripted1993); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred10_Rescripted",

    // $ANTLR start "synpred11_Rescripted"
    synpred11_Rescripted_fragment: function() {
        // Rescripted.g:230:4: ( '(' )
        // Rescripted.g:230:5: '('
        this.match(this.input,114,RescriptedParser.FOLLOW_114_in_synpred11_Rescripted2004); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred11_Rescripted",

    // $ANTLR start "synpred12_Rescripted"
    synpred12_Rescripted_fragment: function() {
        // Rescripted.g:233:30: ( chained_expression )
        // Rescripted.g:233:31: chained_expression
        this.pushFollow(RescriptedParser.FOLLOW_chained_expression_in_synpred12_Rescripted2024);
        this.chained_expression();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred12_Rescripted",

    // $ANTLR start "synpred13_Rescripted"
    synpred13_Rescripted_fragment: function() {
        // Rescripted.g:235:4: ( '.' ID )
        // Rescripted.g:235:5: '.' ID
        this.match(this.input,DOT,RescriptedParser.FOLLOW_DOT_in_synpred13_Rescripted2058); if (this.state.failed) return ;
        this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred13_Rescripted2060); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred13_Rescripted",

    // $ANTLR start "synpred14_Rescripted"
    synpred14_Rescripted_fragment: function() {
        // Rescripted.g:236:4: ( '#' )
        // Rescripted.g:236:5: '#'
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred14_Rescripted2071); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred14_Rescripted",

    // $ANTLR start "synpred15_Rescripted"
    synpred15_Rescripted_fragment: function() {
        // Rescripted.g:237:4: ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )
        // Rescripted.g:237:5: ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':'
        if ( this.input.LA(1)==114||this.input.LA(1)==116 ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        if ( this.input.LA(1)==ID||this.input.LA(1)==OBJECT_LITERAL_ID||this.input.LA(1)==STRING ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }

        this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_synpred15_Rescripted2096); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred15_Rescripted",

    // $ANTLR start "synpred16_Rescripted"
    synpred16_Rescripted_fragment: function() {
        // Rescripted.g:238:4: ( '{' CASE )
        // Rescripted.g:238:5: '{' CASE
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred16_Rescripted2107); if (this.state.failed) return ;
        this.match(this.input,CASE,RescriptedParser.FOLLOW_CASE_in_synpred16_Rescripted2109); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred16_Rescripted",

    // $ANTLR start "synpred17_Rescripted"
    synpred17_Rescripted_fragment: function() {
        // Rescripted.g:239:4: ( '{' ( ID )* '=>' )
        // Rescripted.g:239:5: '{' ( ID )* '=>'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred17_Rescripted2120); if (this.state.failed) return ;
        // Rescripted.g:239:9: ( ID )*
        loop90:
        do {
            var alt90=2;
            var LA90_0 = this.input.LA(1);

            if ( (LA90_0==ID) ) {
                alt90=1;
            }


            switch (alt90) {
            case 1 :
                // Rescripted.g:239:9: ID
                this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred17_Rescripted2122); if (this.state.failed) return ;


                break;

            default :
                break loop90;
            }
        } while (true);

        this.match(this.input,119,RescriptedParser.FOLLOW_119_in_synpred17_Rescripted2125); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred17_Rescripted",

    // $ANTLR start "synpred18_Rescripted"
    synpred18_Rescripted_fragment: function() {
        // Rescripted.g:240:4: ( '{' )
        // Rescripted.g:240:5: '{'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred18_Rescripted2136); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred18_Rescripted",

    // $ANTLR start "synpred19_Rescripted"
    synpred19_Rescripted_fragment: function() {
        // Rescripted.g:241:4: ( '(' ':' )
        // Rescripted.g:241:5: '(' ':'
        this.match(this.input,114,RescriptedParser.FOLLOW_114_in_synpred19_Rescripted2147); if (this.state.failed) return ;
        this.match(this.input,COLON,RescriptedParser.FOLLOW_COLON_in_synpred19_Rescripted2149); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred19_Rescripted",

    // $ANTLR start "synpred20_Rescripted"
    synpred20_Rescripted_fragment: function() {
        // Rescripted.g:242:4: ( '(' )
        // Rescripted.g:242:5: '('
        this.match(this.input,114,RescriptedParser.FOLLOW_114_in_synpred20_Rescripted2160); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred20_Rescripted",

    // $ANTLR start "synpred21_Rescripted"
    synpred21_Rescripted_fragment: function() {
        // Rescripted.g:254:3: ( '#' '#' )
        // Rescripted.g:254:4: '#' '#'
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred21_Rescripted2277); if (this.state.failed) return ;
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred21_Rescripted2279); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred21_Rescripted",

    // $ANTLR start "synpred22_Rescripted"
    synpred22_Rescripted_fragment: function() {
        // Rescripted.g:255:4: ( '#' ID )
        // Rescripted.g:255:5: '#' ID
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred22_Rescripted2292); if (this.state.failed) return ;
        this.match(this.input,ID,RescriptedParser.FOLLOW_ID_in_synpred22_Rescripted2294); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred22_Rescripted",

    // $ANTLR start "synpred23_Rescripted"
    synpred23_Rescripted_fragment: function() {
        // Rescripted.g:256:4: ( '#' '(' )
        // Rescripted.g:256:5: '#' '('
        this.match(this.input,POUND,RescriptedParser.FOLLOW_POUND_in_synpred23_Rescripted2307); if (this.state.failed) return ;
        this.match(this.input,114,RescriptedParser.FOLLOW_114_in_synpred23_Rescripted2309); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred23_Rescripted",

    // $ANTLR start "synpred24_Rescripted"
    synpred24_Rescripted_fragment: function() {
        // Rescripted.g:268:25: ( '*' | '/' | '%' )
        // Rescripted.g:
        if ( (this.input.LA(1)>=DIV && this.input.LA(1)<=MOD) ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }



    },
    // $ANTLR end "synpred24_Rescripted",

    // $ANTLR start "synpred25_Rescripted"
    synpred25_Rescripted_fragment: function() {
        // Rescripted.g:269:23: ( '+' | '-' )
        // Rescripted.g:
        if ( (this.input.LA(1)>=MINUS && this.input.LA(1)<=PLUS) ) {
            this.input.consume();
            this.state.errorRecovery=false;this.state.failed=false;
        }
        else {
            if (this.state.backtracking>0) {this.state.failed=true; return ;}
            var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
            throw mse;
        }



    },
    // $ANTLR end "synpred25_Rescripted",

    // $ANTLR start "synpred26_Rescripted"
    synpred26_Rescripted_fragment: function() {
        // Rescripted.g:270:26: ( operator )
        // Rescripted.g:270:27: operator
        this.pushFollow(RescriptedParser.FOLLOW_operator_in_synpred26_Rescripted2510);
        this.operator();

        this.state._fsp--;
        if (this.state.failed) return ;


    },
    // $ANTLR end "synpred26_Rescripted",

    // $ANTLR start "synpred27_Rescripted"
    synpred27_Rescripted_fragment: function() {
        // Rescripted.g:297:3: ( ELSE )
        // Rescripted.g:297:4: ELSE
        this.match(this.input,ELSE,RescriptedParser.FOLLOW_ELSE_in_synpred27_Rescripted2730); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred27_Rescripted",

    // $ANTLR start "synpred28_Rescripted"
    synpred28_Rescripted_fragment: function() {
        // Rescripted.g:307:3: ( CATCH )
        // Rescripted.g:307:4: CATCH
        this.match(this.input,CATCH,RescriptedParser.FOLLOW_CATCH_in_synpred28_Rescripted2800); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred28_Rescripted",

    // $ANTLR start "synpred29_Rescripted"
    synpred29_Rescripted_fragment: function() {
        // Rescripted.g:308:3: ( FINALLY )
        // Rescripted.g:308:4: FINALLY
        this.match(this.input,FINALLY,RescriptedParser.FOLLOW_FINALLY_in_synpred29_Rescripted2812); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred29_Rescripted",

    // $ANTLR start "synpred35_Rescripted"
    synpred35_Rescripted_fragment: function() {
        // Rescripted.g:399:35: ( '{' )
        // Rescripted.g:399:36: '{'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred35_Rescripted3858); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred35_Rescripted",

    // $ANTLR start "synpred36_Rescripted"
    synpred36_Rescripted_fragment: function() {
        // Rescripted.g:402:56: ( '{' )
        // Rescripted.g:402:57: '{'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred36_Rescripted3906); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred36_Rescripted",

    // $ANTLR start "synpred37_Rescripted"
    synpred37_Rescripted_fragment: function() {
        // Rescripted.g:405:34: ( '{' )
        // Rescripted.g:405:35: '{'
        this.match(this.input,116,RescriptedParser.FOLLOW_116_in_synpred37_Rescripted3951); if (this.state.failed) return ;


    },
    // $ANTLR end "synpred37_Rescripted"

    // Delegated rules



    synpred36_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred36_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred2_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred2_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred29_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred29_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred27_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred27_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred20_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred20_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred15_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred15_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred25_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred25_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred5_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred5_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred8_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred8_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred22_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred22_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred4_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred4_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred28_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred28_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred23_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred23_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred37_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred37_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred10_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred10_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred35_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred35_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred12_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred12_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred6_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred6_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred21_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred21_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred14_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred14_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred13_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred13_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred26_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred26_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred16_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred16_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred17_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred17_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred9_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred9_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred11_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred11_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred24_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred24_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred7_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred7_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred3_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred3_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred1_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred1_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred18_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred18_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    },
    synpred19_Rescripted: function() {
        this.state.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred19_Rescripted_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.state.failed;
        this.input.rewind(start);
        this.state.backtracking--;
        this.state.failed=false;
        return success;
    }

}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(RescriptedParser, {
    DFA10_eotS:
        "\u0017\uffff",
    DFA10_eofS:
        "\u0017\uffff",
    DFA10_minS:
        "\u0001\u0029\u0005\uffff\u0004\u0000\u000d\uffff",
    DFA10_maxS:
        "\u0001\u0077\u0005\uffff\u0004\u0000\u000d\uffff",
    DFA10_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\u0004\u0001"+
    "\u0005\u0004\uffff\u0001\u000b\u0001\u000c\u0001\u000d\u0001\u0010\u0001"+
    "\u0006\u0001\u0007\u0001\u0008\u0001\u0009\u0001\u000e\u0001\u000f\u0001"+
    "\u0011\u0001\u000a\u0001\u0012",
    DFA10_specialS:
        "\u0001\u0000\u0005\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001"+
    "\u0004\u000d\uffff}>",
    DFA10_transitionS: [
            "\u0001\u0004\u0001\uffff\u0001\u0002\u000d\uffff\u0001\u0003"+
            "\u0003\uffff\u0001\u000b\u0001\u000a\u0003\uffff\u0003\u0001"+
            "\u0001\u000c\u0004\uffff\u0001\u0007\u0003\uffff\u0001\u0001"+
            "\u0001\uffff\u0001\u0001\u0001\uffff\u0001\u0001\u0006\uffff"+
            "\u0001\u0001\u0007\uffff\u0001\u0001\u0007\uffff\u0001\u0005"+
            "\u0005\uffff\u0001\u000d\u0002\uffff\u0001\u0009\u0001\uffff"+
            "\u0001\u0006\u0002\uffff\u0001\u0008",
            "",
            "",
            "",
            "",
            "",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(RescriptedParser, {
    DFA10_eot:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA10_eotS),
    DFA10_eof:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA10_eofS),
    DFA10_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA10_minS),
    DFA10_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA10_maxS),
    DFA10_accept:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA10_acceptS),
    DFA10_special:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA10_specialS),
    DFA10_transition: (function() {
        var a = [],
            i,
            numStates = RescriptedParser.DFA10_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA10_transitionS[i]));
        }
        return a;
    })()
});

RescriptedParser.DFA10 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 10;
    this.eot = RescriptedParser.DFA10_eot;
    this.eof = RescriptedParser.DFA10_eof;
    this.min = RescriptedParser.DFA10_min;
    this.max = RescriptedParser.DFA10_max;
    this.accept = RescriptedParser.DFA10_accept;
    this.special = RescriptedParser.DFA10_special;
    this.transition = RescriptedParser.DFA10_transition;
};

org.antlr.lang.extend(RescriptedParser.DFA10, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "212:2: ( literal | throw_expression | for_comprehension | if_expression | ( '#' )=> symbol_expr | ( ( ID )? '=>' )=> lambda | ( lambda_argument_declaration '=>' )=> lambda | ( '{' ( ID delimiter )* '=>' )=> lambda | ( '{' CASE )=> partial_function | ( ID )=> ID | THIS | SELF | WILDCARD | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> object_literal | ( '{' '}' )=> object_literal | array_literal | ( '{' )=> block | ( '(' )=> group )";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA10_0 = input.LA(1);

                             
                            var index10_0 = input.index();
                            input.rewind();
                            s = -1;
                            if ( ((LA10_0>=NULL && LA10_0<=FALSE)||LA10_0==INT||LA10_0==HEX_INT||LA10_0==FLOAT||LA10_0==XML_ELEM||LA10_0==STRING) ) {s = 1;}

                            else if ( (LA10_0==THROW) ) {s = 2;}

                            else if ( (LA10_0==FOR) ) {s = 3;}

                            else if ( (LA10_0==IF) ) {s = 4;}

                            else if ( (LA10_0==POUND) && (this.synpred2_Rescripted())) {s = 5;}

                            else if ( (LA10_0==116) ) {s = 6;}

                            else if ( (LA10_0==ID) ) {s = 7;}

                            else if ( (LA10_0==119) ) {s = 8;}

                            else if ( (LA10_0==114) ) {s = 9;}

                            else if ( (LA10_0==THIS) ) {s = 10;}

                            else if ( (LA10_0==SELF) ) {s = 11;}

                            else if ( (LA10_0==WILDCARD) ) {s = 12;}

                            else if ( (LA10_0==111) ) {s = 13;}

                             
                            input.seek(index10_0);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA10_6 = input.LA(1);

                             
                            var index10_6 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred3_Rescripted()) ) {s = 14;}

                            else if ( (this.synpred4_Rescripted()) ) {s = 15;}

                            else if ( (this.synpred5_Rescripted()) ) {s = 16;}

                            else if ( (this.synpred6_Rescripted()) ) {s = 17;}

                            else if ( (this.synpred8_Rescripted()) ) {s = 18;}

                            else if ( (this.synpred9_Rescripted()) ) {s = 19;}

                            else if ( (this.synpred10_Rescripted()) ) {s = 20;}

                             
                            input.seek(index10_6);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA10_7 = input.LA(1);

                             
                            var index10_7 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred3_Rescripted()) ) {s = 14;}

                            else if ( (this.synpred4_Rescripted()) ) {s = 15;}

                            else if ( (this.synpred5_Rescripted()) ) {s = 16;}

                            else if ( (this.synpred7_Rescripted()) ) {s = 21;}

                             
                            input.seek(index10_7);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA10_8 = input.LA(1);

                             
                            var index10_8 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred3_Rescripted()) ) {s = 14;}

                            else if ( (this.synpred4_Rescripted()) ) {s = 15;}

                            else if ( (this.synpred5_Rescripted()) ) {s = 16;}

                             
                            input.seek(index10_8);
                            if ( s>=0 ) return s;
                            break;
                        case 4 : 
                            var LA10_9 = input.LA(1);

                             
                            var index10_9 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred3_Rescripted()) ) {s = 14;}

                            else if ( (this.synpred4_Rescripted()) ) {s = 15;}

                            else if ( (this.synpred5_Rescripted()) ) {s = 16;}

                            else if ( (this.synpred8_Rescripted()) ) {s = 18;}

                            else if ( (this.synpred9_Rescripted()) ) {s = 19;}

                            else if ( (this.synpred11_Rescripted()) ) {s = 22;}

                             
                            input.seek(index10_9);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 10, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(RescriptedParser, {
    DFA11_eotS:
        "\u002f\uffff",
    DFA11_eofS:
        "\u0001\u002b\u002e\uffff",
    DFA11_minS:
        "\u0001\u001f\u002c\u0000\u0002\uffff",
    DFA11_maxS:
        "\u0001\u0077\u002c\u0000\u0002\uffff",
    DFA11_acceptS:
        "\u002d\uffff\u0001\u0001\u0001\u0002",
    DFA11_specialS:
        "\u0001\uffff\u0001\u0000\u0001\u0001\u0001\u0002\u0001\u0003\u0001"+
    "\u0004\u0001\u0005\u0001\u0006\u0001\u0007\u0001\u0008\u0001\u0009\u0001"+
    "\u000a\u0001\u000b\u0001\u000c\u0001\u000d\u0001\u000e\u0001\u000f\u0001"+
    "\u0010\u0001\u0011\u0001\u0012\u0001\u0013\u0001\u0014\u0001\u0015\u0001"+
    "\u0016\u0001\u0017\u0001\u0018\u0001\u0019\u0001\u001a\u0001\u001b\u0001"+
    "\u001c\u0001\u001d\u0001\u001e\u0001\u001f\u0001\u0020\u0001\u0021\u0001"+
    "\u0022\u0001\u0023\u0001\u0024\u0001\u0025\u0001\u0026\u0001\u0027\u0001"+
    "\u0028\u0001\u0029\u0001\u002a\u0001\u002b\u0002\uffff}>",
    DFA11_transitionS: [
            "\u0001\u0026\u0001\u0027\u0001\u0029\u0001\u0028\u0001\u002a"+
            "\u0004\uffff\u0001\u0023\u0001\u0012\u0001\u0024\u0001\u0010"+
            "\u0001\u000d\u0001\u001b\u0001\u001c\u0006\u0020\u0001\u0025"+
            "\u0002\u0021\u0001\u002c\u0001\u0011\u0001\u000b\u0001\u000c"+
            "\u0001\uffff\u0001\u0018\u0001\u0017\u0001\u0022\u0002\uffff"+
            "\u0003\u000f\u0001\u0019\u0004\uffff\u0001\u0006\u0002\uffff"+
            "\u0001\u0008\u0001\u000f\u0001\uffff\u0001\u000f\u0001\uffff"+
            "\u0001\u000f\u0006\uffff\u0001\u000f\u0007\uffff\u0001\u0007"+
            "\u0002\u0002\u0001\u0003\u0003\u0001\u0001\u000e\u0001\u0013"+
            "\u0001\u001d\u0001\uffff\u0001\u000e\u0001\u0005\u0001\u001e"+
            "\u0001\u001a\u0001\u000a\u0001\u001f\u0001\u0016\u0001\u0004"+
            "\u0001\u0014\u0001\u0009\u0001\uffff\u0001\u0015",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(RescriptedParser, {
    DFA11_eot:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA11_eotS),
    DFA11_eof:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA11_eofS),
    DFA11_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA11_minS),
    DFA11_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA11_maxS),
    DFA11_accept:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA11_acceptS),
    DFA11_special:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA11_specialS),
    DFA11_transition: (function() {
        var a = [],
            i,
            numStates = RescriptedParser.DFA11_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA11_transitionS[i]));
        }
        return a;
    })()
});

RescriptedParser.DFA11 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 11;
    this.eot = RescriptedParser.DFA11_eot;
    this.eof = RescriptedParser.DFA11_eof;
    this.min = RescriptedParser.DFA11_min;
    this.max = RescriptedParser.DFA11_max;
    this.accept = RescriptedParser.DFA11_accept;
    this.special = RescriptedParser.DFA11_special;
    this.transition = RescriptedParser.DFA11_transition;
};

org.antlr.lang.extend(RescriptedParser.DFA11, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "()* loopback of 233:29: ( ( chained_expression )=>chain+= chained_expression )*";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA11_1 = input.LA(1);

                             
                            var index11_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_1);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA11_2 = input.LA(1);

                             
                            var index11_2 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_2);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA11_3 = input.LA(1);

                             
                            var index11_3 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_3);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA11_4 = input.LA(1);

                             
                            var index11_4 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_4);
                            if ( s>=0 ) return s;
                            break;
                        case 4 : 
                            var LA11_5 = input.LA(1);

                             
                            var index11_5 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_5);
                            if ( s>=0 ) return s;
                            break;
                        case 5 : 
                            var LA11_6 = input.LA(1);

                             
                            var index11_6 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_6);
                            if ( s>=0 ) return s;
                            break;
                        case 6 : 
                            var LA11_7 = input.LA(1);

                             
                            var index11_7 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_7);
                            if ( s>=0 ) return s;
                            break;
                        case 7 : 
                            var LA11_8 = input.LA(1);

                             
                            var index11_8 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_8);
                            if ( s>=0 ) return s;
                            break;
                        case 8 : 
                            var LA11_9 = input.LA(1);

                             
                            var index11_9 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_9);
                            if ( s>=0 ) return s;
                            break;
                        case 9 : 
                            var LA11_10 = input.LA(1);

                             
                            var index11_10 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_10);
                            if ( s>=0 ) return s;
                            break;
                        case 10 : 
                            var LA11_11 = input.LA(1);

                             
                            var index11_11 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_11);
                            if ( s>=0 ) return s;
                            break;
                        case 11 : 
                            var LA11_12 = input.LA(1);

                             
                            var index11_12 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_12);
                            if ( s>=0 ) return s;
                            break;
                        case 12 : 
                            var LA11_13 = input.LA(1);

                             
                            var index11_13 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_13);
                            if ( s>=0 ) return s;
                            break;
                        case 13 : 
                            var LA11_14 = input.LA(1);

                             
                            var index11_14 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_14);
                            if ( s>=0 ) return s;
                            break;
                        case 14 : 
                            var LA11_15 = input.LA(1);

                             
                            var index11_15 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_15);
                            if ( s>=0 ) return s;
                            break;
                        case 15 : 
                            var LA11_16 = input.LA(1);

                             
                            var index11_16 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_16);
                            if ( s>=0 ) return s;
                            break;
                        case 16 : 
                            var LA11_17 = input.LA(1);

                             
                            var index11_17 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_17);
                            if ( s>=0 ) return s;
                            break;
                        case 17 : 
                            var LA11_18 = input.LA(1);

                             
                            var index11_18 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_18);
                            if ( s>=0 ) return s;
                            break;
                        case 18 : 
                            var LA11_19 = input.LA(1);

                             
                            var index11_19 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_19);
                            if ( s>=0 ) return s;
                            break;
                        case 19 : 
                            var LA11_20 = input.LA(1);

                             
                            var index11_20 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_20);
                            if ( s>=0 ) return s;
                            break;
                        case 20 : 
                            var LA11_21 = input.LA(1);

                             
                            var index11_21 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_21);
                            if ( s>=0 ) return s;
                            break;
                        case 21 : 
                            var LA11_22 = input.LA(1);

                             
                            var index11_22 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_22);
                            if ( s>=0 ) return s;
                            break;
                        case 22 : 
                            var LA11_23 = input.LA(1);

                             
                            var index11_23 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_23);
                            if ( s>=0 ) return s;
                            break;
                        case 23 : 
                            var LA11_24 = input.LA(1);

                             
                            var index11_24 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_24);
                            if ( s>=0 ) return s;
                            break;
                        case 24 : 
                            var LA11_25 = input.LA(1);

                             
                            var index11_25 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_25);
                            if ( s>=0 ) return s;
                            break;
                        case 25 : 
                            var LA11_26 = input.LA(1);

                             
                            var index11_26 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_26);
                            if ( s>=0 ) return s;
                            break;
                        case 26 : 
                            var LA11_27 = input.LA(1);

                             
                            var index11_27 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_27);
                            if ( s>=0 ) return s;
                            break;
                        case 27 : 
                            var LA11_28 = input.LA(1);

                             
                            var index11_28 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_28);
                            if ( s>=0 ) return s;
                            break;
                        case 28 : 
                            var LA11_29 = input.LA(1);

                             
                            var index11_29 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_29);
                            if ( s>=0 ) return s;
                            break;
                        case 29 : 
                            var LA11_30 = input.LA(1);

                             
                            var index11_30 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_30);
                            if ( s>=0 ) return s;
                            break;
                        case 30 : 
                            var LA11_31 = input.LA(1);

                             
                            var index11_31 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_31);
                            if ( s>=0 ) return s;
                            break;
                        case 31 : 
                            var LA11_32 = input.LA(1);

                             
                            var index11_32 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_32);
                            if ( s>=0 ) return s;
                            break;
                        case 32 : 
                            var LA11_33 = input.LA(1);

                             
                            var index11_33 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_33);
                            if ( s>=0 ) return s;
                            break;
                        case 33 : 
                            var LA11_34 = input.LA(1);

                             
                            var index11_34 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_34);
                            if ( s>=0 ) return s;
                            break;
                        case 34 : 
                            var LA11_35 = input.LA(1);

                             
                            var index11_35 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_35);
                            if ( s>=0 ) return s;
                            break;
                        case 35 : 
                            var LA11_36 = input.LA(1);

                             
                            var index11_36 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_36);
                            if ( s>=0 ) return s;
                            break;
                        case 36 : 
                            var LA11_37 = input.LA(1);

                             
                            var index11_37 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_37);
                            if ( s>=0 ) return s;
                            break;
                        case 37 : 
                            var LA11_38 = input.LA(1);

                             
                            var index11_38 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_38);
                            if ( s>=0 ) return s;
                            break;
                        case 38 : 
                            var LA11_39 = input.LA(1);

                             
                            var index11_39 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_39);
                            if ( s>=0 ) return s;
                            break;
                        case 39 : 
                            var LA11_40 = input.LA(1);

                             
                            var index11_40 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_40);
                            if ( s>=0 ) return s;
                            break;
                        case 40 : 
                            var LA11_41 = input.LA(1);

                             
                            var index11_41 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_41);
                            if ( s>=0 ) return s;
                            break;
                        case 41 : 
                            var LA11_42 = input.LA(1);

                             
                            var index11_42 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_42);
                            if ( s>=0 ) return s;
                            break;
                        case 42 : 
                            var LA11_43 = input.LA(1);

                             
                            var index11_43 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_43);
                            if ( s>=0 ) return s;
                            break;
                        case 43 : 
                            var LA11_44 = input.LA(1);

                             
                            var index11_44 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred12_Rescripted()) ) {s = 45;}

                            else if ( (true) ) {s = 46;}

                             
                            input.seek(index11_44);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 11, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(RescriptedParser, {
    DFA12_eotS:
        "\u0034\uffff",
    DFA12_eofS:
        "\u0001\u002b\u0033\uffff",
    DFA12_minS:
        "\u0001\u001f\u0001\u0000\u0013\uffff\u0001\u0000\u0001\uffff\u0001"+
    "\u0000\u001c\uffff",
    DFA12_maxS:
        "\u0001\u0077\u0001\u0000\u0013\uffff\u0001\u0000\u0001\uffff\u0001"+
    "\u0000\u001c\uffff",
    DFA12_acceptS:
        "\u0002\uffff\u0013\u0002\u0001\uffff\u0001\u0002\u0001\uffff\u0015"+
    "\u0002\u0001\u0001\u0001\u0003\u0001\u0004\u0001\u0005\u0001\u0006\u0001"+
    "\u0007\u0001\u0008",
    DFA12_specialS:
        "\u0001\u0003\u0001\u0000\u0013\uffff\u0001\u0001\u0001\uffff\u0001"+
    "\u0002\u001c\uffff}>",
    DFA12_transitionS: [
            "\u0001\u0026\u0001\u0027\u0001\u0029\u0001\u0028\u0001\u002a"+
            "\u0004\uffff\u0001\u0023\u0001\u0014\u0001\u0024\u0001\u0012"+
            "\u0001\u000f\u0001\u001c\u0001\u001d\u0006\u0020\u0001\u0025"+
            "\u0002\u0021\u0001\u002c\u0001\u0013\u0001\u000d\u0001\u000e"+
            "\u0001\uffff\u0001\u0019\u0001\u0018\u0001\u0022\u0002\uffff"+
            "\u0003\u0011\u0001\u001a\u0004\uffff\u0001\u0008\u0002\uffff"+
            "\u0001\u000a\u0001\u0011\u0001\uffff\u0001\u0011\u0001\uffff"+
            "\u0001\u0011\u0006\uffff\u0001\u0011\u0007\uffff\u0001\u0009"+
            "\u0002\u0004\u0001\u0005\u0003\u0003\u0001\u0010\u0001\u0002"+
            "\u0001\u0001\u0001\uffff\u0001\u0010\u0001\u0007\u0001\u001e"+
            "\u0001\u001b\u0001\u000c\u0001\u001f\u0001\u0017\u0001\u0006"+
            "\u0001\u0015\u0001\u000b\u0001\uffff\u0001\u0016",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\uffff",
            "",
            "\u0001\uffff",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(RescriptedParser, {
    DFA12_eot:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA12_eotS),
    DFA12_eof:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA12_eofS),
    DFA12_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA12_minS),
    DFA12_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA12_maxS),
    DFA12_accept:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA12_acceptS),
    DFA12_special:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA12_specialS),
    DFA12_transition: (function() {
        var a = [],
            i,
            numStates = RescriptedParser.DFA12_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA12_transitionS[i]));
        }
        return a;
    })()
});

RescriptedParser.DFA12 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 12;
    this.eot = RescriptedParser.DFA12_eot;
    this.eof = RescriptedParser.DFA12_eof;
    this.min = RescriptedParser.DFA12_min;
    this.max = RescriptedParser.DFA12_max;
    this.accept = RescriptedParser.DFA12_accept;
    this.special = RescriptedParser.DFA12_special;
    this.transition = RescriptedParser.DFA12_transition;
};

org.antlr.lang.extend(RescriptedParser.DFA12, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "234:21: ( ( '.' ID )=> expr_chain_select_property | ( '#' )=> expr_chain_binding | ( ( '{' | '(' ) ( ID | STRING | OBJECT_LITERAL_ID ) ':' )=> expr_chain_object_literal | ( '{' CASE )=> expr_chain_partial_function | ( '{' ( ID )* '=>' )=> expr_chain_lambda_a | ( '{' )=> expr_chain_block | ( '(' ':' )=> expr_chain_named_spread | ( '(' )=> argument_list )";
    },
    specialStateTransition: function(s, input) {
        var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA12_1 = input.LA(1);

                             
                            var index12_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred13_Rescripted()) ) {s = 45;}

                            else if ( (this.synpred14_Rescripted()) ) {s = 44;}

                             
                            input.seek(index12_1);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA12_21 = input.LA(1);

                             
                            var index12_21 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred14_Rescripted()) ) {s = 44;}

                            else if ( (this.synpred15_Rescripted()) ) {s = 46;}

                            else if ( (this.synpred16_Rescripted()) ) {s = 47;}

                            else if ( (this.synpred17_Rescripted()) ) {s = 48;}

                            else if ( (this.synpred18_Rescripted()) ) {s = 49;}

                             
                            input.seek(index12_21);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA12_23 = input.LA(1);

                             
                            var index12_23 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (this.synpred14_Rescripted()) ) {s = 44;}

                            else if ( (this.synpred15_Rescripted()) ) {s = 46;}

                            else if ( (this.synpred19_Rescripted()) ) {s = 50;}

                            else if ( (this.synpred20_Rescripted()) ) {s = 51;}

                             
                            input.seek(index12_23);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA12_0 = input.LA(1);

                             
                            var index12_0 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA12_0==DOT) ) {s = 1;}

                            else if ( (LA12_0==POUND) && (this.synpred14_Rescripted())) {s = 2;}

                            else if ( ((LA12_0>=DIV && LA12_0<=MOD)) && (this.synpred14_Rescripted())) {s = 3;}

                            else if ( ((LA12_0>=MINUS && LA12_0<=PLUS)) && (this.synpred14_Rescripted())) {s = 4;}

                            else if ( (LA12_0==EXCLAMATION) && (this.synpred14_Rescripted())) {s = 5;}

                            else if ( (LA12_0==115) && (this.synpred14_Rescripted())) {s = 6;}

                            else if ( (LA12_0==SEMI) && (this.synpred14_Rescripted())) {s = 7;}

                            else if ( (LA12_0==ID) && (this.synpred14_Rescripted())) {s = 8;}

                            else if ( (LA12_0==STRING) && (this.synpred14_Rescripted())) {s = 9;}

                            else if ( (LA12_0==OBJECT_LITERAL_ID) && (this.synpred14_Rescripted())) {s = 10;}

                            else if ( (LA12_0==117) && (this.synpred14_Rescripted())) {s = 11;}

                            else if ( (LA12_0==112) && (this.synpred14_Rescripted())) {s = 12;}

                            else if ( (LA12_0==WHILE) && (this.synpred14_Rescripted())) {s = 13;}

                            else if ( (LA12_0==DO) && (this.synpred14_Rescripted())) {s = 14;}

                            else if ( (LA12_0==TRY) && (this.synpred14_Rescripted())) {s = 15;}

                            else if ( (LA12_0==EQ||LA12_0==OPERATOR) && (this.synpred14_Rescripted())) {s = 16;}

                            else if ( ((LA12_0>=NULL && LA12_0<=FALSE)||LA12_0==INT||LA12_0==HEX_INT||LA12_0==FLOAT||LA12_0==XML_ELEM) && (this.synpred14_Rescripted())) {s = 17;}

                            else if ( (LA12_0==THROW) && (this.synpred14_Rescripted())) {s = 18;}

                            else if ( (LA12_0==FOR) && (this.synpred14_Rescripted())) {s = 19;}

                            else if ( (LA12_0==IF) && (this.synpred14_Rescripted())) {s = 20;}

                            else if ( (LA12_0==116) ) {s = 21;}

                            else if ( (LA12_0==119) && (this.synpred14_Rescripted())) {s = 22;}

                            else if ( (LA12_0==114) ) {s = 23;}

                            else if ( (LA12_0==THIS) && (this.synpred14_Rescripted())) {s = 24;}

                            else if ( (LA12_0==SELF) && (this.synpred14_Rescripted())) {s = 25;}

                            else if ( (LA12_0==WILDCARD) && (this.synpred14_Rescripted())) {s = 26;}

                            else if ( (LA12_0==111) && (this.synpred14_Rescripted())) {s = 27;}

                            else if ( (LA12_0==CATCH) && (this.synpred14_Rescripted())) {s = 28;}

                            else if ( (LA12_0==FINALLY) && (this.synpred14_Rescripted())) {s = 29;}

                            else if ( (LA12_0==COMMA) && (this.synpred14_Rescripted())) {s = 30;}

                            else if ( (LA12_0==113) && (this.synpred14_Rescripted())) {s = 31;}

                            else if ( ((LA12_0>=PUBLIC && LA12_0<=NATIVE)) && (this.synpred14_Rescripted())) {s = 32;}

                            else if ( ((LA12_0>=VAR && LA12_0<=VAL)) && (this.synpred14_Rescripted())) {s = 33;}

                            else if ( (LA12_0==RETURN) && (this.synpred14_Rescripted())) {s = 34;}

                            else if ( (LA12_0==CASE) && (this.synpred14_Rescripted())) {s = 35;}

                            else if ( (LA12_0==ELSE) && (this.synpred14_Rescripted())) {s = 36;}

                            else if ( (LA12_0==DEF) && (this.synpred14_Rescripted())) {s = 37;}

                            else if ( (LA12_0==IMPORT) && (this.synpred14_Rescripted())) {s = 38;}

                            else if ( (LA12_0==PACKAGE) && (this.synpred14_Rescripted())) {s = 39;}

                            else if ( (LA12_0==OBJECT) && (this.synpred14_Rescripted())) {s = 40;}

                            else if ( (LA12_0==CLASS) && (this.synpred14_Rescripted())) {s = 41;}

                            else if ( (LA12_0==TRAIT) && (this.synpred14_Rescripted())) {s = 42;}

                            else if ( (LA12_0==EOF) && (this.synpred14_Rescripted())) {s = 43;}

                            else if ( (LA12_0==VARARGS) && (this.synpred14_Rescripted())) {s = 44;}

                             
                            input.seek(index12_0);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!org.antlr.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.state.backtracking>0) {this.recognizer.state.failed=true; return -1;}
        var nvae =
            new org.antlr.runtime.NoViableAltException(this.getDescription(), 12, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
org.antlr.lang.augmentObject(RescriptedParser, {
    DFA28_eotS:
        "\u0007\uffff",
    DFA28_eofS:
        "\u0007\uffff",
    DFA28_minS:
        "\u0002\u0029\u0001\uffff\u0001\u0046\u0001\u004a\u0001\uffff\u0001"+
    "\u004a",
    DFA28_maxS:
        "\u0002\u0077\u0001\uffff\u0001\u0077\u0001\u0073\u0001\uffff\u0001"+
    "\u0076",
    DFA28_acceptS:
        "\u0002\uffff\u0001\u0002\u0002\uffff\u0001\u0001\u0001\uffff",
    DFA28_specialS:
        "\u0007\uffff}>",
    DFA28_transitionS: [
            "\u0001\u0002\u0001\uffff\u0002\u0002\u000c\uffff\u0003\u0002"+
            "\u0001\uffff\u0003\u0002\u0002\uffff\u0004\u0002\u0004\uffff"+
            "\u0001\u0002\u0003\uffff\u0001\u0002\u0001\uffff\u0001\u0002"+
            "\u0001\uffff\u0001\u0002\u0006\uffff\u0001\u0002\u0007\uffff"+
            "\u0004\u0002\u0004\uffff\u0001\u0002\u0005\uffff\u0001\u0002"+
            "\u0002\uffff\u0001\u0001\u0001\uffff\u0001\u0002\u0002\uffff"+
            "\u0001\u0002",
            "\u0001\u0002\u0001\uffff\u0002\u0002\u000c\uffff\u0003\u0002"+
            "\u0001\uffff\u0002\u0002\u0003\uffff\u0004\u0002\u0004\uffff"+
            "\u0001\u0003\u0002\uffff\u0002\u0002\u0001\uffff\u0001\u0002"+
            "\u0001\uffff\u0001\u0002\u0006\uffff\u0001\u0002\u0007\uffff"+
            "\u0004\u0002\u0004\uffff\u0001\u0002\u0005\uffff\u0001\u0002"+
            "\u0002\uffff\u0003\u0002\u0002\uffff\u0001\u0002",
            "",
            "\u0001\u0002\u0003\uffff\u0001\u0002\u0017\uffff\u0009\u0002"+
            "\u0001\uffff\u0002\u0002\u0001\u0004\u0003\uffff\u0003\u0002"+
            "\u0001\uffff\u0001\u0005\u0001\u0002",
            "\u0001\u0006\u0028\uffff\u0001\u0002",
            "",
            "\u0001\u0002\u0022\uffff\u0001\u0002\u0001\u0004\u0004\uffff"+
            "\u0001\u0002\u0002\uffff\u0001\u0005"
    ]
});

org.antlr.lang.augmentObject(RescriptedParser, {
    DFA28_eot:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA28_eotS),
    DFA28_eof:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA28_eofS),
    DFA28_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA28_minS),
    DFA28_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(RescriptedParser.DFA28_maxS),
    DFA28_accept:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA28_acceptS),
    DFA28_special:
        org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA28_specialS),
    DFA28_transition: (function() {
        var a = [],
            i,
            numStates = RescriptedParser.DFA28_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(RescriptedParser.DFA28_transitionS[i]));
        }
        return a;
    })()
});

RescriptedParser.DFA28 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 28;
    this.eot = RescriptedParser.DFA28_eot;
    this.eof = RescriptedParser.DFA28_eof;
    this.min = RescriptedParser.DFA28_min;
    this.max = RescriptedParser.DFA28_max;
    this.accept = RescriptedParser.DFA28_accept;
    this.special = RescriptedParser.DFA28_special;
    this.transition = RescriptedParser.DFA28_transition;
};

org.antlr.lang.extend(RescriptedParser.DFA28, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "303:3: ( comprehension_body ( YIELD )? expression | control_flow_statement )";
    },
    dummy: null
});
 

// public class variables
org.antlr.lang.augmentObject(RescriptedParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "BLOCK", "GROUP", "PAIR", "OBJECT_LITERAL", "ARRAY_LITERAL", "FOR_IN", "COMPREHENSION_BODY", "GUARD", "ARGUMENT_DECLARATION", "ARGUMENT_DEFINITION", "ARGUMENT_LIST", "LAMBDA", "METHOD_NAME", "QUALIFIED_ID", "ANNOTATIONS", "ANNOTATION", "PARTIAL_FUNCTION", "EXTRACTOR_PATTERN", "EQUALS_PATTERN", "NAME_PATTERN", "TYPED_PATTERN", "SELECT_PROPERTY", "BINDING", "BIND_PROPERTY", "BIND_EXPRESSION", "EXPR", "TYPE", "IMPORT", "PACKAGE", "CLASS", "OBJECT", "TRAIT", "EXTENDS", "WITH", "BASE", "SUPER", "CASE", "IF", "ELSE", "THROW", "TRY", "CATCH", "FINALLY", "PUBLIC", "PRIVATE", "PROTECTED", "OVERRIDE", "FINAL", "NATIVE", "DEF", "VAR", "VAL", "VARARGS", "FOR", "WHILE", "DO", "YIELD", "SELF", "THIS", "RETURN", "NEW", "DELETE", "NULL", "TRUE", "FALSE", "WILDCARD", "COLON", "ID_START", "ID_CHAR", "BAD_ID", "ID", "OBJECT_LITERAL_ID_", "WS", "OBJECT_LITERAL_ID", "INT", "HEX_DIGIT", "HEX_INT", "EXPONENT", "FLOAT", "UNICODE_ESC", "OCTAL_ESC", "ESC_SEQ", "XML_NAME", "XML_ATTR", "XML_CONTENT", "XML_ELEM", "XML_ATTR_VALUE", "XML_BINDING", "XML_CDATA", "XML_COMMENT", "XML_TEXT", "LINE_COMMENT", "TERMINATED_COMMENT", "STRING", "MINUS", "PLUS", "EXCLAMATION", "DIV", "STAR", "MOD", "EQ", "POUND", "DOT", "OPERATOR_CHAR", "OPERATOR", "SEMI", "COMMA", "'['", "']'", "'@'", "'('", "')'", "'{'", "'}'", "'<-'", "'=>'", "'`'", "'???'"],
    FOLLOW_set_in_delimiter1618: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_operator0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_qualified_id1666: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000400]),
    FOLLOW_DOT_in_qualified_id1675: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_qualified_id1679: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000400]),
    FOLLOW_qualified_id_in_type_name1699: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00008010]),
    FOLLOW_111_in_type_name1705: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_type_name1712: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00016000]),
    FOLLOW_COMMA_in_type_name1715: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00010000]),
    FOLLOW_SEMI_in_type_name1717: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00010000]),
    FOLLOW_112_in_type_name1724: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000010]),
    FOLLOW_EXCLAMATION_in_type_name1731: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_modifier0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_113_in_annotation1770: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_annotation1772: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_argument_list_in_annotation1774: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_annotation_in_annotations1792: new org.antlr.runtime.BitSet([0x00000002, 0x001F8000,0x00000000, 0x00020000]),
    FOLLOW_modifier_in_annotations1795: new org.antlr.runtime.BitSet([0x00000002, 0x001F8000]),
    FOLLOW_POUND_in_symbol_expr1815: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_symbol_expr1818: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_literal_in_chainable_expression1830: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_throw_expression_in_chainable_expression1835: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_for_comprehension_in_chainable_expression1841: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_if_expression_in_chainable_expression1846: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_symbol_expr_in_chainable_expression1857: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_in_chainable_expression1871: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_in_chainable_expression1884: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_in_chainable_expression1905: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_partial_function_in_chainable_expression1918: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_chainable_expression1929: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_THIS_in_chainable_expression1934: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SELF_in_chainable_expression1939: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_WILDCARD_in_chainable_expression1944: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_object_literal_in_chainable_expression1969: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_object_literal_in_chainable_expression1982: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_array_literal_in_chainable_expression1987: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_block_in_chainable_expression1998: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_group_in_chainable_expression2009: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_chainable_expression_in_expr2020: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00140600]),
    FOLLOW_chained_expression_in_expr2031: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00140600]),
    FOLLOW_expr_chain_select_property_in_chained_expression2065: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_binding_in_chained_expression2076: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_object_literal_in_chained_expression2101: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_partial_function_in_chained_expression2114: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_lambda_a_in_chained_expression2130: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_block_in_chained_expression2141: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_named_spread_in_chained_expression2154: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_argument_list_in_chained_expression2165: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_expr_chain_named_spread2176: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_expr_chain_named_spread2178: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_expr_chain_named_spread2180: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_expr_chain_named_spread2182: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_a_in_expr_chain_lambda_a2196: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_partial_function_in_expr_chain_partial_function2210: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_object_literal_in_expr_chain_object_literal2224: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_expr_chain_block2230: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_statement_in_expr_chain_block2232: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_117_in_expr_chain_block2235: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DOT_in_expr_chain_select_property2254: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_expr_chain_select_property2256: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_chain_bind_empty_in_expr_chain_binding2286: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000200]),
    FOLLOW_expr_chain_bind_property_in_expr_chain_binding2301: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000200]),
    FOLLOW_expr_chain_bind_expression_in_expr_chain_binding2316: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000200]),
    FOLLOW_POUND_in_expr_chain_bind_empty2337: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_expr_chain_bind_property2343: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_expr_chain_bind_property2345: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_expr_chain_bind_expression2360: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_expr_chain_bind_expression2362: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_expr_chain_bind_expression2364: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_expr_chain_bind_expression2366: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_literal0: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_operator_in_operator_and_other_expressions2417: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_expr_unary2425: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expr_in_expr_unary2440: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expr_unary_in_expr_mult2446: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000000E0]),
    FOLLOW_set_in_expr_mult2460: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expr_unary_in_expr_mult2469: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000000E0]),
    FOLLOW_expr_mult_in_expr_add2478: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x0000000C]),
    FOLLOW_set_in_expr_add2490: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expr_mult_in_expr_add2497: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x0000000C]),
    FOLLOW_expr_add_in_expr_operator2506: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000011FC]),
    FOLLOW_operator_in_expr_operator2515: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expr_add_in_expr_operator2518: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x000011FC]),
    FOLLOW_while_loop_in_expression2535: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_do_while_loop_in_expression2541: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_try_expression_in_expression2547: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_operator_and_other_expressions_in_expression2553: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_block2564: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_statement_in_block2569: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_117_in_block2573: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_group2589: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_group2591: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_group2593: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_object_literal2610: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00000002]),
    FOLLOW_object_literal_pair_in_object_literal2612: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00080002]),
    FOLLOW_115_in_object_literal2615: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_object_literal2629: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00200002]),
    FOLLOW_object_literal_pair_in_object_literal2631: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00200002]),
    FOLLOW_117_in_object_literal2634: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_object_literal_pair2656: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_STRING_in_object_literal_pair2660: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_OBJECT_LITERAL_ID_in_object_literal_pair2664: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_object_literal_pair2667: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_object_literal_pair2669: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00006000]),
    FOLLOW_delimiter_in_object_literal_pair2671: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_111_in_array_literal2689: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0095821E]),
    FOLLOW_expression_in_array_literal2692: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0095E21E]),
    FOLLOW_delimiter_in_array_literal2694: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0095821E]),
    FOLLOW_112_in_array_literal2698: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IF_in_if_expression2717: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_if_expression2719: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_if_expression2721: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_if_expression2723: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_control_flow_statement_in_if_expression2725: new org.antlr.runtime.BitSet([0x00000002, 0x00000400]),
    FOLLOW_ELSE_in_if_expression2736: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_control_flow_statement_in_if_expression2738: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_TRY_in_try_expression2765: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_comprehension_body_in_try_expression2778: new org.antlr.runtime.BitSet([0x00000000, 0x7E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_YIELD_in_try_expression2780: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_try_expression2783: new org.antlr.runtime.BitSet([0x00000002, 0x00006000]),
    FOLLOW_control_flow_statement_in_try_expression2791: new org.antlr.runtime.BitSet([0x00000002, 0x00006000]),
    FOLLOW_catch_part_in_try_expression2805: new org.antlr.runtime.BitSet([0x00000002, 0x00004000]),
    FOLLOW_finally_part_in_try_expression2817: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CATCH_in_catch_part2834: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_catch_part2837: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FINALLY_in_finally_part2849: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_finally_part2852: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FOR_in_for_comprehension2860: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_comprehension_body_in_for_comprehension2863: new org.antlr.runtime.BitSet([0x00000000, 0xFE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_YIELD_in_for_comprehension2865: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_control_flow_statement_in_for_comprehension2868: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_comprehension_body2874: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_for_in_expression_in_comprehension_body2876: new org.antlr.runtime.BitSet([0x00000000, 0x00000200,0x00000400, 0x00080000]),
    FOLLOW_comprehension_filter_in_comprehension_body2879: new org.antlr.runtime.BitSet([0x00000000, 0x00000200,0x00000000, 0x00080000]),
    FOLLOW_115_in_comprehension_body2882: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_for_in_expression2900: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00404000]),
    FOLLOW_COMMA_in_for_in_expression2903: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_for_in_expression2905: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00404000]),
    FOLLOW_118_in_for_in_expression2909: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_for_in_expression2911: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00006000]),
    FOLLOW_delimiter_in_for_in_expression2913: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IF_in_comprehension_filter2930: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_comprehension_filter2932: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00006000]),
    FOLLOW_delimiter_in_comprehension_filter2934: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_WHILE_in_while_loop2950: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_while_loop2953: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_while_loop2956: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_while_loop2958: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_while_loop2961: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DO_in_do_while_loop2968: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_do_while_loop2971: new org.antlr.runtime.BitSet([0x00000000, 0x04000000]),
    FOLLOW_WHILE_in_do_while_loop2973: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_do_while_loop2976: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_do_while_loop2979: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_do_while_loop2981: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_lambda_argument_declaration2991: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00080000]),
    FOLLOW_ID_in_lambda_argument_declaration2994: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00086000]),
    FOLLOW_delimiter_in_lambda_argument_declaration2996: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00080000]),
    FOLLOW_115_in_lambda_argument_declaration3000: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_argument_declaration3015: new org.antlr.runtime.BitSet([0x00000000, 0x01000000,0x00000400, 0x00080000]),
    FOLLOW_argument_definition_in_argument_declaration3020: new org.antlr.runtime.BitSet([0x00000000, 0x01000000,0x00000400, 0x00080000]),
    FOLLOW_VARARGS_in_argument_declaration3027: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_argument_definition_in_argument_declaration3031: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_argument_declaration3035: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_argument_definition3055: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000040, 0x00006100]),
    FOLLOW_COLON_in_argument_definition3058: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_argument_definition3060: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00006100]),
    FOLLOW_EQ_in_argument_definition3065: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_argument_definition3067: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00006000]),
    FOLLOW_COMMA_in_argument_definition3072: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_SEMI_in_argument_definition3074: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_argument_list3098: new org.antlr.runtime.BitSet([0x00000000, 0x6F001A00,0x0205443C, 0x009C821E]),
    FOLLOW_operator_and_other_expressions_in_argument_list3103: new org.antlr.runtime.BitSet([0x00000000, 0x6F001A00,0x0205443C, 0x009CE21E]),
    FOLLOW_delimiter_in_argument_list3105: new org.antlr.runtime.BitSet([0x00000000, 0x6F001A00,0x0205443C, 0x009C821E]),
    FOLLOW_VARARGS_in_argument_list3112: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_argument_list3116: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00086000]),
    FOLLOW_delimiter_in_argument_list3118: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_argument_list3122: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_lambda_a3145: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_ID_in_lambda_a3148: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00806000]),
    FOLLOW_delimiter_in_lambda_a3150: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_119_in_lambda_a3154: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_statement_in_lambda_a3156: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_117_in_lambda_a3159: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_lambda_b3181: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00800000]),
    FOLLOW_119_in_lambda_b3184: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_lambda_b3186: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_argument_declaration_in_lambda_c3207: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00800000]),
    FOLLOW_119_in_lambda_c3209: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_lambda_c3211: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_a_in_lambda3227: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_b_in_lambda3231: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_c_in_lambda3235: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_partial_function3246: new org.antlr.runtime.BitSet([0x00000000, 0x00000100]),
    FOLLOW_partial_function_case_in_partial_function3248: new org.antlr.runtime.BitSet([0x00000000, 0x00000100,0x00000000, 0x00200000]),
    FOLLOW_117_in_partial_function3251: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CASE_in_partial_function_case3267: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x0205443C, 0x01000002]),
    FOLLOW_partial_function_pattern_in_partial_function_case3269: new org.antlr.runtime.BitSet([0x00000000, 0x00000200,0x00000000, 0x00800000]),
    FOLLOW_IF_in_partial_function_case3272: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_partial_function_case3274: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00800000]),
    FOLLOW_119_in_partial_function_case3278: new org.antlr.runtime.BitSet([0x00000002, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_statement_in_partial_function_case3280: new org.antlr.runtime.BitSet([0x00000002, 0xEE1F9A00,0x0205443C, 0x0096821E]),
    FOLLOW_ID_in_partial_function_pattern3307: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_WILDCARD_in_partial_function_pattern3320: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_literal_in_partial_function_pattern3331: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_120_in_partial_function_pattern3344: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_partial_function_pattern3346: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x01000000]),
    FOLLOW_120_in_partial_function_pattern3348: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_partial_function_pattern3362: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_partial_function_pattern3364: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_partial_function_pattern3366: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_partial_function_pattern3382: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00020000]),
    FOLLOW_113_in_partial_function_pattern3384: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_partial_function_pattern3388: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_partial_function_pattern3390: new org.antlr.runtime.BitSet([0x00000000, 0x01000000,0x0205443C, 0x01080002]),
    FOLLOW_partial_function_pattern_in_partial_function_pattern3395: new org.antlr.runtime.BitSet([0x00000000, 0x01000000,0x0205443C, 0x01086002]),
    FOLLOW_delimiter_in_partial_function_pattern3397: new org.antlr.runtime.BitSet([0x00000000, 0x01000000,0x0205443C, 0x01080002]),
    FOLLOW_VARARGS_in_partial_function_pattern3404: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x0205443C, 0x01000002]),
    FOLLOW_partial_function_pattern_in_partial_function_pattern3408: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00086000]),
    FOLLOW_delimiter_in_partial_function_pattern3410: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00080000]),
    FOLLOW_115_in_partial_function_pattern3414: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_annotations_in_statement3447: new org.antlr.runtime.BitSet([0x00000000, 0x00C00000]),
    FOLLOW_declaration_in_statement3450: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_expression_in_statement3454: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_return_value_in_statement3458: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_SEMI_in_statement3469: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_control_flow_statement3482: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_return_value_in_control_flow_statement3486: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_annotations_in_class_statement3503: new org.antlr.runtime.BitSet([0x00000000, 0x00E00000]),
    FOLLOW_method_in_class_statement3507: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_declaration_in_class_statement3511: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_expression_in_class_statement3518: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_SEMI_in_class_statement3529: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_import_statement_in_top_level_statement3546: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_package_declaration_in_top_level_statement3551: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_annotations_in_top_level_statement3556: new org.antlr.runtime.BitSet([0x00000000, 0x00E0010E]),
    FOLLOW_object_declaration_in_top_level_statement3561: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_class_declaration_in_top_level_statement3565: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_trait_declaration_in_top_level_statement3569: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_method_in_top_level_statement3573: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_declaration_in_top_level_statement3577: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00002000]),
    FOLLOW_SEMI_in_top_level_statement3591: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_method_name3605: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_OPERATOR_in_method_name3611: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DEF_in_method3628: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00001000]),
    FOLLOW_method_name_in_method3632: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00140100]),
    FOLLOW_argument_declaration_in_method3634: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00140100]),
    FOLLOW_COLON_in_method3639: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_method3641: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00100100]),
    FOLLOW_EQ_in_method3651: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0294821E]),
    FOLLOW_121_in_method3654: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_method3660: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_method3685: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_statement_in_method3687: new org.antlr.runtime.BitSet([0x00000000, 0xEE1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_117_in_method3690: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_declaration3737: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_declaration3744: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000100]),
    FOLLOW_COLON_in_declaration3747: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_declaration3749: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000100]),
    FOLLOW_EQ_in_declaration3753: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_expression_in_declaration3756: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_RETURN_in_return_value3763: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094A21E]),
    FOLLOW_SEMI_in_return_value3767: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_expression_in_return_value3772: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_THROW_in_throw_expression3779: new org.antlr.runtime.BitSet([0x00000000, 0x6E001A00,0x0205443C, 0x0094821E]),
    FOLLOW_operator_and_other_expressions_in_throw_expression3782: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_PACKAGE_in_package_declaration3790: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_package_declaration3793: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00100000]),
    FOLLOW_116_in_package_declaration3795: new org.antlr.runtime.BitSet([0x80000000, 0x001F8001,0x00000000, 0x00220000]),
    FOLLOW_top_level_statement_in_package_declaration3798: new org.antlr.runtime.BitSet([0x80000000, 0x001F8001,0x00000000, 0x00220000]),
    FOLLOW_117_in_package_declaration3801: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IMPORT_in_import_statement3813: new org.antlr.runtime.BitSet([0x00000000, 0x00100000]),
    FOLLOW_NATIVE_in_import_statement3816: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_import_statement3818: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_IMPORT_in_import_statement3823: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_qualified_id_in_import_statement3826: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00000400]),
    FOLLOW_DOT_in_import_statement3829: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000020, 0x00000000]),
    FOLLOW_WILDCARD_in_import_statement3832: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CASE_in_object_declaration3846: new org.antlr.runtime.BitSet([0x00000000, 0x00000004]),
    FOLLOW_OBJECT_in_object_declaration3849: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_object_declaration3851: new org.antlr.runtime.BitSet([0x00000002, 0x00000010,0x00000000, 0x00100000]),
    FOLLOW_extends_clause_in_object_declaration3853: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00100000]),
    FOLLOW_class_body_in_object_declaration3863: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CASE_in_class_declaration3891: new org.antlr.runtime.BitSet([0x00000000, 0x00000002]),
    FOLLOW_CLASS_in_class_declaration3894: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_class_declaration3896: new org.antlr.runtime.BitSet([0x00000002, 0x00000010,0x00000000, 0x00140000]),
    FOLLOW_argument_declaration_in_class_declaration3898: new org.antlr.runtime.BitSet([0x00000002, 0x00000010,0x00000000, 0x00100000]),
    FOLLOW_extends_clause_in_class_declaration3901: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00100000]),
    FOLLOW_class_body_in_class_declaration3911: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_TRAIT_in_trait_declaration3942: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_trait_declaration3944: new org.antlr.runtime.BitSet([0x00000002, 0x00000010,0x00000000, 0x00100000]),
    FOLLOW_trait_extends_clause_in_trait_declaration3946: new org.antlr.runtime.BitSet([0x00000002, 0x00000000,0x00000000, 0x00100000]),
    FOLLOW_class_body_in_trait_declaration3956: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_EXTENDS_in_extends_clause3979: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_extends_clause3983: new org.antlr.runtime.BitSet([0x00000002, 0x00000020,0x00000000, 0x00040000]),
    FOLLOW_argument_list_in_extends_clause3985: new org.antlr.runtime.BitSet([0x00000002, 0x00000020]),
    FOLLOW_WITH_in_extends_clause3989: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_extends_clause3993: new org.antlr.runtime.BitSet([0x00000002, 0x00000020]),
    FOLLOW_EXTENDS_in_trait_extends_clause4013: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_trait_extends_clause4017: new org.antlr.runtime.BitSet([0x00000002, 0x00000020]),
    FOLLOW_WITH_in_trait_extends_clause4020: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_type_name_in_trait_extends_clause4024: new org.antlr.runtime.BitSet([0x00000002, 0x00000020]),
    FOLLOW_116_in_class_body4041: new org.antlr.runtime.BitSet([0x00000000, 0x6E1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_class_statement_in_class_body4044: new org.antlr.runtime.BitSet([0x00000000, 0x6E1F9A00,0x0205443C, 0x00B6821E]),
    FOLLOW_117_in_class_body4047: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_top_level_statement_in_program4057: new org.antlr.runtime.BitSet([0x80000000, 0x001F8001,0x00000000, 0x00020000]),
    FOLLOW_EOF_in_program4060: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DOT_in_synpred1_Rescripted1670: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_synpred2_Rescripted1852: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_synpred3_Rescripted1863: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00800000]),
    FOLLOW_119_in_synpred3_Rescripted1866: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_lambda_argument_declaration_in_synpred4_Rescripted1877: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00800000]),
    FOLLOW_119_in_synpred4_Rescripted1879: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred5_Rescripted1890: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_ID_in_synpred5_Rescripted1893: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00806000]),
    FOLLOW_delimiter_in_synpred5_Rescripted1895: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_119_in_synpred5_Rescripted1899: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred6_Rescripted1911: new org.antlr.runtime.BitSet([0x00000000, 0x00000100]),
    FOLLOW_CASE_in_synpred6_Rescripted1913: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ID_in_synpred7_Rescripted1924: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred8_Rescripted1950: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00000002]),
    FOLLOW_set_in_synpred8_Rescripted1956: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_synpred8_Rescripted1964: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred9_Rescripted1975: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00200000]),
    FOLLOW_117_in_synpred9_Rescripted1977: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred10_Rescripted1993: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_synpred11_Rescripted2004: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_chained_expression_in_synpred12_Rescripted2024: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_DOT_in_synpred13_Rescripted2058: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_synpred13_Rescripted2060: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_synpred14_Rescripted2071: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred15_Rescripted2082: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00002400, 0x00000002]),
    FOLLOW_set_in_synpred15_Rescripted2088: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_synpred15_Rescripted2096: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred16_Rescripted2107: new org.antlr.runtime.BitSet([0x00000000, 0x00000100]),
    FOLLOW_CASE_in_synpred16_Rescripted2109: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred17_Rescripted2120: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_ID_in_synpred17_Rescripted2122: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00800000]),
    FOLLOW_119_in_synpred17_Rescripted2125: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred18_Rescripted2136: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_synpred19_Rescripted2147: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000040, 0x00000000]),
    FOLLOW_COLON_in_synpred19_Rescripted2149: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_114_in_synpred20_Rescripted2160: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_synpred21_Rescripted2277: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00000200]),
    FOLLOW_POUND_in_synpred21_Rescripted2279: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_synpred22_Rescripted2292: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000400, 0x00000000]),
    FOLLOW_ID_in_synpred22_Rescripted2294: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_POUND_in_synpred23_Rescripted2307: new org.antlr.runtime.BitSet([0x00000000, 0x00000000,0x00000000, 0x00040000]),
    FOLLOW_114_in_synpred23_Rescripted2309: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred24_Rescripted2450: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_set_in_synpred25_Rescripted2482: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_operator_in_synpred26_Rescripted2510: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_ELSE_in_synpred27_Rescripted2730: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_CATCH_in_synpred28_Rescripted2800: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_FINALLY_in_synpred29_Rescripted2812: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred35_Rescripted3858: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred36_Rescripted3906: new org.antlr.runtime.BitSet([0x00000002, 0x00000000]),
    FOLLOW_116_in_synpred37_Rescripted3951: new org.antlr.runtime.BitSet([0x00000002, 0x00000000])
});

})();
return RescriptedParser;})