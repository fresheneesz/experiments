<?php
	$a = 0;

	function test1()
	{	echo "Test1\n";
		return true;
	}
	function test2()
	{	echo "Test2\n";
		return true;
	}
	
	if(test1() || test2())
	{	echo "done";
	}

?>
