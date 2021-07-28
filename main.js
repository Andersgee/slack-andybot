import "dotenv/config";
import express from "express";
import { handleEvent } from "./src/slack.js";
import { postMessage } from "./src/messaging.js";

const app = express();
const PORT = process.env.PORT || 8080;

function handleWebassemblytextAction(req, res) {
  const payload = req.body;
  res.sendStatus(200);

  const channel = "webassemblytext";
  if (payload.supersafepassword === "abcda") {
    postMessage(
      channel,
      "Info: Andersgee/WebAssemblyText.jl was just updated."
    );
  }
}

app.use(express.json());
app.post("/slack-andybot-event", handleEvent);

//https://slack-andybot.herokuapp.com/webassemblytext-action
app.post("/webassemblytext-action", handleWebassemblytextAction);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
