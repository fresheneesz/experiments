<?php

ob_start();


echo "your mom";

$x = $crap;	// looks like errors aren't handled very well with output buffer


$buffer = ob_get_contents();
ob_end_clean();

echo "buffer contains: '".$buffer."'";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

