import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateUser = async (req, res, next) => {
  const headers = req.headers;
  const authHeader = headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid!");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = { userId: payload.userId };
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid!");
  }
};
export default authenticateUser;
