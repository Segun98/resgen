#!/usr/bin/env node
import yargs from "yargs";
import fs from "fs-extra";
import path from "path";
import { filterFunc } from "./utils/filterFunc";

const TEMPLATE_PATH = `${path.resolve(__dirname)}/../src/template`;

type Args = {
  ["name"]: string;
  ["skip"]?: string[];
  ["query"]?: string[];
  ["field"]?: string[];
  ["mutation"]?: string[];
};

const args = yargs(process.argv.slice(2)).options({
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
  query: {
    type: "array",
    alias: "q",
    describe: "specify query names to be generated",
  },
  field: {
    type: "array",
    alias: "f",
    describe: "specify field names to be generated",
  },
  mutation: {
    type: "array",
    alias: "m",
    describe: "specify mutation names to be generated",
  },
}).argv;

const input = args as Args;

const appName = input.name;
const trimmedAppName = appName.replace(/\s+/g, "");

const destDir = `./src/resolvers/${trimmedAppName}`;

fs.mkdir(destDir, { recursive: true }, (err) => {
  console.log(err?.message ?? "");

  fs.copySync(TEMPLATE_PATH, destDir, {
    filter: (_, dest) => {
      return filterFunc(dest, trimmedAppName, input);
    },
    overwrite: true,
  });

  //   process.exit(0);
});
