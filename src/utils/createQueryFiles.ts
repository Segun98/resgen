import { camelCase, pascalCase } from "case-anything";
import prettier from "prettier";
import fs from "fs-extra";

const resolverClass = (
  queryName: string,
  operationType: "field" | "query" | "mutation",
  parent?: string
) => {
  let operationName = "Query";

  if (operationType === "field") {
    operationName = "Field";
  }

  if (operationType === "mutation") {
    operationName = "Mutation";
  }

  return `
    import { Ctx, ${operationName}, Resolver } from 'type-graphql';
    
    @Resolver(() => ObjectType)
    export class ${parent ? parent : ""}${pascalCase(queryName)}Resolver {
      @${operationName}(() => ObjectType)
      ${camelCase(queryName)}(
      ){
      }
    }
  
    `;
};

type CreateQueryFilesArgs = {
  appName: string;
  filePathName: string;
  query: string[];
  field: string[];
  mutation: string[];
};
export const createQueryFiles = ({
  appName,
  filePathName,
  query,
  field,
  mutation,
}: CreateQueryFilesArgs) => {
  const pascalCaseAppName = pascalCase(appName);

  if (query?.length > 0 && filePathName === "queries") {
    query.forEach((query) => {
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${query}.ts`,
        prettier.format(resolverClass(query, "query"), {
          semi: false,
          parser: "typescript",
        })
      );
    });
  }
  if (field?.length > 0 && filePathName === "fields") {
    field.forEach((field) => {
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${field}.ts`,
        prettier.format(resolverClass(field, "field", pascalCaseAppName), {
          semi: false,
          parser: "typescript",
        })
      );
    });
  }

  if (mutation?.length > 0 && filePathName === "mutations") {
    mutation.forEach((mutation) => {
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${mutation}.ts`,
        prettier.format(resolverClass(mutation, "mutation"), {
          semi: false,
          parser: "typescript",
        })
      );
    });
  }
};
