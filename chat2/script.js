document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("message-form");
    const input = document.getElementById("message-input");
    const messagesContainer = document.getElementById("messages");
    const appUser = "Aldo"; // Cambia a "Chat1" en la otra app

    function loadMessages() {
        fetch("http://localhost:8012/tarea1/chat2/api.php")
            .then(response => response.json())
            .then(data => {
                messagesContainer.innerHTML = "";
                data.forEach(msg => {
                    const messageElement = document.createElement("div");
                    messageElement.classList.add("message");

                    if (msg.user === appUser) {
                        messageElement.classList.add("sent"); // Mensajes enviados desde esta app
                    } else {
                        messageElement.classList.add("received"); // Mensajes del otro usuario
                    }

                    messageElement.textContent = `${msg.user}: ${msg.message}`;
                    messagesContainer.appendChild(messageElement);
                });
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const messageText = input.value.trim();

        if (messageText) {
            fetch("http://localhost:8012/tarea1/chat2/api.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: appUser, message: messageText })
            }).then(() => {
                input.value = "";
                loadMessages();
            });
        }
    });

    loadMessages();
    setInterval(loadMessages, 3000); // Carga mensajes cada 3 segundos
});
