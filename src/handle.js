import {
  postMessage,
  postJoke,
  postWikiExtract,
  postCommands,
} from "./messaging.js";

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
    const v = t.split(" ");
    const command = v.slice(0, 1);
    switch (command) {
      case "wiki":
        const searchwords = v.slice(2).join(" ");
        postWikiExtract(e.channel, searchwords);
        break;
      case "source":
        const msg =
          "source code for andybot: https://github.com/Andersgee/slack-andybot";
        postMessage(e.channel, msg);
        break;
      default:
        if (t.includes("joke")) {
          postJoke(e.channel);
        } else if (
          t.includes("life") &&
          t.includes("universe") &&
          t.includes("everything")
        ) {
          postMessage(e.channel, "42");
        } else {
          postCommands(e.channel);
        }
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
