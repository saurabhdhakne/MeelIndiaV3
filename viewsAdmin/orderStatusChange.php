<?php 
    include 'check_con.php';
    try{
        $id = $_GET['id'];
        $status = $_GET['status'];

        if($status == 'incomplete' ){
            $status = 'complete';
        }
        else{
            $status = 'incomplete';
        }

        $sql = "UPDATE orders SET status = '$status' WHERE id='$id' ";

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