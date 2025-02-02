import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:8081', 'exp://10.11.104.175:8081', 'http://localhost:19006'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials : true
}

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/auth/signup', (req, res) => {
  res.send('signup');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
