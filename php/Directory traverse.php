
<?php

traverse(".", 1);

$fp = fopen('php://stdin', 'r');
fgets($fp, 2);




function traverse($dir, $here)
{	$ci=0;
	if(is_dir($dir)) 
	{	if($dh = opendir($dir)) 
		{	if(substr($dir,-1)!="/")	// make sure directory has a slash after it
			{	$dir.="/";
			}
			if($dir == "./")			// don't show identity directory
			{	$dir="";
			}
			
			while(($file = readdir($dh)) !== false) 
			{	if(is_dir($dir.$file))
				{	if($file != ".." && $file != ".")
					{	//if($here)
							traverse($dir.$file, 1);
						//echo "This is: '" . $dir.$file . "' - dir: '".$dir."' - file: '".$file."'<br/>\n";
						
					}					
				}
				else
				{	echo '<a href="'.$dir.$file.'"><img src="'.$dir.$file.'" style="max-height:150px; max-width:500px;"><div style="display:inline;margin-top:auto;margin-bottom:auto;">'.$dir.$file.'</div></a><br/>'."\n";
				}
			}
			closedir($dh);
		}
	}
}

function printIndent()
{	for($n=0; $n<$ci; $n++)
	{	echo "\t";
	}
}
?>
