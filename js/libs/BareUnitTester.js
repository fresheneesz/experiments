
var BareUnitTester = {
	$.rule('.green').append('color: green;');

	var onToggle = function(displayNone, $bgcolor, innerSelector, outerSelector) {
    	if(displayNone == true) {
        	$(innerSelector).css({"display":""});
            if(outerSelector != undefined) {
            	$(outerSelector).css({"border":"1px solid "+$bgcolor});
            }
        } else {
        	$(innerSelector).css({"display":"none"});
            if(outerSelector != undefined) {
            	$(outerSelector).css({"border":""});
            }
        }
    }
    
    
}

<?php

require_once(dirname(__FILE__)."/cept.php");	// exceptions with stack traces
// requires jquery.js


echo '<script type="text/javascript" src="jquery.js"></script>';

echo '<style>
        .green
        {   color: green;
        }
      </style>';

echo '<script type="text/javascript">
        var SqoolUnitTester =
        {   onToggle: function(displayNone, $bgcolor, innerSelector, outerSelector)
            {	if(displayNone == true)
                {	$(innerSelector).css({"display":""});
                    if(outerSelector != undefined)
                    {	$(outerSelector).css({"border":"1px solid "+$bgcolor});
                    }
                }else
                {	$(innerSelector).css({"display":"none"});
                    if(outerSelector != undefined)
                    {	$(outerSelector).css({"border":""});
                    }
                }
            }
        }
    </script>';

class SqoolUTester
{	static private $failures;	
	static private $successes;


	public static function assert($trueThing)
	{	self::assertAtLevel($trueThing, "assert", 1);
	}

	public static function assertAtLevel($trueThing, $methodName, $level)
	{	if(false === $trueThing)
		{	self::$failures += 1;
			$color = "red";
			$word = "Fail";
		}else
		{	self::$successes += 1;
			$color = "green";
			$word = "Success";
		}

		$backTrace = debug_backtrace();
		$lines = self::getFunctionCallLines($backTrace[$level]['file'], $methodName, $backTrace[$level]["line"]);
		$linesDisplay = "'<i>".implode("<br>\n",$lines)."</i>'";
		if(count($lines) > 1)
		{	$linesDisplay = "<br>\n".$linesDisplay;
		}

		if(array_key_exists('class',$backTrace[$level+1])) {
			$class = $backTrace[$level+1]['class'];
		} else {
			$class = '';
		}

		echo '<div><span style="color:'.$color.';">'.$word.':</span> '.$class." :: ".$backTrace[$level+1]["function"].
				" at [".basename($backTrace[$level]["file"])." line ".$backTrace[$level]["line"]."] ".$linesDisplay."</div>";
	}

	public static function expectCept($closure) {
		$cept = null;
	    try {
	    	$closure();
		} catch(Exception $e) {
			$cept = $e;
		}
		self::assertAtLevel($cept !== null, "expectCept", 1);
	}

	public static function run()
	{	$calledClass = get_called_class();
		$temp = new $calledClass();
		return $temp->runInternal();
	}
        
    // attempts to access the member named $member from $object and returns whether or not that access throws an exception
    public function gotCeptFromInvalidAccess($object, $member)
    {	$gotException = false;
        try
        {	$object->$member;
        }catch(cept $e)
        {	$gotException = true;
        }

        return $gotException;
    }

    // calls a method on a class or object (even if its private or protected)
    public static function call($classNameOrObject, $member/*, varargs */)
    {   $arguments = func_get_args();

        if(gettype($classNameOrObject) === "string")
        {   $classOrObject = new ReflectionClass($classNameOrObject);
            $object = null;
        } else if(gettype($classNameOrObject) === "object")
        {   $classOrObject = new ReflectionObject($classNameOrObject);
            $object = $classNameOrObject;
        } else
        {   throw new cept("First argument passed into 'call' is not a class-name string or an object");
        }

        $method = $classOrObject->getMethod($member);
        $method->setAccessible(true);
        return $method->invokeArgs($object, array_slice($arguments, 2));
    }




	private static function plural($num, $plural=false, $singular=false)
	{	$plur = $num != 1;

		if($singular === false)
		{	if($plur)	return "s";
		}
		else
		{	if($plur)	return $plural;
			else		return $singular;
		}
	}

	// gets the visible methods actually defined in a given class
	private static function get_defined_class_methods($className)
	{	if(false == class_exists($className))
		{	throw new cept("There is no defined class named '".$className."'");
		}

		$reflect = new ReflectionClass($className);
		$methods = $reflect->getMethods();
		$classOnlyMethods = array();
		foreach($methods as $m)
		{	if ($m->getDeclaringClass()->name == $className)
			{	$classOnlyMethods[] = $m->name;
			}
		}
		return $classOnlyMethods;
	}

	// gets the line number, class, parent function, file name, and the actual lines of the call
	// this isn't perfect (it'll break in certain cases if the string $functionName appears somewhere in the arguments of the function call)
	private static function getFunctionCallLines($fileName, $functionName, $lineNumber)
	{	$file = file($fileName);

		$lines = array();
		for($n=0; true; $n++)
		{	$lines[] = $file[$lineNumber - 1 - $n];
			if(substr_count($file[$lineNumber - 1 - $n], $functionName) != 0)
			{	return array_reverse($lines);
			}
			if($lineNumber - $n < 0)
			{	return array();	// something went wrong if this is being returned (the functionName wasn't found above - means you didn't get the function name right)
			}
		}
	}

