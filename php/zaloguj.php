<?php

session_start();

if((!isset($_POST['email'])) || (!isset($_POST['password'])))
{
    header('Location: index.php');
    exit();
}

require_once "connect.php";

$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
	
	if ($polaczenie->connect_errno!=0)
	{
		echo "Error: ".$polaczenie->connect_errno;
	}
	else
	{
		$login = $_POST['email'];
		$haslo = $_POST['password'];
		
		$login = htmlentities($login, ENT_QUOTES, "UTF-8"); // sql injection protection
		$haslo = htmlentities($haslo, ENT_QUOTES, "UTF-8");
		
		
		if ($rezultat = @$polaczenie->query(
		sprintf("SELECT * FROM users WHERE email='%s' AND `password`='%s'",
		mysqli_real_escape_string($polaczenie,$login),					//
		mysqli_real_escape_string($polaczenie,$haslo))))



		{
			$ilu_userow = $rezultat->num_rows;
			if($ilu_userow>0)
			{
				$_SESSION['zalogowany'] = true;
				
				$wiersz = $rezultat->fetch_assoc();
				$_SESSION['id'] = $wiersz['id'];
				$_SESSION['email'] = $wiersz['email'];
	
				
				//ciasteczka

$cookie_name = $wiersz['login'];

$cookie_value = $wiersz['email'];
        
        setcookie($cookie_name, $cookie_value, (86400 * 30)); // 86400 = 1 dzień ustawienie ciasteczek nie działa
        $_COOKIE['cookie_name'] = $cookie_name;
        $_COOKIE['cookie_value'] = $cookie_name;
        // ustawienie ciasteczek


				unset($_SESSION['blad']);
				$rezultat->free_result();
				header('Location: gra.php');
				
			} else {
				
				$_SESSION['blad'] = '<span style="color:red">Nieprawidłowy login lub hasło!</span>';
				header('Location: /PWI/html/indexy.html');
				
			}
		}
		
		$polaczenie->close();
	}

?>