<?php
// Takes in "path", "type", "ID", and "text"

require("forumThread.php");

if(isset($_POST["path"]) && isset($_POST["type"]))
{	echo "OK! " . $_POST["path"] . " " . $_POST["type"] . " " . $_POST["ID"] . " " . $_POST["text"] . '<p>';	
	
	$thread = new forumThread;
	
	if($_POST["type"] == 0 && isset($_POST["ID"]) && isset($_POST["text"]) &&
								strlen($_POST["ID"]) && strlen($_POST["text"]) )	// add
	{	$thread->access($_POST["path"]);
		$thread->add($_POST["ID"], $_POST["text"]);
	}
	else if($_POST["type"] == 1 && strlen($_POST["path"])!=0) // print
	{	$thread->access($_POST["path"]);
		$thread->display($thread->numberOfEntries-30, $thread->numberOfEntries);
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
			<form method="post" action="forumAccess.php">
			Action <select name="type" value="0">
					<option value="2"
		';
		if($_POST["type"] == 2)
			echo 'selected="yes"';
		echo 						'>Create</option>
					<option value="0"
		';
		if($_POST["type"] == 0)
			echo 'selected="yes"';
		echo 						'>Add</option>
					<option value="1"
		';
		if($_POST["type"] == 1)
			echo 'selected="yes"';
		echo						'>Print</option>
			</select>
			Path   <input name="path" type="text" value="' . $_POST["type"] . '"><br>
			ID   <input name="ID" type="text" value="' . $_POST["ID"] . '"><br>
			Comment:<br>
			<textarea rows="15" cols="100" name="text" wrap="physical">' . $_POST["text"] . '</textarea>
			<INPUT TYPE="submit">
			</form><br>
		';
		exit;
	}
}
else
{	echo '
		<html> 
		<head> 
		<title>PHP forum</title> 
		</head>
		 
		<body> 
		<form method="post" action="forumAccess.php">
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
	';			
	exit;
}

?>
