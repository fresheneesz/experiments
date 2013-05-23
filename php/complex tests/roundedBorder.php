<?php

	
	// requires three divs inside the $id div: r1 r2 r3 content r3
	function roundedClass($id, $borderColor, $backgroundColor="", $borderWidth=1)
	{	?>
		<style type="text/css">
			.<?php echo $id;?> .r1 
			{	height: <?php echo $borderWidth;?>px;		/* change for border width */
				overflow: hidden;
				margin: 0 4px;
			
			}

			.<?php echo $id;?> .r2 
			{	height: <?php echo $borderWidth;?>px;		/* change for border width */
				border-width: 0px 2px;
				border-style: solid;
				margin: 0 2px;
				overflow: hidden;
				
				background-color: <?php echo $backgroundColor;?>;
			}
			
			.<?php echo $id;?> .r3 
			{	height: 2px;
				border-width: 0px 1px;
				border-style: solid;
				margin: 0 1px;
				overflow: hidden;
				
				background-color: <?php echo $backgroundColor;?>;
			}
			
			.<?php echo $id;?> .content
			{	border-width: 0px <?php echo $borderWidth;?>px;	/* change for border width */
				border-style: solid;
				padding: 1px 1px;
				zoom: 1;
				
				background-color:<?php echo $backgroundColor;?>;
			}
			
			/* border color: (background and border-color are both needed for this) */
			.<?php echo $id;?> .r1
			{	background: <?php echo $borderColor;?>;
			}
			.<?php echo $id;?> .r1, .<?php echo $id;?> .r2, .<?php echo $id;?> .r3, .<?php echo $id;?> .r4, .<?php echo $id;?> .content
			{	border-color: <?php echo $borderColor;?>;
			}
			
		</style> 
		<?php
	}
	
	// $options is the text between the "<div" and the ">" - for example style, class, id, etc
	function drawRoundedClass($options,$content)
	{	?>
		<div <?php echo $options;?>>
			<div class="r1"></div>
			<div class="r2"></div>
			<div class="r3"></div>
			<div class="content">
				<?php echo $content;?>
			</div>
			<div class="r3"></div>
			<div class="r2"></div>
			<div class="r1"></div>
		</div>
		<?php
	}

	
	roundedClass("moo", "#0093CB", "#809290");
	drawRoundedClass('class="moo"',"Junk inside");
?>
