const express = require("express");
const connectDB = require("./config/db");

const app = express();

// bring db

connectDB();

// body parser included with express, init mdddiel

app.use(express.json({ extended: false }));

// pretend uri

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/product", require("./routes/api/product"));

// test

app.get("/", (req, res) => res.send("API RUNNING"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
