#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const args = (0, yargs_1.default)(process.argv.slice(2)).options({
    name: {
        alias: "n",
        describe: "folder name",
        demandOption: true,
    },
    skip: {
        type: "array",
        alias: "s",
        describe: "skip a folder: field (f), mutation(m), queries (q)",
        choices: ["f", "m", "q"],
    },
}).argv;
const input = args;
console.log(input);
//# sourceMappingURL=index.js.map