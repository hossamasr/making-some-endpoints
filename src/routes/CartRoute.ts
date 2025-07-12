import express, { Request } from "express";
import {
  getActiveCartForUser,
  addItemtocart,
  updateItemIncart,
  deleteItemIcart,
  clearCart,
  checkOut,
} from "../services/CartServices";
import JwtValidator from "../middlewares/validateJWT";

interface ERequest extends Request {
  user?: any;
}

const router = express.Router();

router.get("/", JwtValidator, async (req: ERequest, res) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: "Unauthorized: User not found" });
      return;
    }
    const userID = req.user._id;
    const cart = await getActiveCartForUser({ userID: userID });
    res.status(200).send(cart);
    return;
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});

router.delete("/", JwtValidator, async (req: ERequest, res) => {
  try {
    const userID = req.user._id;
    const response = await clearCart({ userID });
    res.send(response.data).status(response.statusCode);
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});
router.post("/items", JwtValidator, async (req: ERequest, res) => {
  try {
    const userID = req.user._id;
    const { productID, quantity } = req.body;
    const response = await addItemtocart({ userID, productID, quantity });
    res.send(response.data).status(response.statusCode);
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});

router.patch("/items", JwtValidator, async (req: ERequest, res) => {
  try {
    const userID = req.user._id;
    const { productID, quantity } = req.body;
    const response = await updateItemIncart({ userID, productID, quantity });
    res.send(response.data).status(response.statusCode);
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});

router.delete("/items/:productID", JwtValidator, async (req: ERequest, res) => {
  try {
    const userID = req.user._id;
    const productID = req.params.productID;
    const response = await deleteItemIcart({ userID, productID });
    res.send(response.data).status(response.statusCode);
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});

router.post("/checkout", JwtValidator, async (req: ERequest, res) => {
  try {
    const userID = req.user._id;
    const { address } = req.body;
    const response = await checkOut({ userID, address });
    res.send(response.data).status(response.statusCode);
  } catch (err) {
    res.send("something went wrong!").status(500);
  }
});
export default router;
