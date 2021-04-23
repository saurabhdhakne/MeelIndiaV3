<?php
  
  $servername = "localhost";
  $username = "u627200830_root"; 
  $password = "#Jwellery@123456";
  $dbname = "u627200830_jwellery";


 $conn = mysqli_connect($servername, $username, $password, $dbname); 

if (!$conn){     
 		die("Connection failed: " . mysqli_connect_error()); 
}

?>