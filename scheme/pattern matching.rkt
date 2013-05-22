#lang scheme
(require "necessaryFunctions.rkt")

(var symbolicDerivative2
     (fn ()
         (var match 
              (fn (pat exp dict)
                  (cond ((eq? dict 'failed) 'failed)
                        ((atom? pat)
                         (if (atom? exp)
                             (if (eq? pat exp)
                                 dict
                                 'failed)
                             'failed))
                        ;Pattern variable clauses
                        ((arbConstant? pat)
                         (if (constant? exp)
                             (extendDect pat exp dict)
                             'failed))
                        ((arbVariable? pat)
                         (if (variable? exp)
                             (extendDict pat exp dict)
                             'failed))
                        ((arbExp? pat)
                         (extendDict pat exp dict))
                        ;; other
                        ((atom? exp) 'failed)
                        (else
                         (match (cdr pat)
                           (cdr exp)
                           (match (car pat)
                             (car exp)
                             dict))))))
         
         (var dervRules 
              '( ( (dd (?c c) (? v))  0)
                 ( (dd (?v v) (? v))  1)
                 ( (dd (?v d) (? v))  0)
                 
                 ( (dd (+ (? x1) (? x2)) (? v))
                   (+ (dd (: x1) (: v))
                      (dd (: x2) (: v))))
                 
                 ( (dd (* (? x1) (? x2)) (? v))
                   (+ (* (: x1) (dd (: x2) (: v)))
                      (* (dd (*: x1) (: v)) (: x2))) ) ))
                   
                   
         
         (var pattern '(+ (* (?x) (?y)) (?y)))
         (var pattern2 '(+ (* (3) (x)) (x)))
         
         null
         
         ))


(var simplificationFunction
     (fn () 
         (var simplifier 
              (fn (rules)
                  (var emptyDictionary (fn () '()))
                  (var extendDictionary (fn (pat dat dict)
                                            (let ((name (variableName pat)))
                                              (let ((v (assq name dict)))
                                                (cond ((null? v)
                                                       (cons (list name dat) dict))
                                                      ((eq? (cadr v) dat) dict)
                                                      (else 'failed))))))
                  (var lookup (fn (var dict) 
                                  (let ((v (assq var dict)))
                                    (if (null? v) var (cadr v)))))
                             
                  (var simplifyExp (fn (exp)
                                       (tryRules (if (compound? exp)
                                                     (simplifyParts exp)
                                                     exp))))
                  (var simplifyParts (fn (exp)
                                         (if (null? exp))
                                         '()
                                         (cons (simplifyExp (car exp))
                                               (simplifyParts (cdr exp)))))
                  (var tryRules (fn (exp)
                                    (var scan (fn (rules)
                                                  (if (null? rules)
                                                      exp
                                                      (let ((dict 
                                                             (match (pattern (car rule))
                                                               exp
                                                               (emptyDictionary))))
                                                        (if (eq? dict 'failed)
                                                            (scan (cdr rules))
                                                            (simplifyExp
                                                             (instantiate
                                                                 (skeleton (car rules))
                                                               dict)))))))
                                    (scan rules)))
                  simplifyExp))
         null)
     )

(var main 
     (fn ()          
         (symbolicDerivative)
         (symbolicDerivative2)
         null))

(main)