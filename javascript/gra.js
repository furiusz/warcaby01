//"use strict"; 

let currentSelectedField = null;

function gra(){
    var wiersze = 8;
    var kolumny = 8;
    var board = [];
    
    stworzenieplanszy(wiersze, kolumny);
    ustawienie(wiersze, kolumny);
    rozp_gry(wiersze,kolumny,board);

   // ruch();
 
};

// create element div zrobione podczas bicia pionkow
// zrobic walidacje
// use strict dolaczyc
// html 5 canvas lub inne dorzucic
// musi byc ajax


function stworzenieplanszy(wiersze,kolumny){ 
    var content="";   
    var plansza="";
    
    plansza = "<table id='szachownica'>";
    var i;
    for (i = 0; i<wiersze ; i++){
        plansza += "<tr>";
        var c;
            for (c = 0; c<kolumny; c++){
                var id=bbId(i,c);    
                plansza += "<td><div class=\"boardButton\" id=\""+id+"\"></div></td>"; 
            }
        plansza += "</tr>";
    }
    plansza += "</table>";
    content+= plansza;
    //console.log(plansza);
    document.getElementById("gra").innerHTML = content;
        
    //kolorowanie planszy
    for (i=0; i<wiersze; i++){
        for (c=0; c<kolumny; c++){
            if ((i+c)%2 == 0){
                 //var zmienna_czarna ="c";
                var lokalizacja = bbId(i,c);
                var biala = document.getElementById(lokalizacja);
                biala.style = "background-color:white; height: 40px; width: 40px; line-height: 40px;";
                //document.getElementById(lokalizacja).innerHTML = zmienna_czarna;
            } else {
                //var zmienna= "a";
                var tekst = bbId(i,c);
                var czarna = document.getElementById(tekst);
                czarna.style = "background-color:lightgrey;height: 40px; width: 40px; line-height: 40px;";
                //document.getElementById(tekst).innerHTML = zmienna;
            }
        }     
    }
};
    
function bbId(row,col){
    return "bb_"+row+"_"+col + "";
};

function ustawienie(wiersze,kolumny){      //ustawienie pionków na planszy pozycja startowa   
    for (i=0; i<wiersze; i++){
        for (c=0; c<kolumny; c++){
            if((i+c)%2 == 1){
                if(i == 0 || i == 1 || i == 2){
                  var lokalizacja = bbId(i,c);
                  var pionek = "<img src=\"\/PWI\/media\/pionekbialy.png\" id=\"pionekbialy\" \/>"; 
                //  console.log(pionek.toString)//
                  document.getElementById(lokalizacja).innerHTML = pionek;
                }
                else if(i == 5 || i == 6 || i == 7 ){
                    var pionek = "<img src=\"\/PWI\/media\/pionekczarny.png\" id=\"pionekczarny\"  \/>"; //
                    var lokalizacja = bbId(i,c);
                    document.getElementById(lokalizacja).innerHTML = pionek;
                }
                else{
                //  var lokalizacja = bbId(i,c);
                // document.getElementByid(lokalizacja).innerHTML // dodać diva o pustym polu tak zeby potem sprawdzac czy jest puste na podstawie childnodes
                }
            }    
        }
    }  
};

function rozp_gry(wiersze,kolumny,board){   
    var liczba=0;
    for (i =0; i<wiersze; i++){
        for (c=0; c<kolumny; c++){
            var id = bbId(i,c);
            board[liczba]= id;
            liczba++;
            var lokalizacja=document.getElementById(id);
            lokalizacja.addEventListener("click",ruch);
        }
    }  
};

markField = (fieldId) => {
    if (currentSelectedField) {
        const unselectElement = document.querySelector(`#${currentSelectedField}`);
        unselectElement.classList.remove('selected');

    }
    console.log(fieldId);
    const element = document.querySelector(`#${fieldId}`);
    console.log(element);
    currentSelectedField = fieldId
}

function ruch(e){
    //console.log(e);
    var id = this.id;
    markField(id);
    console.log("Tu jestem: " +id);
    var pionek = e.target.id;
    console.log(pionek);
    var wynik = [];
    wynik = sprawdzenie_planszy();

    console.log(wynik);
    var iloscbialych = 12;
    var iloscczarnych = 12;
    //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var tablica_elementow = wynik[1];

    if (wynik[0] == 0){
        zaznaczniebialych(id,pionek);
    }
    else if (wynik[0] == 2){
        //przesuniecie pionka wczesniej zaznaczonego
        ruchbialych(id, tablica_elementow);
    }
    else if(wynik[0] == 3){
        //zaznacznie pionka czarnego
        zaznacznieczarnych(id,pionek);
    }
    else if (wynik[0] == 4){
        ruchczarnych(id, tablica_elementow);
        // ruch pionka czarnego
    }
    console.log("koniecgry");
};

