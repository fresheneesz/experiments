<?php
// php library for sending data to other php programs
// must require_once() this

require_once("neccessaryFunctions.php");

// Supposed to post the data to and go to the URL
// For some reason, it is not redirecting
// url must be a full path
/*	-- NOT WORKING
function postAndGo($url, $data)
{	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);	// goes to the page
	
	curl_exec($ch);
	curl_close($ch);
}
*/

// url must be a full path
function postAndReturn($url, $data=array())
{	$url = urlSpaces($url);
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	
	curl_setopt($ch, CURLOPT_HEADER, 0);  			// Don't return http header information
	curl_setopt($ch, CURLOPT_RETURNTRANSFER ,1);	// makes curl_exec return the page
	
	//curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);	// goes to the page
	
	$result = curl_exec($ch);
	curl_close($ch);
	
	return $result;
}

?>
