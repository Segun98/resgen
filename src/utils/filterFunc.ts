import { createQueryFiles } from "./createQueryFiles";
import { generateQueryIndexFiles } from "./generateQueryIndexFiles";
import fs from "fs-extra";
import prettier from "prettier";

let importStatements: String[] = [];
let spreadImports: String[] = [];

type Input = {
  ["name"]: string;
  ["skip"]?: string[];
  ["queries"]?: string[];
  ["fields"]?: string[];
  ["mutations"]?: string[];
};

export const filterFunc = (dest: string, appName: string, input?: Input) => {
  const skip = input?.skip;
  const queries = input?.queries || [];
  const fields = input?.fields || [];
  const mutations = input?.mutations || [];

  let destArr = dest.split("/");
  const isFieldsDir = destArr.some((item) => item === "fields");
  const isMutationsDir = destArr.some((item) => item === "mutations");
  const isQueriesDir = destArr.some((item) => item === "queries");

  //skip folders passed in cli arg
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

  //import resolvers to the root index.ts file
  if (resolverVariableName()) {
    importStatements.push(
      `import { ${appName}${resolverVariableName()}Resolvers } from "./${filePathName()}"`
    );
    spreadImports.push(`...${appName}${resolverVariableName()}Resolvers`);
  }

  setTimeout(() => {
    let data = "";

    //root index.ts file
    if (!filePathName()) {
      data = `
${[...new Set(importStatements)].join("; \n ")}
              
export const ${appName}${resolverVariableName()}Resolvers = [
  ${[...new Set(spreadImports)].join(", \n ")}
];
`;
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName()}/index.ts`,
        prettier.format(data, { semi: false, parser: "typescript" })
      );
    } else {
      generateQueryIndexFiles({
        appName,
        filePathName: filePathName(),
        queries,
        fields,
        mutations,
        resolverVariableName: resolverVariableName(),
      });
    }

    createQueryFiles({
      appName,
      filePathName: filePathName(),
      queries,
      fields,
      mutations,
    });
  }, 50);

  return true;
};
