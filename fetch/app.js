// Import the filesystem module to enable file operations
const fs = require("fs");

// Initialize an empty array to store the fetched data
const books = [];

// Fetch data from the provided URL
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json()) // Parse the response as JSON
  .then((json) => {
    // Iterate over each item in the JSON response
    json.forEach((item) => {
      // Push each item into the books array with selected properties
      books.push({
        userId: item.userId,
        id: item.id,
        title: item.title,
        completed: item.completed,
      });
    });
  })
  .then(() => {
    // Log each book object to the console
    for (let book in books) {
      console.log(books[book]);
    }
    // Write the books array to a file named dummy_data.json
    fs.writeFile("./dummy_data.json", JSON.stringify(books), (err) => {
      if (err) {
        console.error("Error:", err); // Log an error if the file write fails
        return;
      }
      console.log("File has been created"); // Log success message
    });
  })
  .catch((error) => console.error("Error:", error)); // Log any error that occurs during fetch or processing