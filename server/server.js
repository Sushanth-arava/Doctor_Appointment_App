const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");
const app = express();
app.use(express.json());
const port = process.env.port || 5000;
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => console.log(`listening on port ${port}!`));
