const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;

async function postMessage(msg) {
  const body = {
    channel: "webassemblytext",
    text: msg,
  };

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf8",
      Authorization: `Bearer ${BOT_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  //const resdata = await res.json();
  //console.log("resdata: ", resdata);
}

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html)"));
});

app.get("/stuff", (req, res) => {
  res.json({ someKey: "someValue" });
});

app.get("/otherstuff", (req, res) => {
  res.send("simple sting");
});

app.use(express.json());
app.post("/slack-andybot-event", (req, res) => {
  //followin this tutorial: https://api.slack.com/bot-users
  const payload = req.body;
  res.sendStatus(200);

  if (payload.event.type === "app_mention") {
    //const text = payload.event.text;
    postMessage("basic response to app_mention");
    //make a post request to slack here with what
    //see: https://api.slack.com/methods/chat.postMessage
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
