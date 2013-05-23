<?php

class test
{	private $methods = array();
	private $something = "I dudits!";
	
	function addMethod($name, $function)
	{	$this->methods[$name] = $function;
	}
	
	function __call($name, $args)
	{	$method = $this->methods[$name];
		
		return $method($args);
	}
}

$x = new test();

$x->addMethod("a", function()
{	return "Hello";
});

$x->addMethod("b", function()
{	return $this->something;
});

echo $x->a();

echo $x->b();

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
