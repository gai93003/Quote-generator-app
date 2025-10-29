const url = 'https://gai93003-quote-generator.hosting.codeyourfuture.io/';

const getQuote = async () => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    
    displayQuotes(data)
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};

const displayQuotes = (data) => {
  document.getElementById('quote').textContent = data.quote;
  document.getElementById('author').textContent = data.author;
  
}

// Submit new quote to the server

const submitQuote = async (event) => {
  event.preventDefault();

  const quote = document.getElementById('quote-inpt').value.trim();
  const author = document.getElementById('author-inpt').value.trim();

  if (!quote || !author) {
    alert("Please fill in both fields, thanks..");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ quote, author })
    });

    if (response.ok) {
      alert("Quote added successfully! Yahhh");
      document.getElementById('new-quote-form').reset();
      getQuote();
    }
    else {
      alert("Failed to add quote.");
    }
  }
  catch (error) {
    console.error("Error submitting quote:". error);
  }
};

document.getElementById('new-quote-form').addEventListener('submit', submitQuote);

document.getElementById('new-quote').addEventListener('click', getQuote);

window.onload = getQuote();