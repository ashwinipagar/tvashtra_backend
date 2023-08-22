require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const vendorRoute = require("./routes/vendorRoute");
const accountRoute = require("./routes/accountStatementRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const errorHandler = require("./middleware/errorMiddleware");
// const fileUpload = require("express-fileupload");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(fileUpload());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", "https://authz-app.vercel.app", "https://res.cloudinary.com"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/account", accountRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

