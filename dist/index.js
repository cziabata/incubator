"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./router/products-router");
const adresses_router_1 = require("./router/adresses-router");
const hometask_01_1 = require("./router/hometask_01");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/products", products_router_1.productsRouter);
app.use("/adresses", adresses_router_1.adressesRouter);
app.use("/hometask_01/api", hometask_01_1.homeTask01Router);
app.get("/", (req, res) => {
    res.send("Hello incubator!!!444");
});
app.listen(PORT, () => {
    console.log(`App started on ${PORT} port`);
});
