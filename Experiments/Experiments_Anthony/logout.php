<?php
session_start();

$_SESSION = array();

session_destroy();
 
// Redirect
header("location: login.php");
exit;
?>