<?php


class X {

	function __call($name, $args) {
		echo 'hi';
	}
	static function __callStatic($name, $args) {
		echo 'h0';
	}
}

$x = new X();
$x->r();

X::r();
/*

class A
{	static $a;
	
	static function wtf()
	{	$class = new ReflectionClass(get_called_class());
		echo self::$a." in ".get_called_class()." and ".get_class()." but ".$class->getStaticPropertyValue("a")." in ".get_called_class()." and ".get_class()."\n";
	}
}
class B extends A
{	static $a;	
	static function wtf2()
	{	self::wtf();
	}
	
	function wtf3()
	{	$this->wtf();
	}
}
class C extends B
{	static $a;
}

A::$a = "ok";
B::$a = "ok2";
C::$a = "ok3";

echo "A's a: ".A::$a."\n";
echo "B's a: ".B::$a."\n";
echo "C's a: ".C::$a."\n";
echo "\n"; 

A::wtf();
B::wtf();
C::wtf();

B::wtf2();

$x = new B();
$x->wtf3();
//*/
/*
class X
{	static $p = array();
	static function make($red)
	{	echo get_parent_class()."\n";
		if(false === isset(self::$p[get_class()]))
		{	self::$p[get_class()] = $red;
		}
	}
}

class X2 extends X
{	function X2()
	{	$this->make("bunny");
	}
}
class X3 extends X
{	function X3()
	{	$this->make("pig");
	}
}

$a = new X();
$b = new X2();
$c = new X3();

print_r($a);
print_r($b);
print_r($c);
print_r(X3::$p);\
*/

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
