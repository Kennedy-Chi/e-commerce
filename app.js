const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
// const userRouter = require("./routes/userRoutes");
// const bannerRouter = require("./routes/bannerRoutes");
const itemRouter = require("./routes/itemRoutes");
// const salesRouter = require("./routes/salesRoutes");
// const emailRouter = require("./routes/emailRoutes");
// const faqRouter = require("./routes/faqRoutes");
// const itemController = require("./controllers/itemController");
// const orderController = require("./controllers/orderController");
const globalErrorHandler = require("./controllers/errorController");
dotenv.config({ path: "./config.env" });

const app = express();
const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New WS connection");

//   chatController.createChat(io, socket);
//   chatController.endChat(io, socket);
//   chatController.getRooms(io, socket);
//   chatController.getOffices(io, socket);
//   itemController.fetchItems(io, socket);
//   orderController.updateOrder(io, socket);
//   orderController.createOrder(io, socket);
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(xss());

app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan

// app.use("/api/v1/users", userRouter);
app.use("/api/items", itemRouter);
// app.use("/api/v1/sales", salesRouter);
// app.use("/api/v1/banner", bannerRouter);
// app.use("/api/v1/email", emailRouter);
// app.use("/api/v1/faq", faqRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist/")));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

app.use(globalErrorHandler);

module.exports = { server };
