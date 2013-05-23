<?php
function varname (&$iVar, &$aDefinedVars)
    {
    foreach ($aDefinedVars as $k=>$v)
        $aDefinedVars_0[$k] = $v;

    $iVarSave = $iVar;
    $iVar     =!$iVar;

    $aDiffKeys = array_keys (array_diff_assoc ($aDefinedVars_0, $aDefinedVars));
    $iVar      = $iVarSave;

    return $aDiffKeys[0];
    }

    class a
	{	const b=3;
	}


var_dump(varname($what, get_defined_vars()));
$sand = 3;
$what = 3;
$bark=3;
var_dump(varname($what, get_defined_vars()));
var_dump(varname($bark, get_defined_vars()));
var_dump(varname($sand, get_defined_vars()));

//var_dump(varname(a::b, get_defined_vars()));