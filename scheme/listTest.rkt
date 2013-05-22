#lang scheme
(require "necessaryFunctions.rkt")


; list moved to necessaryFunctions
(comment (var list (fn elements
     (var getElement (fn (element aList) 
                         (cond ((and (= element 0) (pair? aList))
                                (car aList))
                               ((pair? aList)
                                (getElement (- element 1) (cdr aList)))
                               (else 
                                (raise "failure")))))
     (var countElements (fn (aList) 
                         (cond
                           ((pair? aList)
                            (+ 1 (countElements (cdr aList))))
                          (else
                            0))))
     (fn (member . parameters)
         (cond 
           ((string=? member ">")
            (getElement (car parameters) elements))
           ((string=? member "len")
            (countElements elements))
           (else (raise "failure")))))))
                               
(wout "ok\n")
(var x (list 1 2 3 4))
(wout (x ">" 2) "\n")
(wout (x "len") "\n")
;(wout (x "cat") (1 2 3))

