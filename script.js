// Mes 9 = octubre (los meses en JavaScript empiezan en 0).
// Podés agregar la hora de la fiesta: new Date(2026, 9, 10, 20, 0, 0)
const fechaEvento = new Date(2026, 9, 10, 16, 0, 0);

function dosDigitos(n){
    return String(n).padStart(2, "0");
}

function actualizarCountdown(){
    const faltante = Math.max(0, fechaEvento - new Date());
    const total = Math.floor(faltante / 1000);

    document.getElementById("dias").textContent = dosDigitos(Math.floor(total / 86400));
    document.getElementById("horas").textContent = dosDigitos(Math.floor((total % 86400) / 3600));
    document.getElementById("minutos").textContent = dosDigitos(Math.floor((total % 3600) / 60));
    document.getElementById("segundos").textContent = dosDigitos(total % 60);

    if (faltante === 0){
        document.getElementById("cuenta-titulo").textContent = "¡Hoy es la fiesta! 🎉";
        clearInterval(temporizador);
    }
}

const temporizador = setInterval(actualizarCountdown, 1000);
actualizarCountdown();
