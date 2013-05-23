<?php

$x = array();

$x["moose"] = 5;
$x[30] = 89;
$x[] = 6;

echo "dun: ";print_r($x);




$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
