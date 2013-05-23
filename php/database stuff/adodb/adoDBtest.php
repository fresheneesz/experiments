<?php
include("adodb5/adodb.inc.php");

$db = NewADOConnection('mysql');
//$db->optionFlags [ "CLIENT_MULTI_RESULTS"] = array (/* CLIENT_MULTI_RESULTS */ 0x20000, 1);

$db->Connect("localhost", "root", "", "garboNonExistant");
$result = $db->Execute("SELECT * FROM objwithprimitives");

if ($result === false) 
{	echo "AHH\n";
} else
{	echo "here\n";
	while (!$result->EOF) 
	{	for($i=0, $max=$result->FieldCount(); $i < $max; $i++)
		{	print $result->fields[$i].' ';
		}
		$result->MoveNext();
		print "<br>\n";
	} 
}

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

?>
