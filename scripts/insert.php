<?php
    $dbhost = 'cryptodraw.cwxzasapwhrm.us-west-2.rds.amazonaws.com:3306';
    $dbuser = 'cryptodraw';
    $dbpass = '';
    $conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql');
    $dbname = 'db';

    mysql_select_db($dbname);
    $id = $_POST['id'];
    $sql = "INSERT INTO cryptodraw (imgHash, userId, license, time, children)
        VALUES ('placeholder', $id, 'by', 'None', 'None')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
?>