<?php
require_once(__DIR__ . "/../model/config.php");
//we are passing in the game variables into this code
$exp  = filter_input(INPUT_POST, "exp ", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);

// the dot "." combines code
//and then its going to updatw the users tabel and its going to set those five variables
//when they use to be on our old name account and its going to konw our username by $_SESSION
//which we set when we create a user and login
$query = $_SESSION["connection"]->query("UPDATE users SET "
        . "exp = $exp, "
        . "exp1 = $exp1, "
        . "exp2 = $exp2, "
        . "exp3 = $exp3, "
        . "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");

//if it worked i'm going to echo true
if($query){
    echo true;
}else{
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
