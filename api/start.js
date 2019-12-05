require("dotenv").config({ path: ".env" });

// -----------------------------------------------------------------------------

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`💣 ${err.message}`);
});

// -----------------------------------------------------------------------------

const app = require("./src/app.js");
app.set("port", process.env.PORT || 3000);

/** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
 * Ready?
 * Set?
 * Go! 🏎
 ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
app.listen(app.get("port"), err => {
  if (err) {
    console.error(`💣 ${err}`);
  } else {
    console.info(
      "🗑 The bucket is now open!\n⛹ You can now throw your stuff on port " +
        app.get("port")
    );
  }
});
