const envelopeStage = document.getElementById("envelopeStage");
const seal = document.getElementById("seal");
const typewriter = document.getElementById("typewriter");
const textBox = document.getElementById("textBox");
const glassMenu = document.getElementById("glassMenu");
const musicaCarta = document.getElementById("musicaCarta");

const textoCarta = `Hola, Betsy.

Me alegra que te tomes el tiempo de estar aquí. Esto es un intento de carta jajaja. Lo hice de esta forma porque no sé cuándo será la próxima vez que te vea; había algunas cosas que quería decirte, tambien  te lo quería entregar antes, pero pasaron cositas. Honestamente, muero por verte de nuevo.

La última vez que nos encontramos, apenas te vi mi corazón se aceleró. Es raro (para bien) y lindo, porque nunca me había pasado algo así. Aunque te parezca exagerado, como ya te había dicho, siempre estoy pensando en ti; tal vez más de lo que debería, pero para nada es una queja. Te apareces sin avisar en los momentos más simples, especialmente en las noches, cuando todo está en silencio y tranquilo, porque eso es justo lo que me transmites: paz.

Como diría Morat, me acostumbré a ti en un solo día. Jamás voy a olvidar lo contento que llegué a mi casa después de pasar tiempo contigo por primera vez. Tampoco aquellas veces en las que, sin planearlo, terminaba sentado cerca de ti en clases, sin saber que se convertiría en mi evento canónico jaja. Mucho menos me voy a arrepentir de cambiarme de carrera, pues fue ahí donde te conocí. De hecho, estaba entre Física y Biología. En particular me interesaba  la astronomía y la teoría de cuerdas,pero quien diría que al verte a los ojos podría ver el universo entero jajajajajajaj.

No quiero ser intenso y dar cringe como ahora, juas juas, solo siempre te he visto como alguien inalcanzable. Aunque, siendo sincero, no me importa hacerlo si de esa forma puedo decirte lo que siento por ti.

Peroooo, ahora que estamos en este punto ¿Qué se supone que debería pasar? aaaaaaaaa. 

-Oscar
`;

let index = 0;
let started = false;

seal.addEventListener("click", () => {
    if (started) return;

    started = true;
    envelopeStage.classList.add("open");

    iniciarMusica();

    setTimeout(() => {
        envelopeStage.classList.add("reading");
        escribirCarta();
    }, 1900);
});

function iniciarMusica() {
    musicaCarta.volume = 0.45;

    musicaCarta.play().catch(() => {
        console.log("El navegador bloqueó la reproducción automática.");
    });
}

function obtenerPausa(caracter) {
    switch (caracter) {
        case ".":
            return 520;
        case ",":
            return 230;
        case ";":
        case ":":
            return 330;
        case "?":
        case "¿":
        case "!":
        case "¡":
            return 420;
        case "\n":
            return 600;
        default:
            return 30;
    }
}

function escribirCarta() {
    if (index < textoCarta.length) {
        typewriter.textContent += textoCarta[index];

        textBox.scrollTop = textBox.scrollHeight;
        

        const pausa = obtenerPausa(textoCarta[index]);
        index++;

        setTimeout(escribirCarta, pausa);
    } else {
        typewriter.classList.add("finished");
        glassMenu.classList.add("show");
    }
}