"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./router/products-router");
const adresses_router_1 = require("./router/adresses-router");
const hometask_01_1 = require("./router/hometask_01");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/products", products_router_1.productsRouter);
exports.app.use("/adresses", adresses_router_1.adressesRouter);
exports.app.use("/hometask_01/api", hometask_01_1.homeTask01Router);
exports.app.get("/", (req, res) => {
    res.send("Hello incubator!!!444");
});
