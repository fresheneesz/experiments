<?php

$x = microtime(true);

$y = microtime(true);

var_dump($y-$x);


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

echo strtotime("2009-06-16")."\n";
echo strtotime("2009-05-16 11:10:07")."\n";
echo strtotime("11:10:07")."\n";
echo strtotime("10:10:07")."\n";
echo strtotime("ajfiojawaeiowjaofwjif")."\n";

echo strtotime("2009-06-15")."\n";
echo strtotime("2009-06-15 10:34:31")."\n";

echo showRelativeTime(strtotime("2009-05-16"))."\n";
echo showRelativeTime(strtotime("2009-05-16 11:10:07"))."\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);



function plural($num) 
	{	if($num != 1)	return "s";
	}
	
	// dayGranularity can be set true to forgo minutes an hours and just write "Today"
	// $time should be a unix timestamp (you can use strtotime() to get a unix timestamp from a formated string)
	function showRelativeTime($time, $dayGranularity=false)
	{	$diff = time() - $time;
		
		if($dayGranularity==true && -60*60*24 < $diff && $diff < 60*60*24)	return "Today";
		
		if($diff > 0)
		{	//if($diff < 60)			return $diff." second".plural($diff)." ago";
			$diff = intval($diff/60);
			if($diff < 60)			return $diff." minute".plural($diff)." ago";
			$diff = intval($diff/60);
			if($diff < 24)			return $diff." hour".plural($diff)." ago";
			$diff = intval($diff/24);
			if($diff < 7)			return $diff." day".plural($diff)." ago";
			$diff = intval($diff/7);
			if($diff < 4)			return $diff." week".plural($diff)." ago";
			$diff = intval($diff/4);
			if($diff < 12)			return $diff." month".plural($diff)." ago";
			$diff = intval($diff/12);
									return $diff." year".plural($diff)." ago";
		}
		else
		{	$diff = -$diff;
			//if($diff < 60)			return "In ".$diff." second".plural($diff);
			$diff = intval($diff/60);
			if($diff < 60)			return "In ".$diff." minute".plural($diff);
			$diff = intval($diff/60);
			if($diff < 24)			return "In ".$diff." hour".plural($diff);
			$diff = intval($diff/24);
			if($diff < 7)			return "In ".$diff." day".plural($diff);
			$diff = intval($diff/7);
			if($diff < 4)			return "In ".$diff." week".plural($diff);
			$diff = intval($diff/4);
			if($diff < 12)			return "In ".$diff." month".plural($diff);
			$diff = intval($diff/12);
									return "In ".$diff." year".plural($diff);
		}
			
		/*if($dayGranularity==true && -86400 < $t && $t < 86400)	return "Today";
		
		if($t < -120*60*24*7)	return "In ".intval($t / (-120*60*24*7/2))." weeks";
		if($t < -120*60*24)		return "In ".intval($t / (-120*60*24/2))." days";
		if($t < -120*60) 		return "In ".intval($t / (-120*60/2))." hours";
		if($t < -120) 		return "In ".intval($t / -60)." minutes";
		if($t < 0) 			return "In 1 minute";
		if($t < 120) 		return "1 minute ago";
		if($t < 3600) 		return intval($t / 60) ." minutes ago";
		if($t < 86400) 		return intval($t / 3600) ." hours ago";
		else if($t < 86400*7) 	return intval($t / 86400) ." days ago";
		else					return intval($t / 86400 / 7) ." days ago";
		*/
	}

?>
