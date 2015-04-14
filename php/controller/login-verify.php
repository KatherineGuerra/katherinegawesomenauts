<?php
   require_once(__DIR__ . "/../model/config.php");

function authenticateUser(){
    if(!isset($_SESSION["authenticated"])){
        return false;
    }
    else{
        /*its going to check whether or not its true*/
        if($_SESSION["authenticated"] != true){
            return false;
        }
        else{
            return true;
        }
    }
}