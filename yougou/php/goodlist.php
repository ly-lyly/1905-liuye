<?php
require "conn.php";
$result=mysql_query("select * from yougou");
$dataarr=array();
for($i=0;$i<$result->num_rows;$i++){
    $dataarr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
}
echo json_encode($dataarr);