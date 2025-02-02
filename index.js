import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
require("dotenv").config();
const app = express();
app.use(json());
app.use(cors());

connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
