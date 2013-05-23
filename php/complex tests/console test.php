<?php

$x=0;

echo "argc is: ".$argc."\n";

for($n=1; $n<$argc; $n++)
{	echo $argv[$n]."\n";
}

if($x==5)
{	echo "moo\n";
}
else
{	echo "shoowem\n";
}

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
