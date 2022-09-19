import fs from "fs-extra";
import path from "path";

export const filterFunc = (dest: string, appName: string, skip?: String[]) => {
  let destArr = dest.split("/");
  const fieldsExist = destArr.some((item) => item === "fields");
  const mutationsExist = destArr.some((item) => item === "mutations");
  const queriesExist = destArr.some((item) => item === "queries");

  if (skip) {
    if (fieldsExist && skip.includes("f")) return false;
    if (mutationsExist && skip.includes("m")) return false;
    if (queriesExist && skip.includes("q")) return false;
  }

  const resolverVariableName = () => {
    if (fieldsExist) return "Field";
    if (mutationsExist) return "Mutation";
    if (queriesExist) return "Query";

    return "";
  };

  const filePath = () => {
    if (fieldsExist) return "fields";
    if (mutationsExist) return "mutations";
    if (queriesExist) return "queries";

    return "";
  };

  setTimeout(() => {
    let data = `//export const ${appName}${resolverVariableName()}Resolvers = []`;
    fs.writeFileSync(
      `${path.resolve(
        __dirname
      )}/../../src/resolvers/${appName}/${filePath()}/index.ts`,
      data
    );
  }, 1000);

  return true;
};
