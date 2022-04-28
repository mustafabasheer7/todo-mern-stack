const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

dotenv.config();

// Connecting to Mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    console.log(
      "*****************Database is successfully connected!*****************"
    )
  )
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/v1/users", userRoute); //User Route
app.use("/api/v1/auth", authRoute); //Authentication Route
app.use("/api/v1/tasks", taskRoute); //Task Route

app.listen(process.env.PORT || 4000, () => {
  console.log(
    "**************************SERVER IS RUNNING**************************"
  );
});
