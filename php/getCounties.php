<?php
require_once ('constants_live.php'); 
	
	
$db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if (mysqli_connect_errno()) {
		printf("Connect failed: %s", mysqli_connect_error());
		exit;
}

//build a query on the database
$q = "SELECT distinct County FROM `pa_lawmakers` order by County";
$result = $db->query($q);

while($row = $result->fetch_array(MYSQLI_ASSOC)) {
	$data[] = $row["County"];
}
$db->close();
echo json_encode($data);
?>