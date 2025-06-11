"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_module_1 = require("../../../config/transaction.module");
const expressRouteAdapter_1 = require("../adapters/expressRouteAdapter");
const router = (0, express_1.Router)();
const controller = transaction_module_1.TransactionModule.buildCreateTransactionController();
router.post("/transactions", (0, expressRouteAdapter_1.expressRouteAdapter)(controller));
exports.default = router;
