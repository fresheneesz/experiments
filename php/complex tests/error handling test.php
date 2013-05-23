<?php 

function errorHandler($errno, $errstr, $errfile, $errline){
    echo "Error handler here <br>\n";
    var_dump(error_get_last());
    throw new Exception($errstr);
}
function shutdownFunction() {
    echo "Shutting down <br>\n";
}

set_error_handler("errorHandler");
register_shutdown_function("shutdownFunction");

try {
	$undefined->ok();
} catch(Exception $e) {
	echo "Caught the exception <br>\n";
}
