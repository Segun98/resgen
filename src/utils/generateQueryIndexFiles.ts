import fs from "fs-extra";
import prettier from "prettier";
import { pascalCase } from "case-anything";

type GenerateQueryIndexFilesArgs = {
  appName: string;
  filePathName: "queries" | "fields" | "mutations" | "";
  query: string[];
  field: string[];
  mutation: string[];
  resolverVariableName: string;
};
export const generateQueryIndexFiles = ({
  appName,
  filePathName,
  query,
  field,
  mutation,
  resolverVariableName,
}: GenerateQueryIndexFilesArgs) => {
  if (query?.length > 0 && filePathName === "queries") {
    const imports: string[] = [];
    const exports: string[] = [];
    query.forEach((query) => {
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

  if (field?.length > 0 && filePathName === "fields") {
    const imports: string[] = [];
    const exports: string[] = [];
    field.forEach((field) => {
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

  if (mutation?.length > 0 && filePathName === "mutations") {
    const imports: string[] = [];
    const exports: string[] = [];
    mutation.forEach((mutation) => {
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
  if (filePathName === "fields" && !field.length) {
    const data = `export const ${appName}${resolverVariableName}Resolvers = [];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (filePathName === "mutations" && !mutation.length) {
    const data = `export const ${appName}${resolverVariableName}Resolvers = [];`;

    writeFile({
      appName,
      filePathName,
      data,
    });
  }

  if (filePathName === "queries" && !query.length) {
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
    prettier.format(data, { semi: false, parser: "typescript" })
  );
};
