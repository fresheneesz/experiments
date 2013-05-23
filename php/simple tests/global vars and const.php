<?php

//define("moose", "../");
$a; $b;

function junk()
{	global $b;
	//echo moose;
	echo $b;
	$b=3;
}

junk();

junk();

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