function sprawdzenie_planszy(){             //funkcja sprawdzajaca czy na planszy jest juz zaznaczenie pola na ktore mozna ruszyc
    var liczba = 0;
    var kolummna = 8;
    var wierszz = 8;
    var czy_zaznaczona = [];
    var kolejnosc;
    kolejnosc = 0;
    var tablica_elementow = [];
    var sprawdzenie;
    var sprawdzeniee;
    for (i =0; i<wierszz; i++){
        for (c=0; c<kolummna; c++){       
            var id = bbId(i,c);
            sprawdzenie = "";
            sprawdzeniee = "";
            czy_zaznaczona[liczba] = document.getElementById(id).childNodes;
            //console.log(czy_zaznaczona[liczba].length);
            if(czy_zaznaczona[liczba].length > 0) sprawdzenie = czy_zaznaczona[liczba][0].id; 
            if (czy_zaznaczona[liczba].length > 1) sprawdzeniee = czy_zaznaczona[liczba][1].id;
            //console.log(sprawdzeniee);
            //var z = document.getElementById(id[0]).childNodes;
                    
            //console.log("sprawdzenie weszłoooooooooo");
            liczba++;
            if (sprawdzenie == "zaznaczeniebialych" || sprawdzenie == "bicieczarnego" ){        // odpala funkcje ruch bialych
                tablica_elementow.push(id);
                // console.log("znalezione pole zaznaczone dalej nie powinna iść funkcja");
                kolejnosc = 2;
            }
            else if (sprawdzenie == "ruchczarnych"){                        // odpala funkcje zaznaczenieczarnych
                kolejnosc = 3;
                    return [kolejnosc];
            }
            else if (sprawdzenie == "zaznaczenieczarnych"|| sprawdzenie == "biciebialego"){                 // odpala funkcje ruchczarnych
                tablica_elementow.push(id);
                kolejnosc = 4;
            }

            if (sprawdzeniee == "wybranybialy" || sprawdzeniee == "zbijanyczarny"){     //      
                tablica_elementow.push(id);
            }
            else if(sprawdzeniee == "wybranyczarny" || sprawdzeniee == "zbijanybialy" ){
                tablica_elementow.push(id);
            }
        }
    }
    return [kolejnosc, tablica_elementow];
};

function ruchczarnych(idd, tablica_elementow){     
    var zawartosc;
    var element_div;
    var podglad;
    var polenaktorymstanie;
    var polepionkazbijanego;
    podglad = document.getElementById(idd);
    var polezaznaczone;
    pozezaznaczone = idd;

    for (x=0; x< tablica_elementow.length;x++){
        var lokalna;
        lokalna = document.getElementById(tablica_elementow[x]).childNodes;
        console.log(lokalna);
        console.log(lokalna.length);
            
        if (lokalna.length == 1){
            var pomocnicza;
            pomocnicza = lokalna[0].id;
            if (pomocnicza == "biciebialego"){
                polenaktorymstanie = tablica_elementow[x];
            }
            
        }
        else if (lokalna.length == 2 ){    //zbijanyczarny
            var pomocnicza;
            pomocnicza = lokalna[1].id;
            if (pomocnicza == "zbijanybialy"){
                polepionkazbijanego = tablica_elementow[x];
                //lokalizacja zbijanego pionka
            }
        }        
    }

    zawartosc = document.getElementById(idd).childNodes;
    podglad = zawartosc[0];
     //   console.log(zawartosc[0]);
       // console.log(zawartosc[1]);
       // console.log(idd.id);
        
    element_div = zawartosc[0].id;
        
    if (element_div == "zaznaczenieczarnych"){
        var podmiana = zawartosc[0].id;
        podglad.parentNode.removeChild(podglad);
            
        //podmiana.removeChild(this);
        // var poprzedni = document.getElementById(idd).previousSibling.innerHTML;
  
        //idd.removeChild(idd);                     //wtf? usuwa nie to pole co powinno
        //console.log(poprzedni);
           
        // console.log("liczba elementow w tablicy:");
        // console.log(tablica_elementow.length);
        // console.log(tablica_elementow[0]);
        // console.log(tablica_elementow[1]);
        // console.log(tablica_elementow[2]);
        var pionek = "<img src=\"\/PWI\/media\/pionekczarny.png\" id=\"pionekczarny\" \/>"; //
        document.getElementById(idd).innerHTML = pionek;
        
        for (i=0; i< tablica_elementow.length;i++){         
            if(idd == tablica_elementow[i]){   
            }
            else{
             //   console.log(document.getElementById(tablica_elementow[i]).childNodes.length);                                                        // jezeli jest pole z pionkiem to nie ma childnodes bo ma null
                zawartosc = document.getElementById(tablica_elementow[i]).childNodes;
             //   console.log(zawartosc);
                if (zawartosc.length>1){
                    podglad = zawartosc[1];
                    podglad.parentNode.removeChild(podglad);
                }
                podglad = zawartosc[0];
                podglad.parentNode.removeChild(podglad);
            }
        }     
           //dla kazdego elementu tablicy usuniecie childnodes (elementow ktore sa podswietlone) 
    }

    else if(element_div == "biciebialego"){
            
        var podmiana = zawartosc[0].id;
        podglad.parentNode.removeChild(podglad);
                    
        var pionek = "<img src=\"\/PWI\/media\/pionekczarny.png\" id=\"pionekczarny\" \/>"; // pionek staje w miejscu nowym
        document.getElementById(idd).innerHTML = pionek;
                    
        for (i=0; i< tablica_elementow.length;i++){               
            if(idd == tablica_elementow[i]){   
                        
            }
            else{
                // console.log(document.getElementById(tablica_elementow[i]).childNodes.length);                                                        // jezeli jest pole z pionkiem to nie ma childnodes bo ma null
                zawartosc = document.getElementById(tablica_elementow[i]).childNodes;
                // console.log(zawartosc);
                if (zawartosc.length>1){
                    podglad = zawartosc[1];
                    podglad.parentNode.removeChild(podglad);
                }
                podglad = zawartosc[0];
                podglad.parentNode.removeChild(podglad);
            }                
        }              
    }
        
};
        
