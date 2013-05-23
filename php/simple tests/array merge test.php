<?php

$first = array('doh', 'ray', 'me', 'do');
$second = array('fah', 'soh', 'lah', 'te', 'do');

echo "Union: ", var_export($first + $second, true), "\n";
echo "Merge: ", var_export(array_merge($first, $second), true), "\n";

echo "Union2: ", $first + $second, "\n";
echo "Merge2: ", array_merge($first, $second), "\n";

// array_push returns int, not an array:
array_push($first, $second);
echo "Push: ", var_export($first, true), "\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
