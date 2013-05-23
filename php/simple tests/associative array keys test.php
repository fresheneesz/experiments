<?php

$x = array();

$x["junk"] = 3;

$x["ass"] = 990;

$x[0] = "mooose";

print_r(array_keys($x));




$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
