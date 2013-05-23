<?php

	class a
	{	public $a;
		public static $b;
		private $c;
		
		function __get($x)
		{	print_r($x);
		}
		
		function run()
		{	echo "\nwhatever\n";
		}
	}
	
	$a = new a();
	
	$a->a = 4;
	echo $a->a;
	
	$a->save;
	
	$a->run;
	
	$a->c;
	
	$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
?>
