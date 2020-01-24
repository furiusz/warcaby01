<?php

	session_start();
	
	session_unset();
	
	header('Location: /PWI/html/index.html');

?>