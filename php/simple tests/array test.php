<?php

//$y = array();
$y = array_pad(array(), 10, 0);
print_r($y);

//$x = array();
$x[]=3;
$x[]=4;

$x[5]=5;

print_r($x);

echo "What?: ". $x[-1]."<br/>\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
