<?php
	$a = "boomshacklacka";
	
	//print_r(explode("lacka",$a));
	
	echo $a[3];
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
?>
