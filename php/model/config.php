<?php
require_once(__DIR__ . "/database.php");
session_start();
session_regenerate_id(true);

$path = "/katherinegAwesomenauts/php/";

$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";
/*checks if the database is connection , if not then it will set it*/
if(!isset($_SESSION["connection"])){
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}