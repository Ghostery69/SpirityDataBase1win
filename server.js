const fetch = require("node-fetch");

const API_URL = "https://crash-gateway-cr.100hp.app/history?id_n=1play_luckyjet";
const TELEGRAM_API = "https://api.telegram.org/bot7811399786:AAEG4sXnrKlAqJDl08TwGkx9uDDosB5lMj0";
const CHAT_ID = "7104713412";

let lastSentId = null;

async function fetchAndSendCotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const latestCote = data[0];
        if (latestCote.id !== lastSentId) {
            lastSentId = latestCote.id;

            const message = `💀💀🅢𝗽𝗶𝗿𝗶𝘁𝘆🅓𝗮𝘁𝗮🅑𝗮𝘀𝗲📉\n1- ${latestCote.top_coefficient}`;
            await fetch(`${TELEGRAM_API}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });
            console.log("Message envoyé :", message);
        } else {
            console.log("Aucune nouvelle cote.");
        }
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Exécuter la fonction toutes les 3 secondes
setInterval(fetchAndSendCotes, 3000);
