function aleatorio(){

    let nombres = ["Caballero Ruiz Laura", "Carmona Bascón Antonio", "Cervilla Alcalde Maria", "Cobos Ruiz Iván", "Fernández Ariza Angel", "Fernández España Víctor",
    "Gómez Ruiz Manuel", "Hidalgo Santaella Luis", "León Fernández Belén María", "Pablo Merida Velasco" ,"Rodríguez Machado Andrés", "Ruz Del Río Enrique",
    "Pérez Lara Jose Luis", "Postigo Arévalo Javier", "Vicente Peligro Hugo", "Javier Sánchez López"]

    let winnerNumber = Math.trunc(Math.random() * ((nombres.length) - 0) + 0);

    let message = document.getElementById("winMessage")

    message.innerHTML = "El ganador es: " + nombres[winnerNumber]

}

async function main(){

    var vid = document.getElementById('tamborVideo');
    
    console.log(vid)
    vid.play();

    document.getElementById('tamborSound').play();

    var myAudio = new Audio('audioTambor.m4a');
    myAudio.play();
    function delay(n){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
    });
    }

    var x = 0;
    while(x < 41){
        x = x + 1
        aleatorio()
        await delay(0.1);

        
    }

}
