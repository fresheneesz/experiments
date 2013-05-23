<?php

$debug = TRUE;
echo "\n";

ini_set("display_errors","2");
ERROR_REPORTING(E_ALL);




$user="root";
$password="";
$database="garbo";

$mysqli = new mysqli("localhost",$user,$password,$database);
if(mysqli_connect_error()) 
{	echo 'Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error();
	exit;
}

$r = sql($mysqli, 
'	Drop TABLE test;
');
$r = sql($mysqli, 
'	set ndb_table_temporary=1;
');


$r = sql($mysqli, 
'	CREATE TABLE test ENGINE=AWIOEJFIOWEJF
	SELECT * FROM boo;
');

$r = sql($mysqli, 
'	set ndb_table_temporary=0;
');

$r = sql($mysqli, 
'	SELECT * FROM test;
');

print_r($r);
echo "\n";
$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
exit;



function sqlquery($mysqli, $query)
{	global $debug;
	
	$result = $mysqli->query($query);
	if($debug==TRUE && FALSE == $result)
	{	echo "The error is: " . $mysqli->error . "<br/>";
	}
	
	return $result;
}

function sqlmultiquery($mysqli, $query)
{	global $debug;
	
	$result = $mysqli->multi_query($query);
	if($debug==TRUE && FALSE == $result)
	{	echo "The error is: " . $mysqli->error . "<br/>";
	}
	
	return $result;
}

function exists($mysqli, $objectName)
{	$results = sqlquery($mysqli 
	,	'SELECT * FROM '.$objectName
	);
	if($results==FALSE)
	{	echo $objectName." exists false<br/>\n";
		return FALSE;
	}
	else
	{	echo $objectName." exists true<br/>\n";
		return TRUE;
	}
}

function sql($con, $query)
{	/* execute multi query */
	$resultSet = array();
	if($con->multi_query($query))
	{	do	/* store first result set */
		{	if($result = $con->store_result())
			{	$results = array();
				while($row = $result->fetch_row())
				{	$results[] = $row;
				}
				$result->free();
				$resultSet[] = $results;
			}else
			{	$resultSet[] = array();
			}
			
			if($con->errno)
			{	echo $con->errno."\n";
			}
		}while($con->next_result());
		
	
	}	
	
		if($con->errno)
		{	echo "error: '".$con->errno." ".$con->error."'\n";
		}
		
	return $resultSet;
}



?>
