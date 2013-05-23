<?php

ini_set("display_errors","2");
ERROR_REPORTING(E_ALL);


$debug = TRUE;

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

echo "\n";

$user="root";
$password="";
$database="garboNonExistant";

$mysqli = new mysqli("localhost",$user,$password,$database);
if(mysqli_connect_error()) 
{	echo 'Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error();
	exit;
}



var_dump($mysqli->real_escape_string("boom%frap"));

sql($mysqli, 
'	INSERT INTO boo SET u_moose="boom%crap";
');

$x = sql($mysqli, 
'	SELECT * FROM boo;
');

print_r($x);
echo "\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
exit;

$r = sql($mysqli, 
'	UPDATE boo SET u_dickweed=u_dickweed+1;
	UPDATE boo SET u_dickweed=u_dickweed+1, megapie=4;
	UPDATE boo SET u_dickweed=u_dickweed+1;
');

print_r($r);
echo "\n";

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
exit;


/*

sqlquery($mysqli, 'DROP TABLE contacts');

sqlquery($mysqli
,	'CREATE TABLE contacts 
	(	id int NOT NULL PRIMARY KEY auto_increment,
		first BOOLEAN NOT NULL,
		last TINYTEXT NOT NULL,
		phone TEXT NOT NULL,
		mobile LONGTEXT NOT NULL,
		fax TINYINT NOT NULL,
		email INT NOT NULL,
		web BIGINT NOT NULL,
		moo FLOAT NOT NULL,
		junk DOUBLE NOT NULL,
		bar VARCHAR(255) NOT NULL
	)'
);
*/

sqlquery($mysqli
,	'INSERT INTO contacts VALUES
	(	"",
		"Ass",
		"Smith",
		"01234 567890",
		"00112 334455",
		"01234 567891",
		"johnsmith@gowansnet.com",
		"http://www.gowansnet.com",
		"http://www.gowansnet.com",
		"http://www.gowansnet.com",
		"http://www.gowansnet.com"
	)'
);

exists($mysqli,"contacts");
exists($mysqli,"Mooseca");

//exit;

//sqlquery
//(	'DELETE FROM contacts WHERE id=7'
//);

/*	key TINYINT(1) NOT NULL, 
		val TINYTEXT, 
		crap INT 
*/

//sqlquery
//(	'CREATE TABLE U_moose1 (U_key BOOLEAN, U_val TINYTEXT, U_crap INT)'
//);
//exit;


$results = sqlquery($mysqli
,	'SHOW COLUMNS FROM contacts'
);

$resultsArray = $results->fetch_assoc();
print_r($resultsArray);
/*for($i=0; $i < $num; $i++) 
{	echo $i."is: " . mysql_result($results, $i) . '<br/>';
}
*/
echo "<br/>\n";

///exit;

sqlmultiquery($mysqli
,	'SELECT first FROM contacts ORDER BY id ASC;'.
	'SELECT last FROM contacts ORDER BY id ASC'
);

$results = $mysqli->use_result();
$resultsArray = $results->fetch_assoc();
print_r($resultsArray);
$results->close();			// must close results before use_result() can be called again

$mysqli->next_result();
$results = $mysqli->use_result();
$resultsArray = $results->fetch_assoc();
print_r($resultsArray);

/*for($i=0; $i < mysql_num_fields($results); $i++)
{	echo "   prtr: ";print_r(mysql_fetch_field($results, $i));echo "<br/>\n";
}*/

exit;

$num=mysql_numrows($results);
for($i=0; $i < $num; $i++) 
{	echo mysql_result($results, $i, "id") . " first: " . mysql_result($results, $i, "bar") . 
						'&nbsp;&nbsp;&nbsp;&nbsp; type is: '.mysql_field_type($results, $i).'<br/>';
}

echo '  type0 is: '.mysql_field_type($results, 0).'<br/>';
echo '  type1 is: '.mysql_field_type($results, 1).'<br/>';
echo '  type2 is: '.mysql_field_type($results, 2).'<br/>';
echo '  type3 is: '.mysql_field_type($results, 3).'<br/>';
echo '  type4 is: '.mysql_field_type($results, 4).'<br/>';
echo '  type5 is: '.mysql_field_type($results, 5).'<br/>';
echo '  type6 is: '.mysql_field_type($results, 6).'<br/>';
echo '  type7 is: '.mysql_field_type($results, 7).'<br/>';
echo '  type8 is: '.mysql_field_type($results, 8).'<br/>';
echo '  type8 is: '.mysql_field_type($results, 9).'<br/>';
echo '  type8 is: '.mysql_field_type($results, 10).'<br/>';

echo "<br/> god <br/> ";
print_r($results);

/*
//	A1 - incriments a field (really all the rows in a column), and stores the value it incrimented it to (probably stores the last incriment it did)
	sqlquery('UPDATE contacts SET id=LAST_INSERT_ID(id+2)');
	//INSERT INTO table (someNonAutoIncrementField) VALUES (LAST_INSERT_ID(42));
	$results = sqlquery('SELECT LAST_INSERT_ID()');
	echo "huh ";
	print_r($results);
	
	$results = mysql_insert_id();
	echo "huh2 ";
	print_r($results);
	echo "We got ".$results."<br/>\n";
	
	//echo "moose ";//.$results."'" . mysql_result($results, 0, "id")."'endmoose<br/>";
	//$someArray = mysql_fetch_assoc($results);
	//print_r($someArray);
// end A1

//exit;
*/


mysql_close();

?>
