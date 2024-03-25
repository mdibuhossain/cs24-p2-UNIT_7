import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import formData from "express-form-data";
import prisma from "./db/db.config.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.get("/", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running!");
});
