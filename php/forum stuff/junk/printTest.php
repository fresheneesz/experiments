<?php
	require_once("forumThread.php");
	
	$thread = new forumThread;
	$thread->access("b");

	$thread->display(0, 1);
?>
