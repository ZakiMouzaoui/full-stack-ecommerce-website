// IMPORTS FROM PACKAGES
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
// const http = require("http");
// const socket = require("./socket");

// IMPORTS FROM LOCAL FILES
const databaseConn = require("./config/database");

const globalError = require("./middlewares/globalError");
const ApiError = require("./utils/apiError");

// ROUTES
const mountRoutes = require("./api");
const { webhookCheckout } = require("./services/orderService");

// ENV CONFIG
dotenv.config({ path: "config.env" });
const port = process.env.PORT;

// DATABASE
databaseConn();

// UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

// EXPRESS APP
const app = express();

// MIDDLEWARES
const allowedOrigins = ["http:localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());
app.options("*", cors());

app.use(compression());

// Checkout webhook
// app.post(
//   "/checkout-webhook",
//   express.raw({ type: "application/json" }),
//   webhookCheckout
// );

app.use(express.json({ limit: "20kb" }));

app.use(express.static(path.join(__dirname, "uploads")));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    "Too many attempts for this user. Please try again in a few minutes.",
});
// Apply the rate limiting middleware to all requests
app.use("/api/v1/auth/login", limiter);

// TO PREVENT HTTP POLLUTION
app.use(
  hpp({
    whitelist: [
      "price",
      "sold",
      "quantity",
      "avgRating",
      "ratingsCount",
      "brand",
      "category",
    ],
  })
);

// Add various HTTP headers
app.use(helmet());

// FORCE TO USE HTTPS
app.use(helmet.hsts());

// AGAINST CLICKJACKING
app.use(helmet.frameguard());

// XSS PROTECTION
app.use(helmet.xssFilter());

// MOUNT ROUTES
mountRoutes(app);

// NOT FOUND ROUTE
app.all("*", (req, res, next) => {
  const err = new ApiError(`Can't find this route: ${req.originalUrl}`, 404);
  next(err);
});

// GLOBAL ERROR HANDLING MIDDLEWARE FOR EXPRESS
app.use(globalError);

// CONNECTING TO SERVER
// const server = http.createServer(app);
// socket.initSocketServer(server);
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}...`);
// });

const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log(err);
    process.exit(1);
  });
});
