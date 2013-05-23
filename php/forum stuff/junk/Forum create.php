<?php	

require("postFunctions.php");

$url = "forumAccess.php";
if(!isset($_GET["path"]))
{	echo '<html> 
	<head> 
	<title>PHP forum</title> 
	</head>
	 
	<body> 
	<form method="post" action="'. $url . '">
	Path   <input name="path" type="text" ><br>
	<input name="type" value="2" type="hidden">
	<INPUT TYPE="submit">
	</form><br>';
	exit;
}
$postData = array("path"=>$_GET["path"], "type"=>"2");
postAndGo($url, $postData);

?>
