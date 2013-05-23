<?php

//*
$user="root";
$password="";
$database="garbo";
$host="localhost";
// */
/*
$user="fresheneesz2";
$password="frenchy";
$database="freshyDB2";
$host="www.freesql.org";
//*/

$pdo 	= new PDO("mysql:dbname=".$database.";host=".$host, $user, $password );
$mysqli = new mysqli($host,$user,$password,$database);
//$mysql 	= mysql_connect("localhost",$user,$password);

$numberOfTimes = 1000;
//$r1 = benchIt("INSERT INTO redfour2 (a, b) VALUES (2, 3)");
$r2 = benchIt("SHOW TABLES");
$r3 = benchIt("SELECT * FROM redfour2 WHERE 5*a > b*a AND a/2 > 3");
//print_r($r1);
print_r($r2);
print_r($r3);




$fp = fopen('php://stdin', 'r');
fgets($fp, 2);

function benchIt($query)
{	$result = array();
	//$result["mysql"] = timeFunction("mysqlQuery", $query);
	//$result["pdo"] = timeFunction("pdoQuery", $query);
	$result["mysqli"] = timeFunction("mysqli_singleQuery", $query);
	$result["mysqli_multi"] = timeFunction("mysqli_multiQuery", $query);
	
	return $result;
}

function timeFunction($func, $query)
{	global $numberOfTimes;
	
	$time0 = microtime();
	$time0 = explode(" ",$time0);
	
	echo $func;
	
	if($func == "mysqli_multiQuery")
	{	$queryToRun = "";
		for($n=0;$n<$numberOfTimes;$n++)
		{	$queryToRun .= $query.";";;
		}
		$r = $func($query);
	}else
	{	for($n=0;$n<$numberOfTimes;$n++)
		{	$r = $func($query);
		}
	}
	
	echo " :";print_r($r);echo "\n";
	
	$timeEnd = microtime();
	$timeEnd = explode(" ",$timeEnd);
	
	return $timeEnd[0] - $time0[0] + $timeEnd[1] - $time0[1];	// time elapsed
}    

function mysqlQuery($query)
{	global $mysql;
	return mysql_query($query, $mysql);
}
function pdoQuery($query)
{	global $pdo;
	return $pdo->query($query);
}
function mysqli_multiQuery($query)
{	global $mysqli;
	return $mysqli->multi_query($query);
}
function mysqli_singleQuery($query)
{	global $mysqli;
	return $mysqli->query($query);
}



?>
