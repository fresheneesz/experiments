<?php	
$data = array();

$data[0] = "moose";

//for($n=0; $n<256; $n++)
//{	$data+= array("a$n"=> $n);
//}
//for($n=0; $n<256; $n++)
//{	$data+= array("a" . ($n+256) => $n);
//}

print_r($data);
echo "\n\n";

$host = "www.110mb.com";	//"http://fresheneesz.110mb.com"
$path = "php%20tests/php%20receive%20post.php";
$url = $host.$path;
//$x = microtime(1);

$wrapper = array("img" => $data);

Spost($host, $path, $wrapper);
//header("Location: " . $url);

// the $data must be in the format of an associative array - array("img" => $data, "something else" => "more data")
// URL must be absolute
function postAndGo($url, $data)
{	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);	// returns
	
	curl_exec($ch);
	curl_close($ch);
}

// the $data must be in the format of an associative array - array("img" => $data, "something else" => "more data")
// URL must be absolute
function postAndReturn($url, $data)
{	$ch = curl_init();
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

function Fpost($url, $data, $optional_headers = null)
{	$params = array('http' => array
				(	'method' => 'POST',
					'content' => $data
				));
	if ($optional_headers !== null) 
	{	$params['http']['header'] = $optional_headers;
	}
	$context = stream_context_create($params);
	$fp = fopen($url, 'r', false, $context);
	$response = stream_get_contents($fp);
	return $response;
}


function Spost($host, $path, $data)
{	$filePointer = fsockopen($host, 80, $errorNumber, $errorString);
    
    if(!$filePointer) 
	{	return;
	}
    
	$requestHeader = "POST ".$path."  HTTP/1.1\r\n";
	$requestHeader.= "Host: ".$host."\r\n";
	$requestHeader.= "User-Agent:      Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1) Gecko/20061010 Firefox/2.0\r\n";
	$requestHeader.= "Content-Type: application/x-www-form-urlencoded\r\n";
	$requestHeader.= "Content-Length: ".strlen($data)."\r\n";
	$requestHeader.= "Connection: close\r\n\r\n";
	$requestHeader.= $data;

	fwrite($filePointer, $requestHeader);
            
	$responseHeader = '';
	$responseContent = '';
    
	do 
	{	$responseHeader.= fread($filePointer, 1); 
	}
	while(!preg_match('/\\r\\n\\r\\n$/', $responseHeader));
            
	if(!strstr($responseHeader, "Transfer-Encoding: chunked"))
	{	while(!feof($filePointer))
		{	$responseContent.= fgets($filePointer, 128);
		}
	}
	else 
	{	while($chunk_length = hexdec(fgets($filePointer))) 
		{	$responseContentChunk = '';
			$read_length = 0;
			while ($read_length < $chunk_length) 
			{	$responseContentChunk .= fread($filePointer, $chunk_length - $read_length);
				$read_length = strlen($responseContentChunk);
			}
			$responseContent.= $responseContentChunk;
            fgets($filePointer);
		}
	}
	return chop($responseContent);
}



?>
