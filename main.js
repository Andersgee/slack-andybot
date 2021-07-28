import "dotenv/config";
import express from "express";
import { handleEvent } from "./src/slack.js";
import { postMessage } from "./src/messaging.js";

const app = express();
const PORT = process.env.PORT || 8080;

function handleWebassemblytextAction() {
  const channel = "webassemblytext";
  const text = "triggered by simple get request";
  postMessage(channel, text);
}

app.use(express.json());
app.post("/slack-andybot-event", handleEvent);
app.get("/webassemblytext-action", handleWebassemblytextAction);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
