<?php

class test
{	const x = 5;

	function createConst($x)
	{	
	}	
}

echo test::x;


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
