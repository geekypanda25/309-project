<?php
/* Database credentials. */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'apcosimo');
define('DB_PASSWORD', '');
define('DB_NAME', 'testMysql');

/* Connection */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

/* Check */
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
