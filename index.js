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
  const obj = req.body;
  //console.log(obj);
  const str = obj.challenge || "nope..";
  res.send(str);
  //json would work aswell: https://api.slack.com/events/url_verification
  //res.json();
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