function zaznacznieczarnych(id, pionek){
    var tura = true; 
    do{
        var zakonczenie_tury = true;
        if (pionek!="pionekczarny"){     //pzerwanie pętli jeżeli gracz wybrał inne pole niż pionek czarny
            document.getElementById("komentarz").innerHTML = "ruch gracza czarnego";
            //console.log("ruch czarnych");   
            break;
        }
            
        do{
            //sprawdzenie czy pionek moze wykonac ruch czy ma mozliwosc ruchu
            var row = Number(id.charAt(3));
            var kol = Number(id.charAt(5));
            //console.log(kol);
            //console.log(row);
            var poprzedni_wiersz = [1];
            var nastepny_wiersz = [1];
            nastepny_wiersz[0] = row + 1;
            poprzedni_wiersz[0] = row -1;
            
            
            var nastepna_kolumna = [2];
            nastepna_kolumna[0] = kol-1;
            nastepna_kolumna[1] = kol+1;
            //var ruch_do_tylu=[2];
            
            var nastepne_id = [];
            nastepne_id[0] = id;                //pole na ktore kliknelismy zostaje przekazane do funkcji i rowniez podswietlone
            var robocza;
            if (nastepny_wiersz[0]>=0 && nastepny_wiersz[0]<=7 && nastepna_kolumna[0] >= 0 && nastepna_kolumna[0] <= 7){
                robocza = bbId(nastepny_wiersz[0],nastepna_kolumna[0]);
                var zawartosc = document.getElementById(robocza).childNodes;
               // if(zawartosc.length == 0){
               //     nastepne_id.push(robocza);    
               // }
                if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekczarny" ){
                        console.log(robocza);
                        nastepne_id.push(robocza);
                    }
                }
            
            }
    
            if (nastepny_wiersz[0]>=0 && nastepny_wiersz[0]<=7 && nastepna_kolumna[1] >= 0 && nastepna_kolumna[1] <= 7){
                robocza = bbId(nastepny_wiersz[0],nastepna_kolumna[1]);
                var zawartosc = document.getElementById(robocza).childNodes;
                console.log(zawartosc)      
                // if(zawartosc.length == 0){
                //     nastepne_id.push(robocza);    
                // }
                if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekczarny" ){
                        console.log(robocza);
                        nastepne_id.push(robocza);
                    }
                }
                    
            }

            if (poprzedni_wiersz[0]>=0 && poprzedni_wiersz[0]<=7 && nastepna_kolumna[0] >= 0 && nastepna_kolumna[0] <= 7){
                robocza = bbId(poprzedni_wiersz[0],nastepna_kolumna[0]);
                var zawartosc = document.getElementById(robocza).childNodes;
                if(zawartosc.length == 0){
                    nastepne_id.push(robocza);    
                }
                else if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekczarny" ){
                        nastepne_id.push(robocza);
                    }
                }
                
            }
    
            if (poprzedni_wiersz[0]>=0 && poprzedni_wiersz[0]<=7 && nastepna_kolumna[1] >= 0 && nastepna_kolumna[1] <= 7){
                robocza = bbId(poprzedni_wiersz[0],nastepna_kolumna[1]);
                var zawartosc = document.getElementById(robocza).childNodes;
                if(zawartosc.length == 0){
                    nastepne_id.push(robocza);    
                }
                else if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekczarny" ){
                        nastepne_id.push(robocza);
                    }
                }
                
            }     
             
            sprawdzenie_zawartosci_czarnych(nastepne_id);
            //if (nastepne_id[0].target.id =="pionekbialy"
            
            // ruch czarnych
            zakonczenie_tury = false;
            }while(zakonczenie_tury == true);
          
        tura = false;
    }while(tura == true);
    return nastepne_id;
};

