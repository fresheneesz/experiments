<?php

$theA = array("key" => "value", "bum" => "crap", "nuts" => 5);

print_r($theA);echo "\n";

foreach($theA as $k => $v)
{	$k .= "ADDSUCKA";
	$v .= "_red_panda";
}

print_r($theA);echo "\n";	// WELL THEN, it doesn't change

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);




?>
