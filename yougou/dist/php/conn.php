<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','yougou');
$conn=@new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error){
    die('数据库连接失败:'.$conn->connect_error);
}
$conn->query('SET NAMES UTF8');