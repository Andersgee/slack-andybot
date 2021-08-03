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

async function getWikiSearch(str) {
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${str}`
  ).then((r) => r.json());
  //res[1] is a list of titles
  //res[3] is a list of urls
  return res[1];
}

async function getWikiArticle(str) {
  const article = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${str}&exsentences=3&explaintext=1&exintro=1`
  ).then((r) => r.json());
  return article;
}

async function getWikiExtract(str) {
  const titles = await getWikiSearch(str);
  const article = await getWikiArticle(titles[0]); //title[0] is first item in searchbox.
  const article1 = await getWikiArticle(titles[1]);
  const extract = Object.values(article.query.pages)[0].extract;
  const extract1 = Object.values(article1.query.pages)[0].extract;
  if (extract.includes("may refer to") || extract.includes("may stand for")) {
    return `andybot INFO: Im gonna assume you mean ${titles[1]}.\n\n${extract1}`;
  } else {
    return extract;
  }
}

export async function postWikiExtract(channel, str) {
  const extract = await getWikiExtract(str);
  postMessage(channel, extract);
}
