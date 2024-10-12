"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressesRouter = void 0;
const express_1 = require("express");
const adresses = [{ id: 1, title: 'adress 1' }, { id: 2, title: 'street 2' }];
exports.adressesRouter = (0, express_1.Router)();
exports.adressesRouter.get("/", (req, res) => {
    res.send(adresses);
});
exports.adressesRouter.get("/:id", (req, res) => {
    const adress = adresses.find(p => p.id === +req.params.id);
    if (adress)
        res.send(adress);
    else
        res.send(404);
});
