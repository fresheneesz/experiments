<?php

function runfunc($input)
{	return $input();
}

runfunc(function()
{	echo "hello";
	return array(1,2,3);
});

/* wont' work
function()
{	echo "testing";
}();
*/

$functionVariable = function()
{	echo "testing";
};

print_r($functionVariable);

$functionVariable();


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
