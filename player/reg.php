<?php

error_reporting(E_ALL ^ E_DEPRECATED);
header("Content-type: text/html; charset=utf-8");
$con = mysql_connect('localhost','root');
mysql_select_db('player');
mysql_query('set names utf8');

@$username = $_POST['username'];

$sql = "select * from reg where username = '$username'";

$query = mysql_query($sql);

if($query && mysql_num_rows($query)){
    echo "<script>alert('didudidu~')</script>";
    echo "<script>history.back()</script>";
}
else {
    $sql = "insert into reg(username) value('$username')";
    $query = mysql_query($sql);
    if($query){
        echo "<script>alert('注册成功')</script>";
        echo "<script>window.location = 'http://voidsky.cn/';</script>";
    }
}

?>