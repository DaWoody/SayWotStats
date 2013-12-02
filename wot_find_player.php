<?php

	$url = $_POST['url'];

	$process_start_time = time();

	$json = file_get_contents($url); 
	//$tankerdata = json_decode($json, true);
	print_r($json);

?>