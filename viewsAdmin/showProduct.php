<?php 

include 'check_con.php';

session_start();

if(isset($_SESSION['username']))
{

  $user=$_SESSION['username'];


}
else{

    header("location:index.php");
}
  	
  $sql = "SELECT * FROM products WHERE id =".$_GET["id"] ;

  $result = mysqli_query($conn,$sql);

?>


<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Dashboard</title>

  <!-- Custom fonts for this template-->
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  <script src="https://use.fontawesome.com/db006bf474.js"></script>

  <!-- Custom styles for this template-->
  <link href="css/sb-admin-2.min.css" rel="stylesheet">
  <style>
    .gif{
     border-radius: 20px;
     cursor: pointer;
    }
    .shadowme{
      box-shadow: 5px 5px 5px black;
    }
    tbody{
        color: black;
    }
    .pointer{
      cursor: pointer;
    }
    .navbar-nav {
        width: 600px;
    }
  </style>
</head>

<body id="page-top" class="bg-primary">

        <div class="container">
            <div class="row jumbotron mt-5">

                <h1 class="col-md-12 text-center display-2 mb-5"> 
                    <b> Product </b> 
                </h1>
                          <?php 

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    
                                    $id = $row['id'];
                                    $title = $row['title'];
                                    $subtitle = $row['subtitle'];
                                    $rate = $row['rate'];
                                    $img = $row['img'];
                                    $typeJ = $row['typeJ'];
                                    $status = $row['status'];
                                    
                                    ?>

                                        <div class="col-md-4 p-4">
                                            <img src="<?php echo $img; ?>" width="100%" alt="">
                                        </div>
                                        <div class="col-md-7 offset-md-1 pt-4">
                                            <h1> <?php echo $title; ?>  </h1>
                                            <h3> <?php echo $typeJ; ?> </h3>
                                            <h5> <?php echo $subtitle; ?>  </h5>
                                            <h3> Rs. <?php echo $rate; ?> </h3>
                                        </div>
                                    <?php

                                    }
                                    }

                        ?>
            </div>
        </div>



<!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="js/sb-admin-2.min.js"></script>

</body>

</html>
