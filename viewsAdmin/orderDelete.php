<?php 
    include 'check_con.php';
    $id = $_GET['id'];


    try{

        $sql = "DELETE FROM orders WHERE id='$id' ";

        if (mysqli_query($conn,$sql))
        {    
           
            header('location:index.php');
        }
        else 
        {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }

    }
    catch (customException $e) {
        echo $e->errorMessage();
    }


    
?>