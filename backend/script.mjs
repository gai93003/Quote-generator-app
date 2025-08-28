import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

const quotes = [
  {
    quote: "Life is 10% what happens to you and 90% how you react to it",
    author: "Lou Holtz"
  },
  {
    quote: "If you're brave enough to say goodbye, life will reward you with a new hello.",
    author: 'Paulo Coehlo'
  }
];

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Received a request for a quote");
  if (quotes.length === 0) {
    return res.status(404).json({ error: "No quotes available." });
  }
  const quote = pickRandomQuote();
  res.json({ quote: quote.quote, author: quote.author });
});

app.post('/', (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    return res.status(400).send("Both 'quote' and 'author' are required.");
  }
  quotes.push({ quote, author });
  res.send("ok");
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});