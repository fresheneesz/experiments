<?php
// Takes in "path", "type", "ID", "text", "page", "entry", "addOnly", and "returnTo"

require_once("forumThread.php");
require_once("htmlFunctions.php");

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
		{	echo '<center>On <a href="' . $thread->pathName . "_ax.php?page=" . 
										(int)($_POST["entry"]/$thread->entriesToDisplay) . '">page ' . 
										(int)($_POST["entry"]/$thread->entriesToDisplay) . '</a></center><br>';
			$thread->display($_POST["entry"], 1);
		}
		else
		{	if(!isset($_POST["page"]) || $_POST["page"]*$thread->entriesToDisplay-1 >=$thread->numberOfEntries)
				$_POST["page"] = (int)($thread->numberOfEntries/$thread->entriesToDisplay);	// last page			
			
			forumLinks($thread, $_POST["page"], $thread->entriesToDisplay);
			if($_POST["page"] == 0)
			{	$thread->display(0,	$thread->numberOfEntries % ($thread->entriesToDisplay-1) + 1);
			}
			else
			{	$thread->display($thread->numberOfEntries % ($thread->entriesToDisplay-1) + 1 +
						($_POST["page"]-1)*$thread->entriesToDisplay, $thread->entriesToDisplay);
			}
			forumLinks($thread, $_POST["page"], $thread->entriesToDisplay);
			
			
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
		';
		if(!isset($_POST["addOnly"]))
		{	echo 'Action';
			select("type", array("Create", "Add", "Print"), array("2", "0", "1"), $_POST["type"]);
			echo 'Path   <input name="path" type="text" value="' . $_POST["path"] . '"><br>';
		}
		else
		{	echo '<input name="type" value="0" type="hidden">'."\n";	// add
			echo '<input name="path" type="text" value="' . $_POST["path"] . '" type="hidden"><br>';
		}
		
		echo '
			ID   <input name="ID" type="text" value="' . $_POST["ID"] . '"><br>
			Comment:<br>
			<textarea rows="15" cols="100" name="text" wrap="physical">' . $_POST["text"] . '</textarea>';
		if(isset($_POST["returnTo"]))
		{	echo '<input name="returnTo" value="' . $_POST["returnTo"] . '" type="hidden">'."\n";
		}
		echo '
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

// displays
function forumLinks($thread, $page, $entriesToDisplay)
{	echo '<center>';
	if($page*$entriesToDisplay+($entriesToDisplay-1) < $thread->numberOfEntries-1)
		echo '<a href="' . $thread->pathName . "_ax.php?page=" . ($page+1) . '"><u>Next</u></a>  ';
	
	if($page+5 <= (int)($thread->numberOfEntries/$entriesToDisplay))
		$n=$page+5;
	else
		$n=(int)($thread->numberOfEntries/$entriesToDisplay);
	for( ; $n>$page; $n--)
	{	echo '<a href="' . $thread->pathName . "_ax.php?page=" . $n . '"><u>' . $n . '</u></a> ';
	}
	
	if(0 != (int)($thread->numberOfEntries/$entriesToDisplay))	// if there isn't only one page to display
		echo "<b><u>" . $page . "</b></u> ";
	
	if($page > 5)
		$k=$page-5;
	else
		$k=0;
	for($n=$page-1; $n>=k; $n--)
	{	echo '<a href="' . $thread->pathName . "_ax.php?page=" . $n . '"><u>' . $n . '</u></a> ';
	}
	
	if($page > 0)
	{	echo '<a href="' . $thread->pathName . "_ax.php?page=" . ($page-1) . '"><u>Previous</u></a>  ';
	}
	echo '</center>';
}

?>
