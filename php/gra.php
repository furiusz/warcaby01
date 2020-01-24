<?php

    session_start();
    
	if (!isset($_SESSION['zalogowany']))
	{
		header('Location: index.php');
		exit();
	}
	
?>

<!DOCTYPE html>
<html lang="pl">
    <head>
            <title>Gra w warcaby online</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/PWI/css/style.css" type="text/css"/>
            <script src="/PWI/javascript/gra.js"></script>

        <script>
            function showHint(str) {
                if (str.length == 0) { 
                    document.getElementById("txtHint").innerHTML = "";
                    return;
                } else {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            document.getElementById("txtHint").innerHTML = this.responseText;
                        }
                    };
                    xmlhttp.open("GET", "gethint.php?q=" + str, true);
                    xmlhttp.send();
                }
            }
        </script>           
    </head>
    <body>
        <header>
            <img alt="Logo" src="/PWI/media/logo.png" width="100px" height="100px">
            <h1>Warcaby online</h1>
            <ul>
                <li><a href="/PWI/html/index.html" class="active">HOME</a></li>
                <li><a href="/PWI/html/logowanie.html">Logowanie</a></li>
                <li><a href="/PWI/html/zasady.html">Zasady gry</a></li>
            </ul>
        </header>
        <section> 
            <div id="logowanie">
                <?php
                    echo "<p>Witaj ".$_SESSION['email'].'! [ <a href="logout.php">Wyloguj się!</a> ]</p>';
                  //  echo "<p><b>E-mail</b>: ".$_SESSION['email'];
            
                    if(!isset($_COOKIE[$cookie_name])) {
                    echo "<br>Cookie named '" . $_SESSION['cookie_name'] . "' is not set!";
                    } else {
                    echo "<br>Cookie '" . $_SESSION['cookie_name'] . "' is set!<br>";
                    echo "Value is: " . $_COOKIE[$cookie_name];
                    }
                ?>    
            </div>
        </section>
        <section>   
            <div id="gra">
                <input class="button-generate" type="button" value="Nowa plansza" onclick="gra()">   
            </div>
            <div id ="komentarz">komentarz:</div>
        </section>
        <footer>         
            <div id="stopka">
                Wyszukaj innych graczy: <br>
                <form>
                    <input type="text" onkeyup="showHint(this.value)">
                </form>
                <p>Gracze: <span id="txtHint"></span></p>
            </div>
        </div>
        </footer>            
    </body>
    
</html>
