<?php
require "conn.php";
if(isset($_POST['mobile'])){
    $name=$_POST['mobile'];
    $result=$conn->query("select * from reglogin where username='$name'");
    // echo $result;
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
    // echo 4585875;
}
else{
    echo('非法操作');
}
if(isset($_POST['submit'])){
    $username=$_POST['mobile'];
    $password=sha1($_POST['password1']);
    $email=$_POST['email'];
    $conn->query("insert reglogin values('$username','$password',null,'$email')");
    header('location:http://localhost/1905-liuye/yougou/src/login.html');
}