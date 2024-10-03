const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE;

console.log(DB);


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port =  8000;

const server = app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});



