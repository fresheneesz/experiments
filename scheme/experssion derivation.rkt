#lang scheme
(require "necessaryFunctions.rkt")

(var derviativeApproximation 
     (fn ()
         (var derive (fn (f)
                         (var dx .000001)
                         (fn (x)
                             (/ (- (f (+ x dx))
                                   (f x))
                                dx))))
         
         (var derivativeOfX*5 
              (derive 
               (fn (x) 
                   (* x 5))))

         (wout (derivativeOfX*5 1) "\n")))


(var atom? (fn (x) (not (pair? x))))

(var symbolicDerivative
     (fn ()
         
         (var constant? (fn (exp v)
                            (and (atom? exp)
                                 (not (eq? exp v)))))
         (var sameVar? (fn (exp v) 
                           (and (atom? exp)
                                (eq? exp v))))
         (var sum? (fn (exp)
                       (and (not (atom? exp))
                            (eq? (car exp) '+))))
         (var makeSum (fn (a1 a2)
                          (cond ((and (number? a1) (number? a2))
                                 (+ a1 a2))
                                ((and (number? a1) (= a1 0))
                                 a2)
                                ((and (number? a2) (= a2 0))
                                 a1)
                                (else (list '+ a1 a2)))))
         ;(var makeSum (fn (a1 a2) (list '+ a1 a2)))
         
         (var a1 cadr)
         (var a2 caddr)
         
         
         (var deriv (fn (exp v)
                        (cond ((constant? exp v) 0)
                              ((sameVar? exp v) 1)
                              ((sum? exp) (makeSum (deriv (a1 exp) v)
                                                   (deriv (a2 exp) v)))
                              ((product? exp) (makeSum (makeProduct (a1 exp)
                                                                    (deriv (a2 exp) v))
                                                       (makeProduct (deriv (a1 exp) v) 
                                                                    (a2 exp)))))))
         
         (var product? (fn (exp)
                           (and (not (atom? exp))
                                (eq? (car exp) '*))))
         
         (var makeProduct (fn (a1 a2)
                              (cond ((and (number? a1) (number? a2))
                                     (+ a1 a2))
                                    ((and (number? a1) (= a1 1))
                                     a2)
                                    ((and (number? a2) (= a2 1))
                                     a1)
                                    ((and (number? a1) (= a1 0))
                                     0)
                                    ((and (number? a2) (= a2 0))
                                     0)
                                    (else (list '+ a1 a2)))))
         ;(var makeProduct (fn (m1 m2) (list '* m1 m2)))
         
         
         (var foo '(+ (* a (* x x)) 
                      (+ (* b x)                     
                         c)))
         
         (wout (deriv foo 'x) "\n")
         (wout (deriv foo 'a) "\n")
         (wout (deriv foo 'b) "\n")
         (wout (deriv foo 'c) "\n")))

(var symbolicDerivative2
     (fn ()
         
         
         null
         
         ))



(var main 
     (fn ()          
         (derviativeApproximation)
         (symbolicDerivative)
         (symbolicDerivative2)
         null))

(main)