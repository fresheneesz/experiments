#lang scheme

(provide macro)

(provide var)
(provide fn)
(provide comment)

(provide wout)
(provide list)

(define-syntax macro
    (syntax-rules ()
      ((_ (name arg ...) body ...)
       (define-syntax name (syntax-rules () ((name arg ...) (begin body ...)))))))

;(defineSimpleSyntax (macro symbolA symbolB) 
;  (defineSimpleSyntax (symbolA value ...) (symbolB value ...)))

(macro (var value ...) (define value ...))
(macro (fn value ...) (lambda value ...))
(macro (comment value ...) null)

(var wout (fn parts
     (for-each (fn (part) (display part)) parts)))

;(var oldListConstructor list)
(var list (fn elementsIn
              (var elements elementsIn)
              (var getElement (fn (element aList) 
                                  (cond ((and (= element 0) (pair? aList))
                                         (car aList))
                                        ((pair? aList)
                                         (getElement (- element 1) (cdr aList)))
                                        (else 
                                         (raise "failure")))))
              
              (fn (member . parameters)
                  (cond 
                    ((and (string=? member ">") (= (length parameters) 1))
                     (getElement (car parameters) elements))
                    ((and (string=? member ">") (= (length parameters) 2))
                     (getElement (car parameters) elements))
                    ((string=? member "set") (list 98 76))
                    ((string=? member "len") (length elements))
                    ((string=? member "cat") (append elements parameters ))
                    (else (raise "failure"))))))
