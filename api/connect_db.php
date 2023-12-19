<?php
//database connection
try {
    $conn = new mysqli("localhost","root","root","streamify");
    return $conn;
  }
catch (Exception $e){
    echo $e->getMessage();
  }
?>