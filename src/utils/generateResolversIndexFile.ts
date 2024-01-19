import fs from "fs-extra";
import prettier from "prettier";
import { pascalCase } from "case-anything";

type GenerateResolversIndexFileArgs = {
  appName: string;
  filePathName: "queries" | "fields" | "mutations" | "";
  queries: string[];
  fields: string[];
  mutations: string[];
  resolverVariableName: string;
};
export const generateResolversIndexFile = ({
  appName,
  filePathName,
  queries,
  fields,
  mutations,
  resolverVariableName,
}: GenerateResolversIndexFileArgs) => {
  if (queries?.length > 0 && filePathName === "queries") {
    const imports: string[] = [];
    const exports: string[] = [];
    queries.forEach((query) => {
      imports.push(`import { ${pascalCase(query)}Resolver } from "./${query}"`);
      exports.push(`${pascalCase(query)}Resolver`);
    });

    const data = `${[...new Set(imports)].join("; \n ")}
      
      
    export const ${appName}${resolverVariableName}Resolvers =   [${[
      ...new Set(exports),
    ].join(", \n ")}];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (fields?.length > 0 && filePathName === "fields") {
    const imports: string[] = [];
    const exports: string[] = [];
    fields.forEach((field) => {
      imports.push(
        `import { ${pascalCase(appName)}${pascalCase(
          field
        )}Resolver } from "./${field}"`
      );
      exports.push(`${pascalCase(appName)}${pascalCase(field)}Resolver`);
    });

    const data = `${[...new Set(imports)].join("; \n ")}
        
        
        export const ${appName}${resolverVariableName}Resolvers =   [${[
      ...new Set(exports),
    ].join(", \n ")}];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (mutations?.length > 0 && filePathName === "mutations") {
    const imports: string[] = [];
    const exports: string[] = [];
    mutations.forEach((mutation) => {
      imports.push(
        `import { ${pascalCase(mutation)}Resolver } from "./${mutation}"`
      );
      exports.push(`${pascalCase(mutation)}Resolver`);
    });

    const data = `${[...new Set(imports)].join("; \n ")}
        
        
        export const ${appName}${resolverVariableName}Resolvers =   [${[
      ...new Set(exports),
    ].join(", \n ")}];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  //create an index file if no queries
  if (filePathName === "fields" && !fields.length) {
    const data = `export const ${appName}${resolverVariableName}Resolvers = [];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (filePathName === "mutations" && !mutations.length) {
    const data = `export const ${appName}${resolverVariableName}Resolvers = [];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (filePathName === "queries" && !queries.length) {
    const data = `export const ${appName}${resolverVariableName}Resolvers = [];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }
};

type WriteFileArgs = {
  appName: string;
  filePathName: string;
  data: string;
};
const writeFile = ({ appName, filePathName, data }: WriteFileArgs) => {
  fs.writeFileSync(
    `./src/resolvers/${appName}/${filePathName}/index.ts`,
    prettier.format(data, {
      parser: "typescript",
      semi: true,
      singleQuote: true,
      printWidth: 80,
      arrowParens: "avoid",
      trailingComma: "all",
    })
  );
};
