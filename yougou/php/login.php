<?php
require "conn.php";
if(isset($_POST['username'])&&isset($_POST['password'])){
    $user=$_POST['username'];
    $pass=sha1($_POST['password']);
    $result=$conn->query("select * from reglogin where username='$user' and password='$pass' ");

    if($result->fetch_assoc()){//登录成功
        echo true;
    }else{//登录失败
        echo false;
    }
}