<?php

    include 'check_con.php';

	$email=$_POST['email'];
	$password=$_POST['password'];

	$sql="select * from admin where email='$email' and password='$password' ";

	$result=mysqli_query($conn,$sql);

	if ($result->num_rows > 0) {
				    session_start();
		            $_SESSION['username']=$email;
                    header('location:index.php');
	}

	else{
        		echo "User Not Found , Check User Name and Password";

        ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>admin</title>
    </head>
    <body>
        <script>
            alert("Check Username and Password");
            window.location.href = "adminLogin.html" ;
        </script>
    </body>
    </html>



        <?php
	}	
 ?>