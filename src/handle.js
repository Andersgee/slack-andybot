import { postMessage, postJoke, postWikiExtract } from "./messaging.js";

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
    } else if (t.includes("source") || t.includes("brain")) {
      postMessage(
        e.channel,
        "My brain lives here: https://github.com/Andersgee/slack-andybot"
      );
    } else if (t.includes("wiki")) {
      const v = t.split(" ");
      const searchwords = v.slice(1).join(" ");
      postMessage(e.channel, `searchwords: ${searchwords}`);
      //postWikiExtract(e.channel, searchwords);
    } else {
      postMessage(e.channel, "Im alive...");
    }
  }
}

export function handleWebassemblytextAction(req, res) {
  const payload = req.body;
  res.sendStatus(200);

  const channel = "webassemblytext";
  if (payload.supersafepassword === "abcda") {
    const msg = payload.commitmessage || "n/a";
    postMessage(
      channel,
      `Info: Andersgee/WebAssemblyText.jl was just updated, with last commit message: ${msg}`
    );
  }
}

export function handleSlackAndyBotAction(req, res) {
  const payload = req.body;
  res.sendStatus(200);

  const channel = "webassemblytext";
  if (payload.supersafepassword === "abcda") {
    const msg = payload.commitmessage || "n/a";
    postMessage(
      channel,
      `Info: Andersgee/slack-andybot was just updated, with last commit message: ${msg}`
    );
  }
}
