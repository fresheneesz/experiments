<?php

	$one->a = "boom";
	$one->b = "arf";
	$member = "a";
	
	echo "here it is: " . $one->$member . "\n";



	$moose->jank = 4;
	$moose->barf = 3;
	$moose->mank->shoo = "elbo";
	$moose->mank->what = "ok";

	//$mems = get_object_vars($moose);
	//$mems = get_class_vars($moose);
	//$mems = array_keys($moose);
	//$keys = array_keys($mems);
	//$num = count($keys);
	//echo "num: ".$num."\n";
	//print_r($mems);
	
//	for($n=0; $n<$num; $n++)
	//{	echo $n."a: ".$mems[$keys[$n]]."\n";
	//}
	/*foreach($moose as $key => $value)
	{	echo '$moose[';
		echo $key;
		echo "]: ";
		echo $value;
		echo "\n";
	}*/
	
	
	echo  "tyuep: ".gettype($moose)."\n\n";
	
	prettyTree("Whatever", $moose);
	
	
	
	
	
	function prettyTree($caption, $variable)		// prints a variable with arrays and objects in it, in tree form
	{	echo $caption.": <br>\n" . buildTree("", $variable, 0) . "<br>\n<br>\n";
	}
	
	function strMult($c, $num)	//  copies a character or string on itself a number of times
	{	$result = "";
		for($n=0; $n<$num; $n++)
		{	$result .= $c;
		}
		return $result;
	}

	function buildTree($prefix, $var, $indent)			// builds the tree to print
	{	$result = "";
		$tab="    ";
		if("array" == gettype($var))
		{	$keys = array_keys($var);
			$num = count($keys);
			
			$result .= strMult($tab,$indent).$prefix."array<br>\n";
			$result .= strMult($tab,$indent)."{<br>\n";
			for($n=0; $n<$num; $n++)
			{	$result .= buildTree("[$keys[$n]] => ", $var[$keys[$n]], $indent+1) . "<br>\n";
			}
			$result .= strMult($tab,$indent)."}<br>\n";
			return $result;
		}
		else if("object" == gettype($var))
		{	$result .= strMult($tab,$indent).$prefix."object<br>\n";
			$result .= strMult($tab,$indent)."{<br>\n";
			foreach($var as $key => $value)
			{	$result .= buildTree("[$key] => ", $value, $indent+1) . "<br>\n";
			}
			$result .= strMult($tab,$indent)."}<br>\n";
			return $result;
		}
		else
		{	return strMult($tab,$indent).$prefix.$var;
		}
	}
	
	
?>
