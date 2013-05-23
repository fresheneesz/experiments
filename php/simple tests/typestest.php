<?php

$x = 2000111000111;
var_dump($x);

var_dump((int)$x);
var_dump(intval($x));

var_dump((float)$x);

$y = "2000111000111";

var_dump($y);

var_dump($y+0);


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
