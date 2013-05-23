<?php

	class phpPointer
	{	public $value = null;
		
		function phpPointer(&$a)
		{	$this->setPointer($a);
		}
	
		function getValue()
		{	return $this->value;
		}
		function setPointer(&$a)
		{	$this->value = &$a;
		}
		function setValue($a)
		{	if($this->value !== null)
			{	throw new Exception("Dereferencing null pointer.");
			}
			
			$this->value = $a;
		}
	}
	
	
	
	$x = 5;
	$y = new phpPointer($x);

	var_dump($y);
	var_dump($x);
	echo "\n";
	
	$x = "moo".$x;
	
	var_dump($y);
	var_dump($x);
	echo "\n";
	
	$x = array();
	
	var_dump($y);
	var_dump($x);
	echo "\n";
	
	$y->value[0] = 'hi';
	
	var_dump($y);
	var_dump($x);
	echo "\n";
	
	/* throws NPE
	$y->setValue(89);
	
	var_dump($y);
	echo "\n";
	var_dump($x);
	echo "\n";
	*/
	
	


	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);



	$b = array();
	
	var_dump($b);
	$x = &$b["fart"];
	var_dump($x);
	var_dump($b);
	var_dump(isset($b["fart"]));
	$x = "shirt";
	var_dump($x);
	var_dump($b);
	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
	
	class ok
	{	public $var;
		
		function &no()
		{	$this->var = 34;
			return $this->var;
		}
		
		function ch()
		{	$this->var = 40;
		}
	}
	
	
	$a = new ok();
	$r = &$a->no();
	print_r($r);
	$a->ch();
	print_r($r);
	
	
	
	/*$bumsac = 34;
	echo $bumsac."\n";
	lump(&$bumsac);
	echo $bumsac."\n";
	
	function lump(&$a)
	{	$a = 5;
	}
	
	// function pointers
	
	function jizberries()
	{	echo "\nNUTS";
	}
	
	function printcrap($a)
	{	$a();
	}
	
	//printcrap(function(){ echo "junk";});
	*/
	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

	echo "\narray test:\n";

	// this is retarded of php's designers:
		
	$a = array(1);
	//$c = $a; 		//not an assignment-by-reference! Since it is assigned before the reference, changing this wouldn't cause $a or $c to change
	$b =& $a[0]; 	//$b and $arr[0] are in the same reference set
	//$b =& $a;		// resetting b here will save $a and $b from changing
	$c = $a; 		//not an assignment-by-reference! But changing this causes $a and $c to change
	//$b =& $a;		// resetting b here will *not* save $a and $b from changing
	$c[0]=2;	
	echo "\nHere:\n";
	var_dump($a);
	var_dump($b);
	var_dump($c);
	
	
	// more array ref stuff
	
	$x = array('moo'=>5);
	//$wtf &= $x['nope'];
	var_dump($x);
	

	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);


	echo "\nnother test:\n";

	$x = array(1,2,3);
	$y = &$x;
	
	$x[2] = "ok now";
	
	print_r($x);
	print_r($y);


	echo "\neven more  test:\n";

	
	$save = null;
	function &testPointerReturn(){
		global $save;
		
		$save = array();
		return $save;
	};
	
	$x = &testPointerReturn();
	$x[0] = 'hi';
	var_dump($save);
	/*$result = &testPointerReturn();
	var_dump($result);
	var_dump($save);
	
	$save[0] = 1;
	var_dump($result);
	var_dump($save);
	*/

	$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

















