<?php

function bobo()
{	echo "\ncalled bobo\n";
}

class yobio
{	function yobio()
	{	
		$a = "bobo";$a();
		$this->call_function_ref("yobio::jank", array());//call_user_func("yobio::jank", array());
		$this->call_function_ref("self::jank", array());//call_user_func(self::"jank", array());
		//$function = create_function("", "return self::jank();");
		//$function();
		
		$this->call_function_ref("yobio::awef", array());//call_user_func("yobio::awef", array());
		$this->call_function_ref("self::awef", array());//call_user_func("self::awef", array());
		
		
		//call_user_func($this->, array());
		//$function = create_function('$obj', 'return $obj->treeee();');
		//$function($this);
		$this->call_function_ref('$this->treeee', array());//call_user_func('$this->treeee', array());
	}
	
	public static function gcmoo()
	{	echo get_class();
		exit;
		
	}
	
	public static function jank()
	{	echo "\ncalled jank\n";
	}
	private static function awef()
	{	echo "\ncalled awef\n";
	}
	public function treeee()
	{	echo "\ncalled treeee\n";
	}
	private function moo()
	{	echo "\ncalled moo\n";
	}
	
	// calls function references, even if they start with 'self::' or '$this->'
	// $params should be an array of parameters to pass into $function
	private function call_function_ref($function, $params)
	{	if('$this->' == substr($function, 0, 7))
		{	return call_user_func_array(array($this, substr($function, 7)), $params);
		}else if('self::' == substr($function, 0, 6))
		{	return call_user_func_array(get_class()."::".substr($function, 6), $params);
		}else
		{	return call_user_func_array($function, $params);
		}
	}
}

//yobio::gcmoo();

//$a = "bobo";$a();
//call_user_func("yobio::jank", array());

//$b = "jank";$b2="yobio";$b2::$b();
//call_user_func("yobio::awef", array());
//$c = "yobio::awef";$c();
//$d = "yobio::treeee";$d();

new yobio();


//$e = "bobo";$e();


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
