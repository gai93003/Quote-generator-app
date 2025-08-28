// const url = 'https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes';
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

document.getElementById('new-quote').addEventListener('click', getQuote);

window.onload = getQuote();