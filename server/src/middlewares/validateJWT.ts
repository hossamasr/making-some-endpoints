import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

interface ExtendRequest extends Request {
  user?: any;
}
const JwtValidator = (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    res.status(403).send("no Authorization provided");
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("no auth token");
    return;
  }
  Jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) {
      res.status(403).send("invalid token ");
      return;
    }
    if (!payload) {
      res.status(403).send("invalid token payload ");
      return;
    }
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };
    const user = await userModel.findOne({ email: userPayload.email });

    req.user = user;
    next();
  });
};

export default JwtValidator;
