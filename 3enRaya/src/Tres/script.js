$(document).ready(function () {
    let turno = 1; // 1 = Jugador 1 (X), 2 = Jugador 2 (O)
    let terminado = false;

    function getSimbolo(turno) {
        return turno === 1
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`;
    }

    function getTablero() {
        let tablero = [];
        $("td.eachCell").each(function () {
            let contenido = $(this).find("p").html();
            if (contenido && contenido.includes("icon-tabler-x")) tablero.push("X");
            else if (contenido && contenido.includes("icon-tabler-circle")) tablero.push("O");
            else tablero.push("");
        });
        return tablero;
    }

    function hayGanador(tablero) {
        const lineas = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
            [0, 4, 8], [2, 4, 6]             // diagonales
        ];
        for (let linea of lineas) {
            const [a, b, c] = linea;
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return tablero[a];
            }
        }
        return null;
    }

    function tableroLleno(tablero) {
        return tablero.every(cell => cell !== "");
    }

    function reiniciar() {
        window.location.reload();
    }

    $("td.eachCell").click(function () {
        $(this).find("p").css('padding', '0px');
        if (terminado) return;
        let celda = $(this).find("p");
        if (celda.html() !== "") return;

        celda.html(getSimbolo(turno));
        let tablero = getTablero();
        let ganador = hayGanador(tablero);

        if (ganador) {
            terminado = true;
            $.alert({
                title: '¡Fin del juego!',
                content: `Ganó el jugador ${ganador === "X" ? "1" : "2"} (${ganador})`,
                buttons: {
                    reiniciar: {
                        text: 'Reiniciar',
                        action: function () {
                            reiniciar();
                        }
                    }
                }
            });
        } else if (tableroLleno(tablero)) {
            terminado = true;
            $.alert({
                title: 'Empate',
                content: '¡No hay ganador!',
                buttons: {
                    reiniciar: {
                        text: 'Reiniciar',
                        action: function () {
                            reiniciar();
                        }
                    }
                }
            });
        } else {
            turno = turno === 1 ? 2 : 1;
            $("#playerTurn").text(turno);
        }
    });
});