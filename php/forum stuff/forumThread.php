<?php
// php library for creating and accessing a forum-type thread
// must require_once() this

class forumThread
{	var $pathName;
	var $numberOfEntries;
	var $entriesToDisplay = 30;
	// forumThread consists of a pathName
	// and file "num" which contains the number of entries in the thread
	
	// opens a table for access
	function access($tablePath)
	{	$this->pathName = $tablePath;
		if(!file_exists($this->pathName . '/num'))
		{	echo $this->pathName . " doesn't exist.<br>";
			exit;
		}
		$fh = fopen($this->pathName . '/num', 'r');
		$this->numberOfEntries = fread($fh, 20); // 20 digits is quite enough
		fclose($fh);
	}
	
	// creates and opens a table
	// $pathName is the path and name of a folder/table
	// returns 1 on error, 0 on success
	function create($pathName)
	{	if(!file_exists($pathName))
		{	if(mkdir($pathName, 0770))
			{	$fh = fopen($pathName . '/num', 'w');
				fwrite($fh, "0"); 
				$this->numberOfEntries = 0;
				fclose($fh);
				
				$phpAccessPage = '
					<?php		// takes "page" or "entry"
					require_once("postFunctions.php");
					require_once("neccessaryFunctions.php");
					
					if(isset($_GET["page"]) && isset($_GET["entry"]))
					{	echo "Page and entry can\'t BOTH be set...";
					}
					else if(isset($_GET["entry"]))
					{	echo postAndReturn(fullPath() . "Forum Access.php", 
							array("path" => "' . $pathName .'", "type" => "1", "entry" => $_GET["entry"]));
					}
					else if(isset($_GET["page"]))
					{	echo "<center>Page " . $_GET["page"] . "<br>" . "\n";
						echo postAndReturn(fullPath() . "Forum Access.php", 
							array("path" => "' . $pathName .'", "type" => "1", "page" => $_GET["page"]));
					}
					else
					{	echo postAndReturn(fullPath() . "Forum Access.php", 
							array("path" => "' . $pathName .'", "type" => "1"));
					}
					?>
				';
				
				$fh = fopen($pathName . '_ax.php', 'w');
				fwrite($fh, $phpAccessPage); 
				fclose($fh);
			}
			else 
			{	echo "something went horribly horribly wrong.<br>";
				return 1;
			}
		}
		else
		{	echo 'Error: table/folder already exists.<br>';
			return 1;
		}
	}
	
	
	// add the entry to the thread
	// ID is the SN of the person who wrote the entry
	function add($ID, $string)
	{	$fh = fopen($this->pathName . "/" .  $this->numberOfEntries, 'w');
		if($fh == 0)
		{	echo "forumThread specified (" . $this->pathName . "/" . $numberOfEntries . 
					") doesn\'t exist or cannot be opened.<p>";
			exit;
		}
		
		fwrite($fh, '<table frame="border">' . "\n");
		fwrite($fh, '  <tr>' . "\n");
		fwrite($fh, '    <th bgcolor="DodgerBlue"><font color="white" size="3">' . $ID . '</font><br>' . "\n");
		fwrite($fh, '    <font color="black" size="2"><a href="' . $this->pathName . "_ax.php?entry=" . 
									$this->numberOfEntries . '">' .
									$this->numberOfEntries . ".</a>  " . date("Y-m-d G:i") . '</font>' . "\n");
		fwrite($fh, '    </th>' . "\n");
		fwrite($fh, '  </tr>' . "\n");
		fwrite($fh, '</table>' . "\n");

		fwrite($fh, $string); 
		fclose($fh);
		
		$this->numberOfEntries += 1;
		
		$fh = fopen($this->pathName . '/num', 'w');
		fwrite($fh, $this->numberOfEntries); 
		fclose($fh);
	}
	
	// Displays the data in entries num0 to num0+number
	function display($num0, $number)
	{	echo '<table frame="border" align="center">' . "\n";
		
		if($num0+$number > $this->numberOfEntries)
			$n = $this->numberOfEntries - 1;
		else
			$n = $num0+$number - 1;
		
		for( ; $n>=$num0; $n--)
		{	echo '  <tr>' . "\n";
			echo '    <th bgcolor="lightblue" align="left">' . "\n";
			$fh = fopen($this->pathName . "/" . $n, 'r');
			echo stripslashes(fread($fh, 100000)) . "\n";
			echo '    </th>' . "\n";
			echo '  </tr>' . "\n";
		}
		echo '</table>' . "\n";
	}
}


?>
