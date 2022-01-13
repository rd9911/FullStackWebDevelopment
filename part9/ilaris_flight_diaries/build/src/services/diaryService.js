"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaries_1 = __importDefault(require("../../data/diaries"));
const diaries = diaries_1.default;
const getEntries = () => {
    return diaries;
};
const getNonSensativeEntries = () => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id, date, weather, visibility
    }));
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries, addEntry, getNonSensativeEntries
};
