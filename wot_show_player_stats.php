<?php

	$url 		= $_POST['url'];
	$tanker_id 	= $_POST['tanker_id'];

	$process_start_time = time();

	$json = file_get_contents($url); 
	$tankerdata = json_decode($json, true);
	print_r($json);

?>