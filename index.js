const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;

async function postMessage(channel, text) {
  const body = {
    channel,
    text,
  };

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf8",
      Authorization: `Bearer ${BOT_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const resdata = await res.json();
  return resdata;
}

async function fetchJoke() {
  const jokes = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  ).then((res) => res.json());
  return jokes[0];
}

async function postJoke(channel) {
  const joke = await fetchJoke();
  const r = await postMessage(channel, joke.setup);
  setTimeout(() => {
    postMessage(e.channel, joke.punchline);
  }, 3000);
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

//https://api.slack.com/bot-users
//https://api.slack.com/methods/chat.postMessage
//https://api.slack.com/apis/connections/events-api#event_type_structure
//https://api.slack.com/types/event
app.post("/slack-andybot-event", (req, res) => {
  const payload = req.body;
  res.sendStatus(200);

  const e = payload.event;
  if (e.type === "app_mention") {
    if (e.text.includes("joke")) {
      postJoke(e.channel);
    } else {
      postMessage(
        e.channel,
        "Im still alive. Inspect my mind here: https://github.com/Andersgee/slack-andybot"
      );
    }
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
