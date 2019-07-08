<?php

require "conn.php";

if(isset($_GET['id'])){
    $sid=$_GET['id'];

    $result=$conn->query("select * from yougou where id=$sid ");

    echo json_encode($result->fetch_assoc());

}