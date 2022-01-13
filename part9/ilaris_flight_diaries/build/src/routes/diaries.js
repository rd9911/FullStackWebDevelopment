"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const result = diaryService_1.default.getNonSensativeEntries();
    res.send(result);
});
router.post('/', (_req, res) => {
    res.send('Post diaries');
});
exports.default = router;
