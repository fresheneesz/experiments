<?php


$garbo = array(1,2,3);

for($n=0; $n<count($garbo); $n++)
//foreach($garbo as $x)
{	$x = &$garbo[$n];
	if($x == 2)
	{	$garbo = array(1,2,3,4);
	}
	echo $x;
	$x = 'a';
}

print_r($garbo);

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
