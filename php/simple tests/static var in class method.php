<?php


class X
{	function crap()
	{	static $a = "good";
		echo $a;
		$a = "crap";
	}
};

$y = new X();
$g = new X();

$y->crap();
$g->crap();



$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
