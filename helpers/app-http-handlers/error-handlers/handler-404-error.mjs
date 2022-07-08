export const handler404Error = (req, rest, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};
