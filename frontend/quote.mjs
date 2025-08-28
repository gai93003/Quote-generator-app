// const url = 'https://cs4cc48o8wwskkwk8oss0884.hosting.codeyourfuture.io/api/quotes';
const url = 'https://gai93003-quote-generator.hosting.codeyourfuture.io/';

const getQuote = async () => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};

getQuote();