<?php


	$x = 4;
	
	echo "moo"*$x;
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
	
	class a 
	{	function go()
		{	return 0;
		}
	}
	
	$x = "hello";
	$y = new a();
	$n0 = 0;
	
	while($x[$n0] !=0 && $x[$n0]==$y[$n0])	// string
	{	$n0+=1;
	}
	
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
	
	
	$filename=getline();
	echo("GOT: ".$filename);
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
	
	
?>
