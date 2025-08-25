import express from "express";

const app = express();
const port = 3000;

const quotes = [
  {
    quote: "Life is 10% what happens to you and 90% how you react to it",
    author: "Lou Holtz"
  }
];

function pickRandonQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  console.log("Received a request for a quote");
  const quote = pickRandonQuote();
  res.json(quote); // This sets the correct Content-Type and stringifies the object
});

// app.get("/", (req, res) => {
//   console.log("Revised a request for a quote");
//   const quote = pickRandonQuote();
// res.json({ quote: quote.quote, author: quote.author });});

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