	private function runInternal()
	{	if(get_called_class() === "SqoolUTester")
		{	throw new cept("You need to write a class that extends SqoolUTester to unittest");
		}
		
		$failures = 0;
		$successes = 0;
		$exceptions = 0;
		$testCaseSuccesses=0;

		echo '<h1>'.get_called_class().'</h1>';
	
		$linkStyle = "cursor:pointer;";	
		echo '<div id="unitTest_'.get_called_class().'">';
	
			$functions = self::get_defined_class_methods(get_called_class());
	
			foreach($functions as $n=>$f)
			{	self::$failures = 0;
				self::$successes = 0;
				$exceptionsForThisFunc = 0;
				
				echo '<div id="unitTest_'.get_called_class().$n.'" style="margin:1px;">';
					
					echo '<div id="unitTest_'.get_called_class().$n.'_inner">';
						echo '<h2 class="unitTest_'.get_called_class().$n.'_status" style="'.$linkStyle.'">'.$f.'</h2>';
						try
						{	$this->call_function_ref('$this->'.$f, array(), $this);
						}catch(Exception $e)
						{	echo '<div><span style="color:red;">Exception:</span> '.get_called_class()." :: ".$f."</div>";
							echo $e;
							$exceptionsForThisFunc +=1;
						}
					echo '</div>';
					
					if(self::$failures > 0 || $exceptionsForThisFunc > 0)
					{	$bgcolor="red";
						$show = "true";
					}else
					{	$bgcolor="green";
						$testCaseSuccesses += 1;
						$show = "false";
					}
					echo '<div style="background-color:'.$bgcolor.';color:white;margin:4px 0;padding: 1px 3px;'.$linkStyle.'" class="unitTest_'.get_called_class().$n.'_status">'.
							"<b>".$f."</b>".': &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.
							self::$successes.'/'.(self::$failures+self::$successes)." and ".$exceptionsForThisFunc." exception".self::plural($exceptionsForThisFunc).".".
						'</div>';
					
					echo '<script type="text/javascript">
						$(function()
						{	$("#unitTest_'.get_called_class().'").css({"border-color":"'.$bgcolor.'"});
							SqoolUnitTester.onToggle('.$show.', "'.$bgcolor.'", "#unitTest_'.get_called_class().$n.'_inner", "#unitTest_'.get_called_class().$n.'");
							
							$(".unitTest_'.get_called_class().$n.'_status").click(function()
							{	SqoolUnitTester.onToggle
								(	$("#unitTest_'.get_called_class().$n.'_inner").css("display") == "none", 
									"'.$bgcolor.'",
									"#unitTest_'.get_called_class().$n.'_inner",
									"#unitTest_'.get_called_class().$n.'"
								);
							});
						});
					</script>';
					
				echo '</div>';
				
				$failures += self::$failures;
				$successes += self::$successes;
				$exceptions += $exceptionsForThisFunc;
			}
			
			if($failures > 0 || $exceptions > 0)
			{	$bgcolor="red";
				$show = "true";
			}else
			{	$bgcolor="green";
				$show = "false";
			}
		
		echo '</div>';
		
		echo '<div style="border:2px solid '.$bgcolor.';background-color:white;color:white;margin:4px 0;padding: 1px 3px;'.$linkStyle.'" id="unitTest_'.get_called_class().'_final">'.
				'<div style="background-color:'.$bgcolor.';color:white;margin:4px 0;padding: 1px 3px">'.
					'<div style="float:right;"><i>click on this bar</i></div>'.
					$testCaseSuccesses.'/'.count($functions).' test groups fully successful. '.
					'<b>'.$successes.'</b> pass'.self::plural($successes,"es","").
					', <b>'.$failures.'</b> fail'.self::plural($failures).
					', and <b>'.$exceptions.'</b> exception'.self::plural($exceptions).".".
				'</div>';
			'</div>';
		echo '<script type="text/javascript">
				$(function()
				{	$("#unitTest_'.get_called_class().'").css({"border-color":"'.$bgcolor.'"});
					SqoolUnitTester.onToggle('.$show.', "'.$bgcolor.'", "#unitTest_'.get_called_class().'");
					
					$("#unitTest_'.get_called_class().'_final").click(function()
					{	SqoolUnitTester.onToggle($("#unitTest_'.get_called_class().'").css("display") == "none", "'.$bgcolor.'", "#unitTest_'.get_called_class().'");
					});
				});
				
			</script>';
        echo '</div>';
	}
	// calls function references, even if they start with 'self::' or '$this->'
	// $params should be an array of parameters to pass into $function
	private static function call_function_ref($function, $params, $thisInContext=null)
	{	if('$this->' == substr($function, 0, 7))
		{	return call_user_func_array(array($thisInContext, substr($function, 7)), $params);
		}else if('self::' == substr($function, 0, 6))
		{	return call_user_func_array(get_called_class()."::".substr($function, 6), $params);
		}else
		{	return call_user_func_array($function, $params);
		}
	}
}