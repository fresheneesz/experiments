<?php
	require_once("postFunctions.php");

	echo "death yall: " . fullURL() . "<br>\n";
	echo postAndReturn(fullPath() . "postTestThing.php");
?>
