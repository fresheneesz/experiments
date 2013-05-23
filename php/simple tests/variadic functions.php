<?php

function printsht($in)
{	print_r($in);
}

function checkit() {
    $args = func_get_args();
    printsht(func_get_args());
}

checkit(2, 3, "wufk");



$fp = fopen('php://stdin', 'r');
	fgets($fp, 2);
?>
