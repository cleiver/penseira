const express = require("express");
const app = express();

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("The bucket is now open 🗑\nYou can now throw your stuff ⛹");
  }
});
