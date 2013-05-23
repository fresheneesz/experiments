<?php

class A {
	function __get($name) {
		return "a";
	}
}

class B extends A {
	function __get($name) {
		return 'test';
	}
}

$b = new B();

echo $b->a;

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);