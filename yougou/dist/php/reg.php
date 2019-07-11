<?php
require "conn.php";
if(isset($_POST['mobile'])){
    $name=$_POST['mobile'];
    $result=$conn->query("select * from reglogin where username='$name'");

    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
    
}
else{
    echo('非法操作');
}
// if(isset($_POST['password1'])&&isset($_POST['email'])&&isset($_POST['mobile'])){
//     $email=$_POST['email'];
//     $password=sha1($_POST['password1']);
//     $result=$conn->query("insert reglogin values('$name','$password',null,'$email')");
//     header('location:http://10.31.158.19/1905-liuye/yougou/src/login.html');
// }


if(isset($_POST['submit'])){
    $username=$_POST['mobile'];
    $password=sha1($_POST['password1']);
    $email=$_POST['email'];
    $conn->query("insert reglogin values('$username','$password',null,'$email')");
    header('location:http://10.31.158.19/1905-liuye/yougou/src/login.html');
}