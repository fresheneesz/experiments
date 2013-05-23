<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<style type="text/css">		
		.outer	{display:table; overflow:hidden;}
		.middle	{display:table-cell; vertical-align:middle;}
	</style>
	<!--[if IE]>
	<style type="text/css">		
		.outer	{#position:relative;}
		.middle	{#position:absolute; #top:50%;}
		.inner	{#position:relative; #top:-50%;}
	</style>
	<![endif]-->
		
</head>
<body>

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
				{	echo '<a href="'.$dir.$file.'">'.$dir.$file.'</a><br/>'."\n";
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


</body>
</html>
