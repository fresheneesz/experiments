<?php	// takes inputs "path" and "file"
		//http://fresheneesz.110mb.com/php%20create%20folders%20and%20files.php?path=monkey&file=harshFILE

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