function sprawdzenie_zawartosci_czarnych(id){    
    var zawartosc_pola_zaznaczanego;
    var zawartoscid=[];    // tablica zawierająca id danych pól może posiadać puste pole, pionek biały lub pionek czarny, lub wybrany na koncu funkcji
    var roww; 
    var koll;
    zawartosc_pola_zaznaczanego = document.getElementById(id[0]).childNodes;     //element klikniety
    zawartoscid[0]= zawartosc_pola_zaznaczanego[0].id;                           // ustawienie id elementu kliknietego
    console.log(zawartoscid[1]);
    
    for (i=0; i<id.length;i++){
        if (id[i]!=null){
            roww = Number(id[i].charAt(3));         // funkcja wykonuje sie gdy id jest różne od null
            koll = Number(id[i].charAt(5));
            if (roww>=0 && koll >= 0 && roww <=7 && koll<=7){
                zawartosc_pola_zaznaczanego = document.getElementById(id[i]).childNodes;
                //console.log("zawartosc.length")
            }
            if (zawartosc_pola_zaznaczanego.length == 0 && zawartosc_pola_zaznaczanego != null){
                zawartoscid[i] = "pustepoleczarnych";
            }   
            else if (zawartosc_pola_zaznaczanego.length>0){
                zawartoscid[i] = zawartosc_pola_zaznaczanego[0].id;
            }
        }
        else if (id[i] == null){              // kiedy id jest równe null to ustawiamy row i kol poza granice i zawartoscid ustawiamy jako pozaplansza
            row =20;
            kol =20;
            zawartosc = null;     // przesłane pole jest wcześniej 
            zawartoscid[i] = "pozaplansza";
        }
        
        if(zawartoscid[i] == "pionekbialy"){
            //    console.log("pionekbialy_brak mozliwosci ruchu");
            var lok = id[i];
            var lok_kliknietego = id[0];
            podswietlenie_bicie_bialego(lok_kliknietego,lok);
        }
        else if(zawartoscid[i] == "pionekczarny"){
            //    console.log("pionekczarny sprawdzmy pola obok");          // tutaj bedzie wywołanie sprawdzające następnych sąsiadów czy jest możliwość bicia pionków 2 lub 3 lub 4...
        }
        else if(zawartoscid[i]== "pozaplansza"){
            //     console.log("polepozaplansza");     
        }
        else if (zawartoscid[i] == "pustepoleczarnych") {
            var dodanie;
            var element = document.createElement("div");  //id = 'znaznaczenie'
            element.id = "zaznaczenieczarnych";
            dodanie = document.getElementById(id[i]);     // pobranie lokalizacji pola pustego zmienna dodanie posluzy do dodania pola div o id zaznacznie
            dodanie.appendChild(element);                        //dodanie nowego pola do planszy o id zaznaczenie (bedzie sugerowalo pola w ktore mozna sie przesunac,   
                // jezeli dodano puste pole to takze nalezy podswietlic pionka ktory byl klikniety
            var z = document.getElementById(id[0]).childNodes;
            //   console.log(z.length);
            if (z.length < 2 ){   
                var klikniety;
                var typ;
                typ = document.createElement("div");           // stworzenie nowego elementu div
                typ.id = "wybranyczarny";                       // nadanie nowemu elementowi div id wybrany
                klikniety = document.getElementById(id[0]);   // klikniety otrzymał lokalizacje elementu kliknietego
                klikniety.appendChild(typ);                   // dodanie elementowi kliknietemu nowego diva ktory ma id wybrany
            }
        }
    }
    //console.log(zawartoscid[0], "_", zawartoscid[1], "_",zawartoscid[2], "_",zawartoscid[3], "_",zawartoscid[4], "_");
    var el = document.getElementById(bbId(0,0)).childNodes;           // usuniecie pola wyboru ruchu czarnych
    var usuwany = el[0];
    usuwany.parentNode.removeChild(usuwany);
};

