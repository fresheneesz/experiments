<?php
/*
class moose
{	public $junk, $new;

	function new()
	{	echo "MOOOOST";
	}
}

$moose = new moose();

$moose->new = 4;
$moose->new();
*/
echo "WHAT: ".rawurlencode("hello!@#$%^&*()\\");

$junk = "WHIOFWIEHOEF";
$junk2 = str_split($junk);
foreach($junk2 as $c)
{	echo "Whoo: $c and ";
	if($c < 'I')
	{	echo "YES\n";
	}
	else
	{	echo "NO\n";
	}
}


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
?>
