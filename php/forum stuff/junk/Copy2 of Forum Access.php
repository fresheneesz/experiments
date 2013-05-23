<?php
// Takes in "path", "type", "ID", "text", "page", "entry" and "returnTo"

require("forumThread.php");
require("htmlFunctions.php");

if(isset($_POST["path"]) && isset($_POST["type"]))
{	//echo "OK! " . $_POST["path"] . " " . $_POST["type"] . " " . $_POST["ID"] . " " . $_POST["text"] . '<p>';	
	
	$thread = new forumThread;
	
	if($_POST["type"] == 0 && isset($_POST["ID"]) && isset($_POST["text"]) &&
								strlen($_POST["ID"]) && strlen($_POST["text"]) )	// add
	{	$thread->access($_POST["path"]);
		$thread->add($_POST["ID"], $_POST["text"]);
	}
	else if($_POST["type"] == 1 && strlen($_POST["path"])!=0) // print
	{	$thread->access($_POST["path"]);
	
		if(isset($_POST["entry"]))
		{	$thread->display($_POST["entry"], 1);
		}
		else
		{	$entriesToDisplay = 30;
			
			if(!isset($_POST["page"]))
				$_POST["page"] = $thread->numberOfEntries/28;	// last page
			
			if($_POST["page"]*($entriesToDisplay-2) <= 0)
				echo '<center><a href="' . $thread->pathName . "/ax.php?page=" . $_POST["page"]-1 . '">Previous</a>  ';
			
			if($_POST["page"] > 5)
				$n=$_POST["page"]-5;
			else
				$n=0;
			for( ; $n<$_POST["page"]; $n++)
			{	echo '<a href="' . $thread->pathName . "/ax.php?page=" . $n . '">$n</a> ';
			}
			
			echo $_POST["page"] . " ";
			
			if($_POST["page"]+5 <= $thread->numberOfEntries/28)
				$k=$_POST["page"]+5;
			else
				$k=$thread->numberOfEntries/28;
			for($n=$_POST["page"]+1; $n<$k; $n++)
			{	echo '<a href="' . $thread->pathName . "/ax.php?page=" . $n . '">$n</a> ';
			}
			
			if($_POST["page"]*($entriesToDisplay-2)+$entriesToDisplay >= $thread->numberOfEntries-1)
				echo '<center><a href="' . $thread->pathName . "/ax.php?page=" . $_POST["page"]+1 . '">Next</a>  ';
			
			$thread->display(($_POST["page"]*($entriesToDisplay-2), $entriesToDisplay);
		}
		
	}
	else if($_POST["type"] == 2 && strlen($_POST["path"])!=0) // create
	{	$thread->create($_POST["path"]);
	}
	else
	{	echo "Something went wrong.<p>";
		echo '
			<html> 
			<head> 
			<title>PHP forum</title> 
			</head>
			 
			<body> 
			<form method="post" action="Forum Access.php">
			Action
		';
		
		select("type", array("Create", "Add", "Print"), array("2", "0", "1"), $_POST["type"]);
		
		echo '
			Path   <input name="path" type="text" value="' . $_POST["type"] . '"><br>
			ID   <input name="ID" type="text" value="' . $_POST["ID"] . '"><br>
			Comment:<br>
			<textarea rows="15" cols="100" name="text" wrap="physical">' . $_POST["text"] . '</textarea>
			<INPUT TYPE="submit">
			</form><br>
			</html>
		';
		exit;
	}
	
	if(isset($_POST["returnTo"]))
		echo '<meta content="0; URL=' . $_POST["returnTo"] . '" http-equiv="Refresh" />';
	
}
else
{	echo '
		<html> 
		<head> 
		<title>PHP forum</title> 
		</head>
		 
		<body> 
		<form method="post" action="Forum Access.php">
		Action <select name="type">
				<option value="2">Create</option>
				<option value="0">Add</option>
				<option value="1">Print</option>
		</select>
		Path   <input name="path" type="text"><br>
		ID   <input name="ID" type="text"><br>
		Comment:<br>
		<textarea rows="15" cols="100" name="text" wrap="physical"></textarea>
		<INPUT TYPE="submit">
		</form><br>
		</html>
	';			
	exit;
}

function forumLinks($thread, $page, $entriesToDisplay)
{	if(!isset($page))
		$page = $thread->numberOfEntries/28;	// last page
	
	if($page*($entriesToDisplay-2) <= 0)
		echo '<center><a href="' . $thread->pathName . "/ax.php?page=" . $page-1 . '">Previous</a>  ';
	
	if($page > 5)
		$n=$page-5;
	else
		$n=0;
	for( ; $n<$page; $n++)
	{	echo '<a href="' . $thread->pathName . "/ax.php?page=" . $n . '">$n</a> ';
	}
	
	echo $page . " ";
	
	if($page+5 <= $thread->numberOfEntries/28)
		$k=$page+5;
	else
		$k=$thread->numberOfEntries/28;
	for($n=$page+1; $n<$k; $n++)
	{	echo '<a href="' . $thread->pathName . "/ax.php?page=" . $n . '">$n</a> ';
	}
	
	if($page*($entriesToDisplay-2)+$entriesToDisplay >= $thread->numberOfEntries-1)
		echo '<center><a href="' . $thread->pathName . "/ax.php?page=" . $page+1 . '">Next</a>  ';
}

?>