function podswietlenie_bicie_bialego(lok_kliknietego, lok){
    var Row = Number(lok_kliknietego.charAt(3));        // numer wiersza elementu kliknietego
    var Kol = Number(lok_kliknietego.charAt(5));        // numer kolumny elementu kliknietego
    var Wiersz = Number(lok.charAt(3));                 // numer wiersza pola czarnego przeciwnika
    var Kolumna = Number(lok.charAt(5));                // numer kolumny pola czarnego przeciwnika
    var nowelokalizacje = [];
    var poleczarnych = [];
    if (Row < Wiersz && Kol < Kolumna){ 
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row + 2;
        nowakolumna = Kol+2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row+1,Kol+1));
        }
        
    }
    if (Row < Wiersz && Kol > Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row + 2;
        nowakolumna = Kol-2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row+1,Kol-1));
        }
    }
    if (Row > Wiersz && Kol < Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row - 2;
        nowakolumna = Kol+2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row-1,Kol+1));
        }
    }
    if (Row > Wiersz && Kol > Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row - 2;
        nowakolumna = Kol-2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row-1,Kol-1));
        }
    }
    for (c=0; c<nowelokalizacje.length;c++){
        var zawartoscc = document.getElementById(nowelokalizacje[c]).childNodes;
        var zawartoscidd = [];
        //console.log("zawartosc.length")
            
        if (zawartoscc.length == 0){
            zawartoscidd[c] = "pustepoleczarnych";
        }
        else if (zawartoscc.length>0){
            zawartoscidd[c] = zawartoscc[0].id;
        }
    
        if(zawartoscidd[c] == "pionekbialy"){
            //console.log("pionekbialy_brak mozliwosci ruchu"); //nie mozna wykonac bicia
        }
        else if(zawartoscidd[c] == "pionekczarny"){
            // jezeli w polu docelowym jest czarny pionek tzn ze nie mozna wykonac bicia
        }
        else if(zawartoscidd[c]== "pozaplansza"){
            //console.log("polepozaplansza");
                
        }
        else if (zawartoscidd[c] == "pustepoleczarnych") {
            var Dodanie;
            var Element = document.createElement("div");  //id = 'znaznaczenie'
            Element.id = "biciebialego";                   // podswietlenie dla biciaczarnego
            Dodanie = document.getElementById(nowelokalizacje[c]);     // pobranie lokalizacji pola pustego zmienna dodanie posluzy do dodania pola div o id zaznacznie
            Dodanie.appendChild(Element);                        //dodanie nowego pola do planszy o id zaznaczenie (bedzie sugerowalo pola w ktore mozna sie przesunac,   
                // jezeli dodano puste pole to takze nalezy podswietlic pionka ktory byl po drodze czarnym pionkiem
            var Dodaniee;
            var Elementt;
            
            Elementt = document.createElement("div");
            Elementt.id = "zbijanybialy";
            Dodaniee = document.getElementById(poleczarnych[c]);
            Dodaniee.appendChild(Elementt);
                    //uzyj tablicy poleczarnych i dodaj diva o id bitypionek
        }
    
    }
    
};

