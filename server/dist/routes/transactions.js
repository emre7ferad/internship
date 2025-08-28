"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_1 = require("../middleware/validation");
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateToken);
router.post('/', validation_1.validateTransaction, transactionController_1.createTransaction);
router.get('/account/:accountId', transactionController_1.getTransactionsByAccount);
router.get('/:id', transactionController_1.getTransactionById);
router.put('/:id', validation_1.validateTransactionUpdate, transactionController_1.updateTransaction);
router.delete('/:id', transactionController_1.deleteTransaction);
router.get('/account/:accountId/summary', transactionController_1.getTransactionSummary);
exports.default = router;
