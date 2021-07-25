import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { handleEvent } from "./src/slack.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
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
app.post("/slack-andybot-event", handleEvent);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//https://api.slack.com/bot-users
//https://api.slack.com/methods/chat.postMessage
//https://api.slack.com/apis/connections/events-api#event_type_structure
//https://api.slack.com/types/event
