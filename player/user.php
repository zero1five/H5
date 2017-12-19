<?php

error_reporting(E_ALL ^ E_DEPRECATED);
header("Content-type: text/html; charset=utf-8");
$con = mysql_connect('localhost','root');
mysql_select_db('player');
mysql_query('set names utf8');

@$username = $_REQUEST['username'];

$sql = "select * from reg where username = '$username'";

$query = mysql_query($sql);

if($query && mysql_num_rows($query)){
    echo '{"code":0 , "message" : "已经有人注册过啦"}'; 
}
else{
    echo '{"code":1 , "message" : "可以注册"}'; 
}

?>