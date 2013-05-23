<?php	// takes inputs "path" and "password"
		// http://fresheneesz.110mb.com/delete.php?password=&path=

function full_rmdir( $dir )
{	if ( !is_writable( $dir ) )
	{	if ( !@chmod( $dir, 0777 ) )
		{	return FALSE;
		}
	}
        
        $d = dir( $dir );
        while ( FALSE !== ( $entry = $d->read() ) )
        {
            if ( $entry == '.' || $entry == '..' )
            {
                continue;
            }
            $entry = $dir . '/' . $entry;
            if ( is_dir( $entry ) )
            {
                if ( !full_rmdir( $entry ) )
                {
                    return FALSE;
                }
                continue;
            }
            if ( !unlink( $entry ) )
            {
                $d->close();
                return FALSE;
            }
        }
        
        $d->close();
        
	rmdir( $dir );
        
	return TRUE;
}
		

// MAIN ///////

if(isset($_GET["password"]) && isset($_GET["path"]))
{	$PW = $_GET["password"];
	if(ord($PW[0])*ord($PW[3])!=11220 || ord($PW[4])*ord($PW[1])!=11286 || ord($PW[5])*ord($PW[2])!=10504 || 
		ord($PW[6])*ord($PW[7])!=5929 || ord($PW[0])*ord($PW[6])!=12342 || ord($PW[1])*ord($PW[5])!=11856 || 
		ord($PW[2])*ord($PW[4])!=9999)
	{	echo "Access Denied.";
		exit;
	}
	else
	{	echo "OK! Got " . $_GET["path"] . '<p>';	
		
		if(file_exists($_GET["path"]))
		{	if(is_dir( $_GET["path"]))
			{	full_rmdir($_GET["path"]);
				echo "Removed " . $_GET["path"];
			}
			else 
			{	unlink($_GET["path"]);
				echo "Unlinked " . $_GET["path"];
			}
		}
	}
}
else
{	echo '
		<html> 
			<head><title>Delete</title></head>
			<body> 
			<form method="get" action="delete.php">
			Path   <input name="path" type="text" value="' . $_POST["path"] . '"><br>
			<input name="password" type="text"><br>
			<INPUT TYPE="submit">
			</form><br>
			</html>
		';
}

?>
