document.addEventListener("DOMContentLoaded", function() {

    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");    
    pincel.fillStyle = "grey";
    pincel.fillRect(0,0,600,400); 
    var xAleatorio;
    var yAleatorio;
    var i = 0;
    var intervalo;
    var puntos = 0;
    pincel.font = "30px Arial";
    pincel.fillStyle = "white";
    pincel.textAlign = "center";
    pincel.fillText("¡Da click en el botón para iniciar!", pantalla.width/2, pantalla.height/2);
    var enCurso = false;
    var soloUno = false;

    function limpiarPantalla() {
        pincel.clearRect(0,0,600,400);
    }

    function hacerCircunferencia(x,y,radio,color="blue") {
        pincel.fillStyle = color;
        pincel.beginPath();
        pincel.arc(x,y,radio,0,2*Math.PI);
        pincel.fill();
    }


    function aleatorio(maximo) {
        return Math.floor(Math.random()*maximo);
    }

    

    function hacerDiana(x, y) {
        soloUno = false
        hacerCircunferencia(x, y, 30, "red");
        hacerCircunferencia(x, y, 20, "white");
        hacerCircunferencia(x, y, 10, "red");
    }
    
    function juego() {
        enCurso = true;
        document.getElementById("begin").innerHTML = "Restart";
        limpiarPantalla();
        pincel.fillStyle = "grey";
        pincel.fillRect(0,0,600,400); 
        xAleatorio = aleatorio(600);
        yAleatorio = aleatorio(400);
        hacerDiana(xAleatorio,yAleatorio,10);
        i++;
        if (i >= 11) {
            clearInterval(intervalo);
            limpiarPantalla()
            pincel.fillStyle = "grey";
            pincel.fillRect(0,0,600,400);
            mensajeFinal()
            if (puntos == 100) {
                document.getElementById("puntos").innerHTML = "Felicidades! Tu resultado fue perfecto! Tus puntos fueron: " + puntos;
            } else if (puntos > 70) {
                document.getElementById("puntos").innerHTML = "Bien hecho! Tus puntos fueron: " + puntos;
            } else if (puntos > 50) {
                document.getElementById("puntos").innerHTML = "Podría ser mejor... Tus puntos fueron: " + puntos;
            } else if (puntos == 0) {
                document.getElementById("puntos").innerHTML = "Wtf bro! Tus puntos fueron: " + puntos;
            } else {
                document.getElementById("puntos").innerHTML = "Falta práctica! Tus puntos fueron: " + puntos;
            }
        enCurso = false;
        }
    }

    function acertar(evento) {
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        
        if (soloUno == false) {
            if ((x > xAleatorio - 10) && (x < xAleatorio + 10) && (y < yAleatorio+10) && (y>yAleatorio-10)) {
                puntos = puntos + 10
                soloUno = true
            } else if ((x > xAleatorio - 20) && (x < xAleatorio + 20) && (y < yAleatorio+20) && (y>yAleatorio-20)) {
                puntos = puntos + 5
                soloUno = true
            } else if ((x > xAleatorio - 30) && (x < xAleatorio + 30) && (y < yAleatorio+30) && (y>yAleatorio-30)) {
                puntos = puntos + 1
                soloUno = true
            }
        }
        return puntos
    }

    function mensajeFinal() {
        pincel.font = "30px Arial";
        pincel.fillStyle = "white";
        pincel.textAlign = "center";
        pincel.fillText("¡Gracias por jugar!", pantalla.width/2, pantalla.height/2);
    }

    document.getElementById("begin").addEventListener("click", function() {
    puntos=0
    if (enCurso == false) {
        intervalo = setInterval(juego, 1000);
        puntos = 0;
        i = 0;
        document.getElementById("puntos").innerHTML = "";
    } else {
        limpiarPantalla()
        pincel.fillStyle = "grey";
        pincel.fillRect(0,0,600,400);
        i = 0;
        puntos = 0;
        document.getElementById("puntos").innerHTML = "";
        clearInterval(intervalo);
        intervalo = setInterval(juego, 1000);
    }
});

    pantalla.onclick = acertar;

});