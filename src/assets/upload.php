<?php
header("Access-Control-Allow-Origin: *");

if( $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status'=> false));
    exit;
}

$path = 'assets/icon/';

if(isset($_FILES['file'])){
    $originalName = $_FILES['file']['name'];
    $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);

    $generatedName = $_POST['name'].$ext;
    $filePath = $path.$generatedName;

    if(!is_writable($path)){
        echo json_encode(array(
            'status'=> false,
            'msg'   => 'Destination directory not writable'
        ));
        exit;
    }

    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        echo json_encode(array(
            'status'        => true,
            'originalName'  => $originalName,
            'generatedName' => $generatedName
        ));
    }

} else {
    echo json_encode( array(
        'status' => false,
        'msg' => 'No file uploaded'
    ));
    exit;
}

?>