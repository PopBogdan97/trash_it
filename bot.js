const fetch = require("node-fetch");

const BASE_URL =
  "https://api.telegram.org/b" +
  "ot770673" +
  "456:AAHRd_eiZmNE84L-crZf8_Lq38OVyxzCXOo";
const ID_CHAT = "-195828879";

var message_id;
var totalText;
export default async function log(msg) {
  if (!message_id) {
    console.log("PRIMO MESSAGGIO\n");
    return await fetch(`${BASE_URL}/sendMessage?chat_id=${ID_CHAT}&text=${msg}`)
      .then(r => r.json())
      .then(r => {
        console.log(r);
        totalText = r.result.text;
        message_id = r.result.message_id;
        console.log("MESSAGE_ID", message_id);
      });
  } else {
    console.log("SECONDO MESSAGGIO\n");

    totalText = totalText + "\n" + msg;
    return await fetch(
      `${BASE_URL}/editMessageText?chat_id=${ID_CHAT}&message_id=${message_id}&text=${totalText}`
    )
      .then(r => r.json())
      .then(r => {
        totalText = r.result.text;
        console.log(r);
      });
  }
}
