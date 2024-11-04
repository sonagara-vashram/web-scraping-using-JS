// Import the axios library for making HTTP requests
const axios = require("axios");

// URL of the API endpoint to fetch data from
const url = "https://dummyjson.com/users";

// Function to make a GET request with retries in case of failure
function getRequest(url, retries = 3) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { timeout: 10000 }) // Set a timeout of 10 seconds for the request
      .then((response) => {
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        if (retries > 0) {
          console.log(`Retrying ${retries} more times`); // Log the retry attempt
          getRequest(url, retries - 1); // Retry the request with one less retry
        }
        reject(error); // Reject the promise with the error
      });
  });
}

// Main function to fetch data and handle errors
async function main() {
  try {
    let data = await getRequest(url); // Await the result of the GET request
    console.log(data); // Log the fetched data to the console
  } catch (error) {
    console.error("Error in fetching data:", error.message); // Log any errors that occur
  }
}

// Call the main function to execute the script
main();