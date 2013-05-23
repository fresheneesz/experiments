<?php

try
{	throw new Exception("janks alot");
}
catch(Exception $e)
{	echo $e->getMessage();
}

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
