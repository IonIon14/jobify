import { StatusCodes } from "http-status-codes";

const notFoundMiddleWare = (req, res) => {
  const defaultNotFound = {
    statusCode: StatusCodes.NOT_FOUND,
    msg: "Route not found",
  };
  res.status(defaultNotFound.statusCode).send("Route not found");
};
export default notFoundMiddleWare;
