import "dotenv/config";
import express from "express";
import { handleEvent, handleWebassemblytextAction } from "./src/handle.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.post("/slack-andybot-event", handleEvent);
app.post("/webassemblytext-action", handleWebassemblytextAction);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
