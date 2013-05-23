<?php


// redeclaring visibility
/*
class x1 {
	protected $x = 5;	
	function printx() {
		echo $x;	
	}
}
class x2 extends x1{
	private $x;
}

$anx = new x2();
$anx->printx();
echo $anx->x;
*/

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);


class aParent
{	function aParent()
	{	echo "yo\n";
	}
}

class aChild extends aParent
{	function aChild()
	{	echo "hi i'm a child\n";
		parent::__construct();
	}
}



$x = new aChild();
$fp = fopen('php://stdin', 'r');
fgets($fp, 2);


function get_defined_class_methods($className)
{	$reflect = new ReflectionClass($className);
	$methods = $reflect->getMethods();
	$classOnlyMethods = array();
	foreach($methods as $m)
	{	if ($m->getDeclaringClass()->name == $className) 
		{	$classOnlyMethods[] = $m->name;
		}
	}
	return $classOnlyMethods;
}

function changeClass(&$obj, $newClass)
{	var_dump(serialize($obj));
	
	$thing = preg_replace		// change object into type $new_class
	(	"/^O:[0-9]+:\"[^\"]+\":/i", 
		"O:".strlen($newClass).":\"".$newClass."\":", 
		serialize($obj)
	);
	
	//return unserialize(preg_replace('/^O:\d+:"[^"]++"/', 'O:' . strlen($class) . ':"' . $class . '"', serialize($object)));
	
	var_dump($thing);
	$obj = unserialize($thing);
}

function classCast_callMethod(&$obj, $newClass, $methodName, $methodArgs=array())
{	$oldClass = get_class($obj);
	changeClass($obj, $newClass);
	$result = call_user_func_array(array($obj, $methodName), $methodArgs);	// get result of method call
	changeClass($obj, $oldClass);	// change back
	return $result;
}

class A
{	public $red;

	const crap=3;

	function A()
	{	echo "A's contrusctor called\n";
	}
	function nugget()
	{	echo "moose\n";
		$this->red = 4;
	}
	static function ARS()
	{
	}
}
class B extends A
{	public $shite;
	function B()
	{	echo "B's contrusctor called\n";
	}
}
class Ccc extends B
{	public $shite1;
	function C()
	{	echo "C's contrusctor called\n";
	}
	
	function sclass()
	{	echo "raindrops";
	}
	static function ARS()
	{
	}
	function nugget()
	{	echo "moose TOO \n";
		$this->red="Two";
	}
}


echo "Your mom ".A::crap."\n";

$x = new Ccc();
classCast_callMethod($x,"A", "nugget");
echo $x->red;
exit;
$x->sclass();

$r = get_defined_class_methods('A');//get_class_methods("A");
$r2 = get_defined_class_methods('B');//get_class_methods("B");
$r3 = get_defined_class_methods('C');//get_class_methods("C");
var_dump($r);
var_dump($r2);
var_dump($r3);

//var_dump( get_class_methods($x));

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

//$x = new oject();
$x->y = "moose\n";
print_r($x);

//$x::z = create_function('', 'echo "wow this works!\n";');

//$x::z();

class sqoolObj
{	public $members, $junk;
	static $moose=1, $muddle=2, $mask=3;

	function newObj($className, $objectName)
	{	echo "junk chack\n";
	
		return $this;
	}
	
	function getObj($objectName)
	{	echo "one chack\n";
	
		return $this;
	}

	function set($memberName, $value)
	{
	}
	
	function get($memberName)
	{
	}
	
	function app($memberName, $value)	// append a value to a list
	{
	}
	
	function memberNames()
	{	return sqoolObj::$muddle;
	}
};

$blem = "sqoolObj";

$redfo = new $blem;
//$redfo->getObj("barf");

/* OK so nested classes don't work
class outer
{	class inner
	{	public $x;
	}
	public $ars
	
	
	function outer()
	{	$ars = new inner();
	}
}

$dark = new outer;
*/

$moose = new sqoolObj();

$moose->members = 5;
echo $moose->members;echo "\n";
$moose->junk = 6;
echo $moose->junk;echo "\n";
$moose->get("num");

$red = $moose;
$red->junk = 7;
echo $moose->junk;echo "\n";

echo "  " . sqoolObj::memberNames();

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
