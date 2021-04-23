<?php 
    include 'check_con.php';
    $id = $_POST['id'];
    $pid = $_POST['pid'];
    $title = $_POST['title'];
    $rate = $_POST['rate'];
    $subtitle = $_POST['img'];
 

    try{

        $sql = "UPDATE site_images SET title ='$title', rate = '$rate', pid ='$pid' WHERE id='$id' ";

        if (mysqli_query($conn,$sql))
        {    
            header('location:site_images.php');
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