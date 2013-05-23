// php library for creating and accessing an array/matrix like database
// must require() this
<?php

class Foo
{	var $tablePath;
	
	// opens a table for access
	function open($pathName)
	{	$tablePath = $pathName;
	}
	
	// creates and opens a table
	// $pathName is the path and name of a folder/table
	// $fields is an array of field names
	// a table consists of a folder at the $pathName, 
	//  and in the folder are files each named after an element of the $fields array
	// returns 1 on error, 0 on success
	function create($pathName, $fields, $permissions)
	{	if(!file_exists($pathName))
		{	if(mkdir($pathName, $permissions))
			{	$fh = fopen($pathName . 'phpDataBaseFields_file', 'w');
				foreach ($fields as $aField)
				{	
				}
			}
			else 
			{	return 1;
			}
		}
		else
		{	echo 'Error: table/folder already exists.<br>';
			return 1;
		}
	}
	
	
	
	// appends the row $dataArr onto the table
	// $dataArr must have exactly as many elements as the table has fields (columns)
	function append($dataArr)
	{	
	}
	
	// returns the data in that particular cell
	function read($field, $cellNumber)
	{	
	}
}





if(isset($_GET["path"]))
{	echo "OK!" . $_GET["path"] . '<p>';	
}
else 
{	echo "Crapca!";	
	exit;
}

if(!file_exists($_GET["path"]))
{	if(mkdir($_GET["path"], 0777))
	{	echo 'Folder ' . $_GET["path"] . '/' . $_GET["file"] . ' created.';
	}
	else 
	{	echo 'Error creating ' . $_GET["path"] . '/' . $_GET["file"];
	}
}

$fh = fopen($_GET["path"] . '/' . $_GET["file"], 'w');

fclose($fh);



?>
