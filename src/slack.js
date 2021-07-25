import { postMessage, postJoke } from "./messaging.js";

//https://api.slack.com/bot-users
//https://api.slack.com/methods/chat.postMessage
//https://api.slack.com/apis/connections/events-api#event_type_structure
//https://api.slack.com/types/event

export function handleEvent(req, res) {
  const payload = req.body;
  res.sendStatus(200);

  const e = payload.event;
  if (e.type === "app_mention") {
    const t = e.text.toLowerCase();
    if (t.includes("joke")) {
      postJoke(e.channel);
    } else if (
      t.includes("life") &&
      t.includes("universe") &&
      t.includes("everything")
    ) {
      postMessage(e.channel, "42");
    } else {
      postMessage(e.channel, "Im alive...");
    }
  }
}
