#lang scheme
(require "necessaryFunctions.rkt")

(var object (fn keyValuePairs
     (var get (fn (object key) 
                  (cond ((and (= element 0) (pair? aList))
                         (car aList))
                        ((pair? aList)
                         (getElement (- element 1) (cdr aList)))
                        (else 
                         (raise "failure")))))
     (var set (fn (object key value) 
                  (cond
                    ((pair? aList)
                     (+ 1 (countElements (cdr aList))))
                    (else
                     0))))
     (fn (member . parameters)
         (cond 
           ((string=? member ">")
            (get keyValuePairs (car parameters)))
           ((string=? member "len")
            (countElements elements))
           (else (raise "failure"))))))

