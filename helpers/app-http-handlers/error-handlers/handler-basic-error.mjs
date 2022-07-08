export const handlerBasicError = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const envIsDevelopment = req.app.get("env") === "development";

  res.locals.message = err.message || "An error occurred";
  res.locals.error = envIsDevelopment ? err : {};

  res.status(err.status || 500);
  res.render("error");
};
