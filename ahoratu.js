const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const laterBtn = document.getElementById("laterBtn");
const statusMessage = document.getElementById("statusMessage");

// PEGA AQUÍ TU DISCORD WEBHOOK
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1518486402088833144/XN6mALbDxO5j41GITxvmLIgeuzfPnxHSxMWpxva3SIKPtEN63k_gEmPBzY2sjUEzxqVy";

sendBtn.addEventListener("click", async () => {
    const message = messageInput.value.trim();

    if (message === "") {
        statusMessage.textContent = "Escribe algo antes de enviar.";
        statusMessage.style.color = "#fff2b8";
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Enviando...";

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: ` Nuevo mensaje:\n\n${message}`
            })
        });

        if (!response.ok) {
            throw new Error("Error al enviar a Discord");
        }

        messageInput.value = "";

        statusMessage.textContent = "Mensaje enviado.";
        statusMessage.style.color = "#d9ffe4";

        // Permite enviar más mensajes
        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar.";

        messageInput.focus();

    } catch (error) {
        statusMessage.textContent = "No se pudo enviar. Inténtalo otra vez.";
        statusMessage.style.color = "#ffd6d6";

        sendBtn.disabled = false;
        sendBtn.textContent = "Enviar";

        console.error(error);
    }
});

laterBtn.addEventListener("click", () => {
    messageInput.value = "";

    statusMessage.textContent = "Está bien, no pasa nada.";
    statusMessage.style.color = "#ffffff";

    messageInput.focus();
});