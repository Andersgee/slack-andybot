const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

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
    const text = payload.event.text;
    //make a post request to slack here with what
    //see: https://api.slack.com/methods/chat.postMessage
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