function zaznaczniebialych(id, pionek){
    // row kol poprzedni_wiersz nastepny_wiersz nastepna_kolumna nastepne_id robocza zawartosc
    var tura = true; 
    do{
        var zakonczenie_tury = true;
        if (pionek!="pionekbialy"){     //pzerwanie pętli jeżeli gracz wybrał inne pole niż pionek biały
            document.getElementById("komentarz").innerHTML = "ruch gracza białego";
            //  console.log("ruch białych");   
            break;
        }

        do{
            //sprawdzenie czy pionek moze wykonac ruch czy ma mozliwosc ruchu
            var row = Number(id.charAt(3));
            var kol = Number(id.charAt(5));
            //console.log(kol);
            //console.log(row);
            var poprzedni_wiersz = [1];
            var nastepny_wiersz = [1];
            nastepny_wiersz[0] = row + 1;
            poprzedni_wiersz[0] = row -1;
          
            var nastepna_kolumna = [2];
            nastepna_kolumna[0] = kol-1;
            nastepna_kolumna[1] = kol+1;
            //var ruch_do_tylu=[2];
            
            var nastepne_id = [];
            nastepne_id[0] = id;                //pole na ktore kliknelismy zostaje przekazane do funkcji i rowniez podswietlone
            var robocza;
            if (nastepny_wiersz[0]>=0 && nastepny_wiersz[0]<=7 && nastepna_kolumna[0] >= 0 && nastepna_kolumna[0] <= 7){
                robocza = bbId(nastepny_wiersz[0],nastepna_kolumna[0]);
                var zawartosc = document.getElementById(robocza).childNodes;
                if(zawartosc.length == 0){
                    nastepne_id.push(robocza);    
                }
                else if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekbialy" ){
                        nastepne_id.push(robocza);
                    }
                }
            
            }
       
            if (nastepny_wiersz[0]>=0 && nastepny_wiersz[0]<=7 && nastepna_kolumna[1] >= 0 && nastepna_kolumna[1] <= 7){
                robocza = bbId(nastepny_wiersz[0],nastepna_kolumna[1]);
                var zawartosc = document.getElementById(robocza).childNodes;
                if(zawartosc.length == 0){
                    nastepne_id.push(robocza);    
                }
                else if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekbialy" ){
                        nastepne_id.push(robocza);
                    }
                }
            }

            if (poprzedni_wiersz[0]>=0 && poprzedni_wiersz[0]<=7 && nastepna_kolumna[0] >= 0 && nastepna_kolumna[0] <= 7){
                robocza = bbId(poprzedni_wiersz[0],nastepna_kolumna[0]);
                var zawartosc = document.getElementById(robocza).childNodes;
                //  if(zawartosc.length == 0){
                //     nastepne_id.push(robocza);    
                //  }
                if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekbialy" ){
                        nastepne_id.push(robocza);
                    }
                }
            
            }

            if (poprzedni_wiersz[0]>=0 && poprzedni_wiersz[0]<=7 && nastepna_kolumna[1] >= 0 && nastepna_kolumna[1] <= 7){
                robocza = bbId(poprzedni_wiersz[0],nastepna_kolumna[1]);
                var zawartosc = document.getElementById(robocza).childNodes;
                //  if(zawartosc.length == 0){
                //    nastepne_id.push(robocza);    
                //   }
                if(zawartosc.length>0){
                    if (zawartosc[0].id!= "pionekbialy" ){
                        nastepne_id.push(robocza);
                    }
                }
            
            }     
               
            sprawdzenie_zawartosci(nastepne_id);
            //if (nastepne_id[0].target.id =="pionekbialy"
        
        
            // ruch czarnych
            zakonczenie_tury = false;
        }while(zakonczenie_tury == true);
      
    tura = false;
    }while(tura == true);
    return nastepne_id;
};

function sprawdzenie_zawartosci(id){
    // zawartosc_pola    roww koll lok lok_kliknietego
    var zawartosc_pola_zaznaczanego;
    var zawartoscid=[];    // tablica zawierająca id danych pól może posiadać puste pole, pionek biały lub pionek czarny, lub wybrany na koncu funkcji
    var roww; 
    var koll;
    zawartosc_pola_zaznaczanego = document.getElementById(id[0]).childNodes;     //element klikniety
    zawartoscid[0]= zawartosc_pola_zaznaczanego[0].id;                           // ustawienie id elementu kliknietego
    console.log(zawartoscid[1]);

    for (i=0; i<id.length;i++){
        if (id[i]!=null){
            roww = Number(id[i].charAt(3));         // funkcja wykonuje sie gdy id jest różne od null
            koll = Number(id[i].charAt(5));
            if (roww>=0 && koll >= 0 && roww <=7 && koll<=7){
                zawartosc_pola_zaznaczanego = document.getElementById(id[i]).childNodes;
                //console.log("zawartosc.length")
            }
            if (zawartosc_pola_zaznaczanego.length == 0 && zawartosc_pola_zaznaczanego != null){
                zawartoscid[i] = "pustepolebialych";
            }
            else if (zawartosc_pola_zaznaczanego.length>0){
                zawartoscid[i] = zawartosc_pola_zaznaczanego[0].id;
            }
        }

        else if (id[i] == null){              // kiedy id jest równe null to ustawiamy row i kol poza granice i zawartoscid ustawiamy jako pozaplansza
            roww =20;
            koll =20;
            zawartosc_pola_zaznaczanego = null;     // przesłane pole jest wcześniej 
            zawartoscid[i] = "pozaplansza";
        }
    
        if(zawartoscid[i] == "pionekbialy"){
        //console.log("pionekbialy_brak mozliwosci ruchu");
        }
        else if(zawartoscid[i] == "pionekczarny"){
            var lok = id[i];
            var lok_kliknietego = id[0];
            console.log(lok);
            console.log(lok_kliknietego);

            podswietlenie_bicie_czarnego(lok_kliknietego,lok);

            console.log("pionekczarny sprawdzmy pola obok");          // tutaj bedzie wywołanie sprawdzające następnych sąsiadów czy jest możliwość bicia pionków 2 lub 3 lub 4...
        }
        else if(zawartoscid[i]== "pozaplansza"){
            //console.log("polepozaplansza");
        
        }
        else if (zawartoscid[i] == "pustepolebialych") {
            var dodanie;
            var element = document.createElement("div");  //id = 'znaznaczenie'
            element.id = "zaznaczeniebialych";
            dodanie = document.getElementById(id[i]);     // pobranie lokalizacji pola pustego zmienna dodanie posluzy do dodania pola div o id zaznacznie
            dodanie.appendChild(element);                        //dodanie nowego pola do planszy o id zaznaczenie (bedzie sugerowalo pola w ktore mozna sie przesunac,   
                // jezeli dodano puste pole to takze nalezy podswietlic pionka ktory byl klikniety
            var z = document.getElementById(id[0]).childNodes;
            //console.log(z.length);
            if (z.length < 2 ){   
                var klikniety;
                var typ;
                typ = document.createElement("div");           // stworzenie nowego elementu div
                typ.id = "wybranybialy";                       // nadanie nowemu elementowi div id wybrany
                klikniety = document.getElementById(id[0]);   // klikniety otrzymał lokalizacje elementu kliknietego
                klikniety.appendChild(typ);                   // dodanie elementowi kliknietemu nowego diva ktory ma id wybrany
            }
        }
    
    }
    //console.log(zawartoscid[0], "_", zawartoscid[1], "_",zawartoscid[2], "_",zawartoscid[3], "_",zawartoscid[4], "_");   
};

