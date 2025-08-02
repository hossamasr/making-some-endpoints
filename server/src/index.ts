import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/usersRoute";
import ProductRoute from "./routes/ProductsRoute";
import cartRoute from "./routes/CartRoute";
import { setIntialseed } from "./services/ProductServices";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URL || "")
  .then(() => {
    console.log("connection Success");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

setIntialseed();

app.use("/products", ProductRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
