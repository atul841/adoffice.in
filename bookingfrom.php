<?php
$servername = "localhost";
$username = "root";  // XAMPP ke liye default "root" hota hai
$password = "";  // XAMPP me password blank hota hai
$database = "my_database";

// Database Connection
$conn = new mysqli($servername, $username, $password, $database);

// Connection Check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form Data Receive
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $room-selection = $_POST['room-selection'];
    $message = $_POST['message'];


    // SQL Query to Insert Data
    $sql = "INSERT INTO users (name, email ,phone ,room-selection , message  ) VALUES ('$name', '$email', '$phone' , '$room-selection', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close Connection
$conn->close();
?>
