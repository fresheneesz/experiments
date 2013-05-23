<?php

$object = new ArrayObject();
$object[] = "Hello World!";

$array = (array) $object;
var_dump($array);

class A extends ArrayObject {
	function __construct() {
		$args = func_get_args();
		parent::__construct($args);	
	}
	
	function toArray() {
		return (array)$this;
	}	
	
	function count() {
		echo "stop counting me! It hurts!";	
		return parent::count();
	}
	
	function offsetGet($index) {
		echo "yeah, $index, what of it";
		return parent::offsetGet($index);
	}
	
	// can't do this or php will yell at me for making a public method private
	/*private function getArrayCopy() {
		
	}*/
}

$x = new A(1, 2, 3, 4);
$x[] = 5;

$x[0] = 5;

foreach($x as $k => $v) {
	echo $k.'=>'.$v."\n";
}

echo count($x)."\n";

echo "keys: ";var_dump(array_keys($x->toArray()));echo "\n";

var_dump($x);

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

$x = new A(23);

$y = $x[0];

$z = $x->getArrayCopy();
//$z = $x;
$z[0] = 1;
var_dump($x);
var_dump($z);
