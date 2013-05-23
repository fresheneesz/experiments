<?php
// php library for generating html more simply
// must require_once() this

// take in the form name for posting (etc)
// an array of option names,
// an array of option values, 
// and a value representing the option that is selected
function select($formName, $names, $values, $selected)
{	echo '<select name="' . $formName . '" value="0">\n';
	for($n=0; $n<count($names); $n++)
	{	echo '<option value="' . $values[$n] . '"';
		if($selected == $values[$n])
			echo 'selected="yes"';
		echo '>' . $names[$n] . '</option>\n';
	}
}
		
?>
