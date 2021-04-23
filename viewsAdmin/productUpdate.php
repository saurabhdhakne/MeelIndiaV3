<?php 
    include 'check_con.php';
    $id = $_POST['id'];
    $title = $_POST['title'];
    $subtitle = $_POST['subtitle'];
    $rate = $_POST['rate'];
    $typeJ = $_POST['typeJ'];
    $status = $_POST['status'];

    try{

        $sql = "UPDATE products SET title ='$title', subtitle = '$subtitle', rate = '$rate',typeJ = '$typeJ',status = '$status' WHERE id='$id' ";

        if (mysqli_query($conn,$sql))
        {    
            ?>
            <html> <script> alert('Product Updated Successfully!!!'); </script></html>
            <?php
            header('location:products.php');
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