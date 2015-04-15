<?php
/*objects lets us store information*/
    require_once(__DIR__ . "/../model/config.php");
    
   /*in SESSION connection is where we stored our database connection*/
    /*AUTO INCREMENT increments our id*/
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "password char(128) NOT NULL,"
            . "salt char(128) NOT NULL ,"
            . "exp int(4), "
            . "exp1 int(4), "
            . "exp2 int(4), "
            . "exp3 int(4), "
            . "exp4 int(4), "
            . "PRIMARY KEY(id))");
    
    if($query) {
      
    }else{
       echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }