<?php

	$switchlabel='limafunctionstart';
	gotoswitch: switch($switchlabel)
	{case 'limafunctionstart':
	$wordL;		// holds the lengths of the current longest wordform, and the wordform being currently tested
	$tempLabel;		// holds the value of a return label
	$zeroOne=0;			// holds which anychars set should be overwritten
	$longest=null;			// holds the index of the longest wordform (used for choosing which actions to do)
	$countparens;		// makes sure brackets are properly matched
	$diffTempValue=0;
	$NOWtemp0;			// records the current stable position (CURpos)
	$n;
	$limas_W= array("", "");
	$limas_W_max;

	$wordL[$zeroOne]=-1;
	$wordL[!$zeroOne]=-1;
	do
	{	
		echo "IntegerBaseX is '".$limas_W[$zeroOne]."'\n";
		echo "And: ".(strlen($limas_W[$zeroOne])==1 || $limas_W[$zeroOne][0]!="0")."\n";
		
		if(strlen($limas_W[$zeroOne])==1 || $limas_W[$zeroOne][0]!="0")
		{	echo "HEREFUCK\n";
		}
	} while(0);
	if(true)
	{	
		$longest = 0;
		$zeroOne=!$zeroOne;
		echo "OMFG".$longest."\n";
	}
	else
	{	}

	echo "CRAPS: '".$longest."' and '".$wordL[!$zeroOne]."'\n";

	if($longest == 0 && $wordL[!$zeroOne] > -1)
	{	echo "Got integerBaseX '".$limas_W[!$zeroOne]."'\n";
		$outvar = $limas_W[!$zeroOne];
		return true;
	
	}
	else
	{	$switchlabel = 'LIMAsEndOfParseFunction';goto gotoswitch;
	}


}
$fp = fopen('php://stdin', 'r');
fgets($fp, 2);


?>
