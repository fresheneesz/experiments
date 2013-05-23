<?php

$arf = 45;

$b = array(&$arf);


$b[0] = 56;

echo $arf."\n";


$a = "BAGLADYMO";
$b = &$a;

$mtime = microtime(); 
$x = strlen($a);
echo microtime() - $mtime;
echo "\n$x\n\n";

$mtime = microtime(); 
$y = strlen($b);
echo microtime() - $mtime;
echo "\n$y\n\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
