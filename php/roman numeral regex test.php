<?php

function romanNumeralToInt($romanNumeral)
{	preg_match	// /^(M?M?M?)((CM)|(CD)|((D?)(C?C?C?)))((XC)|(XL)|((L?)(X?X?X?)))((IX)|(IV)|((V?)(I?I?I?)))$/
	(	'/^(M?M?M?)'
		.'((CM)|(CD)|((D?)(C?C?C?)))'
		.'((XC)|(XL)|((L?)(X?X?X?)))'
		.'((IX)|(IV)|((V?)(I?I?I?)))$/', $romanNumeral, $match);
	print_r($match);
	
	$result=0;
	$result += 1000*strlen($match[1]);
	if(strlen($match[3]) != 0){$result += 900;}
	if(strlen($match[4]) != 0){$result += 400;}
	if(strlen($match[5]) != 0)
	{	$result += 100*strlen($match[7]) + 500*strlen($match[6]);
	}
	if(strlen($match[9]) != 0){$result += 90;}
	if(strlen($match[10]) != 0){$result += 40;}
	if(strlen($match[11]) != 0)
	{	$result += 10*strlen($match[13]) + 50*strlen($match[12]);
	}
	if(strlen($match[15]) != 0){$result += 9;}
	if(strlen($match[16]) != 0){$result += 4;}
	if(strlen($match[17]) != 0)
	{	$result += 1*strlen($match[19]) + 5*strlen($match[18]);
	}
	
	return $result;
}
	
	echo romanNumeralToInt("CMXL");

?>

