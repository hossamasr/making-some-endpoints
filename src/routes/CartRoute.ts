import express,{Request} from "express";
import { getActiveCartForUser } from "../services/CartServices";
import JwtValidator from "../middlewares/validateJWT";

  interface ERequest extends Request {
      user?: any;
  }



const router = express.Router();


router.get("/", JwtValidator, async (req: ERequest, res) => {
  if (!req.user) {
    res.status(401).send({ error: "Unauthorized: User not found" });
    return;
  }
  const userID = req.user._id;
  const cart = await getActiveCartForUser({ userID: userID });
  res.status(200).send(cart);
  return;
});

export default router;
