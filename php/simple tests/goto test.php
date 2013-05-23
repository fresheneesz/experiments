<?php

$blah = "y";

goto y;

x:
	
echo "fsk";
	
y:
echo "shit";

while(1)
{	echo "\ncrap";
	goto z;
}

z:

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

$crap = "test";

gohere:
	echo "crap is: ".$crap."\n";
	
switch($crap)
{case "test":
	$crap = "a"; goto gohere;
 case "a":	$crap = "mooga"; goto gohere;
 case "b":
 default:
}
echo "end";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
