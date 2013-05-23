// neccessaryFunctions.php
// Created by Billy Tetrud on 12/17/2007
// Copyright 2007 Billy Tetrud. All rights reserved.

<?php
// php library for random useful functions 
// must require_once() this

// converts spaces into %20 to be url compatible (stupid urls)
function urlSpaces($string)
{	$result = "";
	$n=0;
	$temp;
	
	$n = storeFind(" ", $string, $n, $temp);
	while($n!=-1)
	{	$result .= $temp . "%20";
		$n = storeFind(" ", $string, $n, $temp);
	}
	$result .= $temp;
	
	return $result;
}

// returns the full path of the currently running php script
// e.g. http://www.google.com/something/
function fullPath()
{	$theFullPath="";
	$n=0;
	$temp;
	$theFullURL = fullURL();

	$n = storeFind("/", $theFullURL, $n, $temp);
	while($n!=-1)
	{	$theFullPath .= $temp . "/";
		$n = storeFind("/", $theFullURL, $n, $temp);
	}
	
	return $theFullPath;
}

// returns the full URL of the currently running php script
function fullURL()
{	$theFullURL = 'http';
	if($_SERVER['HTTPS']=='on')
	{	$theFullURL .=  's';
	}
	$theFullURL .=  '://';
	if($_SERVER['SERVER_PORT']!='80') 
		$theFullURL .=  $_SERVER['HTTP_HOST'].':'.$_SERVER['SERVER_PORT'].$_SERVER['SCRIPT_NAME'];
	else
		$theFullURL .=  $_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'];
	if($_SERVER['QUERY_STRING']>' ')
	{	$theFullURL .=  '?'.$_SERVER['QUERY_STRING'];
	}
	
	return $theFullURL;
}


// returns the index of the character after the search string
// returns -1 if it doesn't find the searchForThis string
function find($searchString, $inString, $nStart)		// returns the index of the character after the search string
{	$searchState = 0;
	$contentLength = strlen($inString);
	$searchStringLen = strlen($searchString);
	for($n=$nStart; $n<$contentLength; $n++)		// search for "Alexatrafficrankbased"
	{	if($searchState == $searchStringLen)
		{	return $n;
		}
		else if($inString[$n] == $searchString[$searchState])
		{	$searchState++;
		}
		else 
		{	$searchState = 0;
		}
	}
	
	return -1;
}


// finds the searchForThis string and stores the characters 
// between the startingHere value and the character before the searchForThis string starts
// Should work even if "inThis" is the same string as "storeHere"
// Probably will not work if "searchForThis" is the same as "storeHere"
// returns the index of the character after the search string
// returns -1 if it doesn't find the searchForThis string
function storeFind($searchString, $inString, $nStart, &$storeString)		// same as searchFor above, but stores the string in between
{	$storeString = "";		// clear storeString
	$searchState = 0;
	$contentLength = strlen($inString);
	$searchStringLen = strlen($searchString);
	for($n=$nStart; $n<$contentLength; $n++)		// search for "Alexatrafficrankbased"
	{	if($n-$nStart > $searchStringLen)
		{	$storeString = $storeString . $inString[$n-$searchStringLen-1];
		}
		
		if($searchState == $searchStringLen)
		{	return $n;
		}
		else if($inString[$n] == $searchString[$searchState])
		{	$searchState++;
		}
		else 
		{	$searchState = 0;	
		}
	}
	
	for($n=$contentLength-$searchStringLen-1; $n<$contentLength; $n++)
	{	$storeString = $storeString . $inString[$n];
	}
	
	//if search term was not found
	return -1;
	
}


// finds the searchForThis string in a file and stores the characters 
// Should work even if "inFile" is the same string as "storeString"
// Probably will not work if "searchString" is the same as "storeString"
// returns true if the search term is found, false otherwise
function storeFindFile($searchString, $inFile, &$storeString)		// same as searchFor above, but stores the string in between
{	$storeString = "";		// clear storeString
	$searchState = 0;
	$searchStringLen = strlen($searchString);
	$curChar;				// the next character from the file
	
	for($n=0; 1; $n++)
	{	$curChar = fgets($inFile,1);
		
		if($curChar == false)		// at EOF return false
		{	return false;
		}
		
		$storeString .= $curChar;
		
		if($searchState == $searchStringLen)
		{	$storeString = array_slice($storeString, 0, -$searchStringLen);	// rm token from storeString
			return true;
		}
		else if($curChar == $searchString[$searchState])
		{	$searchState++;
		}
		else 
		{	$searchState = 0;	
		}
	}	
}

/*
// gets the host our of a url string
function getHost($url)
{	// get host name from URL
	preg_match("/^(http:\/\/)?([^\/]+)/i", $url, $matches);
	return $matches[2];
}

function getDomain($url)
{	// get host name from URL
	preg_match("/^(http:\/\/)?([^\/]+)/i", $url, $matches);
	$host = $matches[2];

	// get last two segments of host name
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
	return $matches[0];
}
*/
?>
