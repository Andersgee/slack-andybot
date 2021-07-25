import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;

export async function postMessage(channel, text) {
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
  return res.json();
}

async function fetchJoke() {
  const jokes = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  ).then((res) => res.json());
  return jokes[0];
}

export async function postJoke(channel) {
  const joke = await fetchJoke();
  const r = await postMessage(channel, joke.setup);
  setTimeout(() => {
    postMessage(channel, joke.punchline);
  }, 3000);
}