function podswietlenie_bicie_czarnego(lok_kliknietego, lok){
    var Row = Number(lok_kliknietego.charAt(3));        // numer wiersza elementu kliknietego
    var Kol = Number(lok_kliknietego.charAt(5));        // numer kolumny elementu kliknietego
    var Wiersz = Number(lok.charAt(3));                 // numer wiersza pola czarnego przeciwnika
    var Kolumna = Number(lok.charAt(5));                // numer kolumny pola czarnego przeciwnika
    var nowelokalizacje = [];
    var poleczarnych = [];
    if (Row < Wiersz && Kol < Kolumna){ 
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row + 2;
        nowakolumna = Kol+2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row+1,Kol+1));
        }
    }
    if (Row < Wiersz && Kol > Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row + 2;
        nowakolumna = Kol-2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row+1,Kol-1));
        }
    }
    if (Row > Wiersz && Kol < Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row - 2;
        nowakolumna = Kol+2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row-1,Kol+1));
        }
    }
    if (Row > Wiersz && Kol > Kolumna){
        var nowywiersz;
        var nowakolumna;
        nowywiersz = Row - 2;
        nowakolumna = Kol-2;
        if (nowywiersz>=0 && nowywiersz<=7 && nowakolumna >= 0 && nowakolumna <= 7){
            nowelokalizacje.push(bbId(nowywiersz,nowakolumna));
            poleczarnych.push(bbId(Row-1,Kol-1));
        }
    }
    for (c=0; c<nowelokalizacje.length;c++){
        var zawartoscc = document.getElementById(nowelokalizacje[c]).childNodes;
        var zawartoscidd = [];
        //console.log("zawartosc.length")
        
        if (zawartoscc.length == 0){
            zawartoscidd[c] = "pustepolebialych";
        }
    
        else if (zawartoscc.length>0){
        zawartoscidd[c] = zawartoscc[0].id;
        }

        if(zawartoscidd[c] == "pionekbialy"){
            //console.log("pionekbialy_brak mozliwosci ruchu"); //nie mozna wykonac bicia
        }
        else if(zawartoscidd[c] == "pionekczarny"){
            // jezeli w polu docelowym jest czarny pionek tzn ze nie mozna wykonac bicia
        }
        else if(zawartoscidd[c]== "pozaplansza"){
            //console.log("polepozaplansza");
            
        }
        else if (zawartoscidd[c] == "pustepolebialych") {
            var Dodanie;
            var Element = document.createElement("div");  //id = 'znaznaczenie'
            Element.id = "bicieczarnego";                   // podswietlenie dla biciaczarnego
            Dodanie = document.getElementById(nowelokalizacje[c]);     // pobranie lokalizacji pola pustego zmienna dodanie posluzy do dodania pola div o id zaznacznie
            Dodanie.appendChild(Element);                        //dodanie nowego pola do planszy o id zaznaczenie (bedzie sugerowalo pola w ktore mozna sie przesunac,   
                // jezeli dodano puste pole to takze nalezy podswietlic pionka ktory byl po drodze czarnym pionkiem
            var Dodaniee;
            var Elementt;
            
            Elementt = document.createElement("div");
            Elementt.id = "zbijanyczarny";
            Dodaniee = document.getElementById(poleczarnych[c]);
            Dodaniee.appendChild(Elementt);
                    //uzyj tablicy poleczarnych i dodaj diva o id bitypionek
        }
    }
};

