<?php

function errorHandler($errno, $errstr, $errfile, $errline)
{	throw new Exception($errstr, $errno);
}
set_error_handler('errorHandler');

try
{	$x = $testWarning;
}catch(Exception $e)
{	echo $e;
}

try
{
	$x = MOBIBOIOB;
}catch(Exception $e)
{	echo $e;
}

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
