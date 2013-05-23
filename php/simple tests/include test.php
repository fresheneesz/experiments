<?php
	include("folder/include test include.php");
	
	echo "\n".dirname(__FILE__);
	
		$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
?>
