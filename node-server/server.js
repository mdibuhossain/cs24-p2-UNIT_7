import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import formData from "express-form-data";

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

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running!");
});
