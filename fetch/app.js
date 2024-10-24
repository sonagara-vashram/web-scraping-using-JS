const fs = require("fs");

const books = [];
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((item) => {
      books.push({
        userId: item.userId,
        id: item.id,
        title: item.title,
        completed: item.completed,
      });
    });
  })
  .then(() => {
    for (let book in books) {
      console.log(books[book]);
    }
    fs.writeFile("./dummy_data.json", JSON.stringify(books), (err) => {
      if (err) {
        console.error("Error:", err);
        return;
      }
      console.log("File has been created");
    });
  })
  .catch((error) => console.error("Error:", error));
