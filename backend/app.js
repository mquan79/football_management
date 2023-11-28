const express = require("express");
const cors = require("cors");
const usersRouter = require("./app/routes/user.route");
const adminsRouter = require("./app/routes/admin.route");
const goodsRouter = require("./app/routes/goods.route");
const cartRouter = require("./app/routes/cart.route");
const matchRouter = require("./app/routes/match.route");
const coinRouter = require("./app/routes/coin.route")
const ApiError = require("./app/api-error")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.json({message: "Welcome to user application"});
});

app.use("/api/users", usersRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/goods", goodsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/match", matchRouter);
app.use("/api/coin", coinRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resoure not fonnd"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;