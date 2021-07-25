import { postMessage, postJoke } from "./messaging.js";

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
