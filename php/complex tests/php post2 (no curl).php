<?php
	function postAndReturn($url, $data)
	{	return postRequest($url, $data); // this function does it beter
		
		/*$data = http_build_query($data);
		
		$context_options = array
		(	'http' => array 
			(	'method' => 'POST',
				'header'=> "Content-type: application/x-www-form-urlencoded\r\n".
					   "Content-Length: " . strlen($data) . "\r\n",
				'content' => $data
			)
		);
		
		$context = stream_context_create($context_options);
		return file_get_contents($url, FILE_BINARY, $context);
		*/
	}
	
	// this doesn't work
	/*function postAndGo($host, $path, $data)
	{	$data = http_build_query($data);
		
		header("POST $path HTTP/1.1\r\n" );
		header("Host: $host\r\n" );
		header("Content-type: application/x-www-form-urlencoded\r\n" );
		header("Content-length: " . strlen($data) . "\r\n" );
		header("Connection: close\r\n\r\n" );
		header($data);
	}
	*/
	
	//postAndGo("www.tetrud.com", "/Billys/php receive post.php", array("whatever" => "try it"))
	echo postAndReturn("http://www.tetrud.com/Billys/php%20receive%20post.php", array("whatever" => "try it"));
	
	
	
	function postRequest($url, $data, $optional_headers = null) {
	
		if(gettype($data) == 'array') {
			$newData = array();
			foreach($data as $k=>$v) {
				$newData[] = $k."=".urlencode($v);
			}
			$data = implode("&", $newData);
		}
		
		$params = array('http' => array(
			'method' => 'POST',
			'content' => $data
		));
		if ($optional_headers !== null) {
			$params['http']['header'] = $optional_headers;
		}
		$ctx = stream_context_create($params);
		$fp = @fopen($url, 'rb', false, $ctx);
		if (!$fp) {
			throw new Exception("Problem with $url, $php_errormsg");
		}
		$response = @stream_get_contents($fp);
		if ($response === false) {
			throw new Exception("Problem reading data from $url, $php_errormsg");
		}
		return $response;
	}
	
/*	$content = ''; 
	$flag = false; 
	$post_query = 'a=1&b=2'; // name-value pairs 
	$post_query = urlencode($post_query) . "\r\n"; 
	$host = 'www.tetrud.com'; 
	$path = "Billys/php%20receive%20post.php"; 
	$fp = fsockopen($host, '80'); 
	// This is plain HTTP; for HTTPS, use 
	// $fp = fsockopen($host, '443'); 
	if ($fp)  
	{	$queryToPut = "POST ".$path." HTTP/1.0\r\n";
		$queryToPut .= "Host: ".$host."\r\n";
		$queryToPut .= "Content-length: ". strlen($post_query) ."\r\n\r\n";
		$queryToPut .= $post_query;
		
		fputs($fp, $queryToPut); 
		while (!feof($fp)) 
		{	$line = fgets($fp, 10240); 
			if ($flag)  
			{	$content .= $line; 
			}else 
			{	$headers .= $line; 
				if(strlen(trim($line)) == 0)  
				{	$flag = true; 
				} 
			} 
		} 
		fclose($fp); 
	}
	
	echo $queryToPut;
	
	echo "<br> AND <br>";
	echo $content;
*/
?>
