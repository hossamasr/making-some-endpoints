import express from "express";
import { getAllproducts } from "../services/ProductServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getAllproducts());
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});

export default router;
