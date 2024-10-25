const axios = require("axios");

const url = "https://dummyjson.com/users";

function getRequest(url, retries = 3) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { timeout: 10000 })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (retries > 0) {
          console.log(`Retrying ${retries} more times`);
          getRequest(url, retries - 1);
        }
        reject(error);
      });
  });
}

async function main() {
  try {
    let data = await getRequest(url);
    console.log(data);
  } catch (error) {
    console.error("Error in fetching data:", error.message);
  }
}

main();