export const corsOptions = {
  "origin": process.env.CORS_ORIGINS,
  "optionsSuccessStatus": 204,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  // "credentials": true
}