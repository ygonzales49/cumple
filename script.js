const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

const boton = document.getElementById("botonCumple");

let cohetes = [];
let particulas = [];

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


// ======================================
// CREAR COHETE
// ======================================

function crearCohete() {

    const colores = [
        "#ff004c",
        "#00e5ff",
        "#ffe600",
        "#00ff88",
        "#ff66ff",
        "#ffffff",
        "#ff8c00"
    ];

    cohetes.push({
        x: Math.random() * canvas.width,

        y: canvas.height + 10,

        destino:
            80 +
            Math.random() *
            (canvas.height * 0.45),

        velocidad:
            7 + Math.random() * 2,

        color:
            colores[
                Math.floor(
                    Math.random() * colores.length
                )
            ]
    });
}


// ======================================
// EXPLOSIÓN
// ======================================

function explotar(x, y, color) {

    for (let i = 0; i < 100; i++) {

        const angulo =
            Math.random() * Math.PI * 2;

        const velocidad =
            Math.random() * 6 + 2;

        particulas.push({

            x: x,
            y: y,

            vx:
                Math.cos(angulo) *
                velocidad,

            vy:
                Math.sin(angulo) *
                velocidad,

            gravedad: 0.05,

            vida: 1,

            tamaño:
                Math.random() * 3 + 1,

            color: color
        });
    }
}


// ======================================
// ANIMACIÓN
// ======================================

function animar() {

    // IMPORTANTE:
    // Limpiamos el canvas con transparencia.
    // NO ponemos fondo negro.

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ==================================
    // COHETES
    // ==================================

    for (
        let i = cohetes.length - 1;
        i >= 0;
        i--
    ) {

        const cohete = cohetes[i];

        cohete.y -= cohete.velocidad;


        // Dibujar cohete

        ctx.beginPath();

        ctx.arc(
            cohete.x,
            cohete.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            cohete.color;

        ctx.shadowBlur = 20;

        ctx.shadowColor =
            cohete.color;

        ctx.fill();

        ctx.shadowBlur = 0;


        // Si llegó arriba, explota

        if (
            cohete.y <=
            cohete.destino
        ) {

            explotar(
                cohete.x,
                cohete.y,
                cohete.color
            );

            cohetes.splice(i, 1);
        }
    }


    // ==================================
    // PARTÍCULAS
    // ==================================

    for (
        let i = particulas.length - 1;
        i >= 0;
        i--
    ) {

        const p = particulas[i];

        p.x += p.vx;

        p.y += p.vy;

        p.vy += p.gravedad;

        p.vx *= 0.99;

        p.vy *= 0.99;

        p.vida -= 0.012;


        ctx.globalAlpha =
            Math.max(p.vida, 0);


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.tamaño,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            p.color;

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            p.color;

        ctx.fill();

        ctx.shadowBlur = 0;


        if (p.vida <= 0) {

            particulas.splice(i, 1);
        }
    }


    ctx.globalAlpha = 1;

    requestAnimationFrame(animar);
}


// Arrancar animación
animar();


// ======================================
// BOTÓN
// ======================================
boton.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();

        console.log("🎆 ¡FUEGOS ARTIFICIALES!");

        // Fuegos iniciales
        for (let i = 0; i < 5; i++) {

            setTimeout(function() {
                crearCohete();
            }, i * 250);

        }

        // Continuar lanzando fuegos cada 1 segundo
        const temporizador = setInterval(
            function() {
                crearCohete();
            },
            1000
        );

        // Detener los fuegos después de 10 segundos
        setTimeout(
            function() {
                clearInterval(temporizador);
            },
            10000
        );
    }
);
