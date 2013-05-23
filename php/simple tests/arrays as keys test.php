<?php
	
	$key1 = array("a","b");
	$key2 = array("c","b");
	$key1b = array("a","b");
	
	$x = array();
	$x[$key1] = "moose";
	$x[$key2] = "moose1";
	$x[$key1b] = "moose2";
	
	var_dump($x);
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
?>
