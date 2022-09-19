import fs from "fs-extra";
import path from "path";

let importStatements: String[] = [];
let spreadImports: String[] = [];

export const filterFunc = (dest: string, appName: string, skip?: String[]) => {
  let destArr = dest.split("/");
  const isFieldsDir = destArr.some((item) => item === "fields");
  const isMutationsDir = destArr.some((item) => item === "mutations");
  const isQueriesDir = destArr.some((item) => item === "queries");

  if (skip) {
    if (isFieldsDir && skip.includes("f")) return false;
    if (isMutationsDir && skip.includes("m")) return false;
    if (isQueriesDir && skip.includes("q")) return false;
  }

  const resolverVariableName = () => {
    if (isFieldsDir) return "Field";
    if (isMutationsDir) return "Mutation";
    if (isQueriesDir) return "Query";

    return "";
  };

  const filePathName = () => {
    if (isFieldsDir) return "fields";
    if (isMutationsDir) return "mutations";
    if (isQueriesDir) return "queries";

    return "";
  };

  //import resolvers to the index file
  if (resolverVariableName()) {
    importStatements.push(
      `import {${appName}${resolverVariableName()}Resolvers } from "./${filePathName()}"`
    );
    spreadImports.push(`...${appName}${resolverVariableName()}Resolvers`);
  }

  setTimeout(() => {
    let data = "";

    if (!filePathName()) {
      data = `
${[...new Set(importStatements)].join("; \n ")}
              
export const ${appName}${resolverVariableName()}Resolvers = [
  ${[...new Set(spreadImports)].join(", \n ")}
];
`;
    } else {
      data = `export const ${appName}${resolverVariableName()}Resolvers = [];`;
    }

    fs.writeFileSync(
      `${path.resolve(
        __dirname
      )}/../../src/resolvers/${appName}/${filePathName()}/index.ts`,
      data
    );
  }, 2000);

  return true;
};
