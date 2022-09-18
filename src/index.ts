#!/usr/bin/env node
import yargs from "yargs";

type Args = {
  ["name"]: string;
  ["skip"]?: string;
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
}).argv;

const input = args as Args;

console.log(input);
