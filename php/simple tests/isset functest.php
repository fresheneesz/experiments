<?php

	function issetAgain($a)
	{	if(isset($a))
		{	echo "moose";
		}
	}
	
	if(isset($a))
	{	echo "moose";
	}
	
	issetAgain($a);

	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
?>
