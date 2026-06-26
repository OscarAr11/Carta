
const messageIcon = document.getElementById("messageIcon");
const bubble = document.getElementById("bubble");
const bubbleContent = document.getElementById("bubbleContent");




const passwordsCorrectas = [
    "Betsy",
    "Araceli",
    "Betsy Araceli",

];




setTimeout(() => {
    messageIcon.classList.add("alert");
}, 5000);




messageIcon.addEventListener("mouseenter", () => {

    messageIcon.classList.remove("alert");

    if (!bubble.classList.contains("password-mode")) {

        bubble.classList.add("show");


        bubbleContent.innerHTML = `
            <div class="message-container">

                <span>
                    Hola, alguien que conoces tiene un mensaje para ti.
                </span>

                <button id="nextButton">
                    Aceptar
                </button>

            </div>
        `;


        const nextButton = document.getElementById("nextButton");


        nextButton.addEventListener("click", () => {

            mostrarPassword();

        });

    }

});






function mostrarPassword() {


    bubble.classList.add("show");
    bubble.classList.add("password-mode");


    bubbleContent.innerHTML = `
        <div class="password-container">

            <span>
                Para desbloquear el mensaje, escribe tu nombre:
            </span>


            <input
                type="text"
                id="passwordInput"
                placeholder="..."
            >


            <button id="passwordButton">
                Entrar
            </button>


            <span
                class="error-text"
                id="errorMessage">
            </span>


        </div>
    `;


    const passwordInput =
        document.getElementById("passwordInput");


    const passwordButton =
        document.getElementById("passwordButton");


    const errorMessage =
        document.getElementById("errorMessage");


    passwordInput.focus();


    passwordButton.addEventListener(
        "click",
        verificarPassword
    );


    passwordInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                verificarPassword();

            }

        }
    );


    function verificarPassword() {


        const password =
            passwordInput.value.trim();


        if (password === "") {


            errorMessage.textContent =
                "Escribe la contraseña.";

            return;

        }


        if (passwordsCorrectas.includes(password)) {


            errorMessage.textContent = "";


            

            window.location.href = "sobre.html";


        } else {


            errorMessage.textContent =
                "Asi no.";


            passwordInput.value = "";


            passwordInput.focus();

        }

    }

}