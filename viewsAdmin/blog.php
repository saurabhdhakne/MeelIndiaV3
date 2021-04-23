<?php 

include 'check_con.php';

session_start();

if(isset($_SESSION['username']))
{

  $user=$_SESSION['username'];

}
else{
  header("location:../index.php");
}
  
  $sql = "SELECT * FROM blog ORDER BY id DESC " ;

  $result = mysqli_query($conn,$sql);
  
  $lengths = 0;

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
<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center bg-white" href="/">
              <div class="sidebar-brand-icon rotate-n-15">
                <!-- <i class="fas fa-laugh-wink"></i> -->
              </div>
              <div class="sidebar-brand-text mx-3"> <img src="./img/user.png" height="50px" alt=""> </div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
              <a class="nav-link" href="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
            </li>
          
              
            <hr class="sidebar-divider">

            <div class="sidebar-heading">
              Interface
            </div>
              <li class="nav-item">
                <a class="nav-link collapsed" href="index.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-home"></i>
                  <span>Home</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="products.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-list"></i>
                  <span>Products</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="site_images.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-photo"></i>
                  <span>Images</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="member.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-user"></i>
                  <span>Member</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="blog.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-user"></i>
                  <span>Blog</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link collapsed" href="blogCreate.php" aria-expanded="true" aria-controls="collapseTwo">
                  <i class="fas fa-fw fa-user"></i>
                  <span>Create Blog</span>
                </a>
              </li>

    </ul>
    <div id="content-wrapper" class="d-flex flex-column">

      <div id="content">

        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars">
             </i>
          </button>

          <ul class="navbar-nav ml-auto col-12">

            <li class="nav-item dropdown no-arrow text-primary mx-1 d-flex align-items-center pointer col-md-10">
                <i class="fas fa-fw fa-user mr-2 "></i>
                <b>
                    Welcome to Teeara's Dashboard
                </b>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="nav-item dropdown no-arrow align-self-md-center">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                <img class="img-profile rounded-circle" src="./img/user.png">
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="logout.php" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>    
        <!-- Begin Page Content -->
        <div class="container-fluid">

            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                <h1 class="h5 mb-0 text-gray-600"> 
                    <b>For Support: </b>  <i class="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 7410593087
                    <i class="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
                    teearastore@gmail.com</i>
                </h1>
            </div>
  
            <!-- Content Row -->
            <div class="row">
            
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Member</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800" id="total">  </div>
                                    </div>
                                    <div class="col-auto">
                                    <i class="fas fa-check fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <a href="blogCreate.php">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 h1"></div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="total"> Create New Blog </div>
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-plus fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

            </div>
  
            <!-- Content Row -->
  
            <div class="row">
  
              <!-- Area Chart -->
              
              <!-- Content Column -->
                <div class="col-xl-12 mb-4">
  
                  <!-- Project Card Example -->
                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">Blog Details</h6>
                    </div>
                    <div class="card-body row">

                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Open</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      <?php 

                            if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                              $id = $row['id'];
                              $title = $row['title'];
                              $date = $row['dop'];
                              $lengths++;
                            ?>

                                <tr>
                                      <th scope="row"><?php echo $id ?></th>
                                      <td> <?php echo $title; ?> </td>
                                      <td> <?php echo $date; ?>  </td>
                                      <td> <input type="button" class="btn btn-outline-primary" value="Open" onclick="window.location='https://teeara.in/blog/post.php?id=<?php echo $id  ?>' "> </td>
                                      <td> <input type="button" class="btn btn-outline-danger" value="Delete" onclick="window.location='blogDelete.php?id=<?php echo $id; ?> ' "> </td>
                                </tr>
                              <?php

                            }
                          }

                            ?>

                        </tbody>
                      </table>


                    </div>
                  </div>
                  
                </div>
        
  
            
            </div>
  
      
  
          </div>
  
      </div>

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Adyfi 2020</span>
          </div>
        </div>
      </footer>

    </div>

  </div>

  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a class="btn btn-primary" href="logout.php">Logout</a>
        </div>
      </div>
    </div>
  </div>


<!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="js/sb-admin-2.min.js"></script>

  <script>
        function updateTotal(){
          document.getElementById("total").innerHTML = "<?php echo $lengths ; ?> " ; 
        }updateTotal();
  </script>
</body>

</html>
