<?PHP

error_reporting(E_ALL ^ E_DEPRECATED);
header("Content-type: text/html; charset=utf-8");
$con = mysql_connect('localhost','root');
mysql_select_db('player');
mysql_query('set names utf8');

$sql = "select name , musicName from music_list";

$query = mysql_query($sql);

if($query  && mysql_num_rows($query)){
    while($row = mysql_fetch_assoc($query)){
        $data[] = $row;
    }
    echo json_encode($data);
}
?>