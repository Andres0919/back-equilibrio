import { Router } from "express";
import { TransactionModule } from "../../../config/transaction.module";
import { expressRouteAdapter } from "../adapters/expressRouteAdapter";

const router = Router();

const controller = TransactionModule.buildCreateTransactionController();
router.post("/transactions", expressRouteAdapter(controller));

export default router;
