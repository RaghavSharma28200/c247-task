const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const morgan = require("morgan");


const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("tiny"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

module.exports = app;
