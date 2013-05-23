<?php
foreach(PDO::getAvailableDrivers() as $driver)
{	echo $driver."<br>\n";
}

try
{	$db = new PDO("mysql:dbname=garbo;host=localhost", "root", "" );
	echo "PDO connection object created<br>\n";
}
catch(PDOException $e)
{	echo $e->getMessage();
}
    
$r = $db->query ("SHOW TABLES;SHOW TABLES;");

print_r($r);

foreach($r as $wtf)
{	print_r($wtf);
}


$fp = fopen('php://stdin', 'r');
fgets($fp, 2);
?>
