<?php

function test($x) {
	$x[0] = 5;	
}


$x = array(1,2,3);

test($x);

echo $x[0];


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);