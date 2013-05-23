<?php

$debug = TRUE;

function sqlquery($query)
{	global $debug;
	
	$result = mysql_query($query);
	if($debug==TRUE && FALSE == $result)
	{	echo "The error is: " . mysql_error() . "<br/>";
	}
	
	return $result;
}

function exists($objectName)
{	$results = sqlquery
	(	'SELECT * FROM '.$objectName
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

echo 'wtf<br/>';

$user = 'root';//$user="tetrudco_freshen";
$password='';//$password="Frenchy189AoP9&^";
$database='garboNonExistant';//$database="tetrudco_sqltest";

mysql_connect("localhost",$user,$password);
@mysql_select_db($database) or die( "Unable to select database");

$query = 'CREATE PROCEDURE testproc() BEGIN INSERT INTO a set b=8; END';

var_dump(sqlquery($query));


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



echo realpath(".")."<br/>";

sqlquery('DROP TABLE contacts');

echo "right here: ";
sqlquery
(	'CREATE TABLE contacts 
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

echo "endsright here: ";

sqlquery
(	'INSERT INTO contacts VALUES
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

exists("contacts");
exists("Mooseca");

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


$results = sqlquery
(	'SHOW COLUMNS FROM contacts'
);

$num=mysql_numrows($results);
for($i=0; $i < $num; $i++) 
{	echo $i."is: " . mysql_result($results, $i) . '<br/>';
}

echo "<br/>\n";



$results = sqlquery
(	'SELECT * FROM contacts ORDER BY id ASC'
);

for($i=0; $i < mysql_num_fields($results); $i++)
{	echo "   prtr: ";print_r(mysql_fetch_field($results, $i));echo "<br/>\n";
}

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

mysql_close();

