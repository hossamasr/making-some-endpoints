import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface RegisterParam {
  firstName: string;
  lastName: string;

  email: string;

  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParam) => {
  const findUser = await userModel.findOne({ email });
  if (findUser)
    return { data: "user already registered sign in", statusCode: 400 };
  const newUser = new userModel({ email, password, firstName, lastName });

  await newUser.save();

  return { data: generateJwt({ firstName, lastName, email }), statusCode: 200 };
};

interface Login {
  email: string;

  password: string;
}

export const login = async ({ email, password }: Login) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser)
    return { data: "incorrect email or password", statusCode: 400 };

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (!passwordMatch)
    return { data: "incorrect email or password", statusCode: 400 };

  return {
    data: generateJwt({
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email,
    }),
    statusCode: 200,
  };
};

const generateJwt = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "");
};
