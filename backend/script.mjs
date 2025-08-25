import express from "express";

const app = express();
const port = 3000;

const quotes = [];

function pickRandonQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  console.log("Revised a request for a quote");
  const quote = pickRandonQuote();
  // res.send(`"${quote.quote}" -${quote.author}`);
  res.send(`{"quote": ${quote.quote}, "author": ${quote.author}`)
});

app.post('/', (req, res) => {
  const bodyBytes = [];

  req.on("data", chunk => bodyBytes.push(...chunk));

  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;

    try {
      body = JSON.parse(bodyString);
    }
    catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON.");
      return;
    }

    quotes.push({
      quote: body.quote,
      author: body.author,
    });

    res.send("ok");

  });
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});

