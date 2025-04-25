import express from "express";
import { getAllproducts } from "../services/ProductServices";

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send(await getAllproducts());
});

export default router;
