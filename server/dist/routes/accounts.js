"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controllers/accountController");
const router = express_1.default.Router();
router.post('/', accountController_1.createAccount);
router.get('/:id', accountController_1.getAccountById);
router.get('/user/:userId', accountController_1.getAccountsByUser);
router.get('/:id/summary', accountController_1.getAccountSummary);
exports.default = router;
