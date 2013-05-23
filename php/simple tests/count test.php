<?php

$a = 0;
$b = array();

echo "For some stupid reason, 0 has a count of: ".count($a)."\n";
echo "While array() has a count of: ".count($b);

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
