<?php
require_once 'connect.php';

if (isset($_POST['submit'])){
    if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['password-repeat'])) {
        $mail = $_POST['email'];
        $pass = $_POST['password'];
        $repass = $_POST['password-repeat'];
    }
}
else{

    echo "blad";
}

//echo $login;

$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);

if ($polaczenie->connect_errno!=0)
{
    echo "Error: ".$polaczenie->connect_errno;
}
else
{
   // echo "dobrze";
$sql = $polaczenie->prepare("INSERT INTO users (email,password) VALUES (?,?)");
//echo "dobrze";

$sql->bind_param("ss", $mail, $pass);           // błąd różne typy?

//echo "dobrze";

//$sql -> bindParam(":login", $login);
//$sql -> bindParam(":haslo", $password);

//$sql -> bindValue(":email", $mailik);
//$sql -> bindValue(":numertelefonu", $number);

$result = $sql -> execute();
$polaczenie->close();
header('Location: /PWI/html/index.html');
var_dump($result);
}

?>