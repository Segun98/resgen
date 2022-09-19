#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const filterFunc_1 = require("./utils/filterFunc");
const TEMPLATE_PATH = `${path_1.default.resolve(__dirname)}/../src/template`;
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
const appName = input.name;
const trimmedAppName = appName.replace(/\s+/g, "");
const destDir = `./src/resolvers/${trimmedAppName}`;
fs_extra_1.default.mkdir(destDir, { recursive: true }, (err) => {
    var _a;
    console.log((_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "");
    fs_extra_1.default.copySync(TEMPLATE_PATH, destDir, {
        filter: (_, dest) => {
            return (0, filterFunc_1.filterFunc)(dest, trimmedAppName, input.skip);
        },
        overwrite: true,
    });
});
//# sourceMappingURL=index.js.map