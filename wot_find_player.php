<?php

	$url 			= $_POST['url'];
	$tanker_name 	= $_POST['tanker_name'];

	$process_start_time = time();

	$json = file_get_contents($url); 
	$tankerdata = json_decode($json, true);
	print_r($json);

?>