function ruchbialych(idd, tablica_elementow){

    var zawartosc;
    var element_div;
    var podglad;
    var polenaktorymstanie;
    var polepionkazbijanego;
    podglad = document.getElementById(idd);
    var polezanaczone ;
    polezaznaczone = idd;

    //przejscie po tablicy elementow w celu ustawienie lokalizacji w przypadku zbijania pionkow

    for (x=0; x< tablica_elementow.length;x++){
        var lokalna;
        lokalna = document.getElementById(tablica_elementow[x]).childNodes;
        console.log(lokalna);
        console.log(lokalna.length);

        if (lokalna.length == 1){
        var pomocnicza;
        pomocnicza = lokalna[0].id;
            if (pomocnicza == "bicieczarnego"){
                polenaktorymstanie = tablica_elementow[x];
            }

        }
        else if (lokalna.length == 2 ){    //zbijanyczarny
            var pomocnicza;
            pomocnicza = lokalna[1].id;
            if (pomocnicza == "zbijanyczarny"){
                polepionkazbijanego = tablica_elementow[x];
                //lokalizacja zbijanego pionka
            }
        }
    }
    zawartosc = document.getElementById(idd).childNodes;
    podglad = zawartosc[0];
    //console.log(zawartosc[0]);
    //console.log(zawartosc[1]);
    //console.log(idd.id);

    element_div = zawartosc[0].id;

    if (element_div == "zaznaczeniebialych"){
        var podmiana = zawartosc[0].id;
        podglad.parentNode.removeChild(podglad);
        
        //podmiana.removeChild(this);
        // var poprzedni = document.getElementById(idd).previousSibling.innerHTML;

        //idd.removeChild(idd);                     //wtf? usuwa nie to pole co powinno
        //console.log(poprzedni);
    
        // console.log("liczba elementow w tablicy:");
        // console.log(tablica_elementow.length);
        //  console.log(tablica_elementow[0]);
        //  console.log(tablica_elementow[1]);
        //  console.log(tablica_elementow[2]);
        var pionek = "<img src=\"\/PWI\/media\/pionekbialy.png\" id=\"pionekbialy\" \/>"; //
        document.getElementById(idd).innerHTML = pionek;

        for (i=0; i< tablica_elementow.length;i++){
            if(idd == tablica_elementow[i]){      
            }
            else{
                // console.log(document.getElementById(tablica_elementow[i]).childNodes.length);                                                        // jezeli jest pole z pionkiem to nie ma childnodes bo ma null
                zawartosc = document.getElementById(tablica_elementow[i]).childNodes;
                // console.log(zawartosc);
                if (zawartosc.length>1){
                    podglad = zawartosc[1];
                    podglad.parentNode.removeChild(podglad);
                }
                podglad = zawartosc[0];
                podglad.parentNode.removeChild(podglad);
            }
        }     
        //dla kazdego elementu tablicy usuniecie childnodes (elementow ktore sa podswietlone) 
    }
    else if(element_div == "bicieczarnego"){

        var podmiana = zawartosc[0].id;
        podglad.parentNode.removeChild(podglad);
            
        var pionek = "<img src=\"\/PWI\/media\/pionekbialy.png\" id=\"pionekbialy\" \/>"; // pionek staje w miejscu nowym
        document.getElementById(idd).innerHTML = pionek;
            
        for (i=0; i< tablica_elementow.length;i++){   
            if(idd == tablica_elementow[i]){   
                
            }
            else{
                // console.log(document.getElementById(tablica_elementow[i]).childNodes.length);                                                        // jezeli jest pole z pionkiem to nie ma childnodes bo ma null
                zawartosc = document.getElementById(tablica_elementow[i]).childNodes;
                // console.log(zawartosc);
                if (zawartosc.length>1){
                    podglad = zawartosc[1];
                    podglad.parentNode.removeChild(podglad);
                }
                podglad = zawartosc[0];
                podglad.parentNode.removeChild(podglad);
            }    
        }  
    }
    var typ;
    var nowy;
    typ = document.createElement("div");            // stworzenie nowego elementu div
    typ.id = "ruchczarnych";                       // nadanie nowemu elementowi div id wybrany
    var r = 0;
    var c = 0;

    nowy = document.getElementById("bb_0_0");   // nowy otrzymał lokalizacje elementu 0_0
    nowy.appendChild(typ);
    // zaznaczenieczarnych wybranyczarny bicieczarnego
};