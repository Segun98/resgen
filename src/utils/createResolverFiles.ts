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
    operationName = "FieldResolver";
  }

  if (operationType === "mutation") {
    operationName = "Mutation";
  }

  return `
    import { Ctx,Arg, ${operationName}, Resolver } from 'type-graphql';
    
    @Resolver(() => ObjectType)
    export class ${parent ? parent : ""}${pascalCase(queryName)}Resolver {
      @${operationName}(() => ObjectType)
      ${camelCase(queryName)}(
        @Ctx() ctx: CtxType,
        @Arg("arg", ()=> String, {nullable:true}) arg: string
      ){
        //resolver logic
      }
    }
  
    `;
};

type CreateResolverFilesArgs = {
  appName: string;
  filePathName: string;
  queries: string[];
  fields: string[];
  mutations: string[];
};
export const createResolverFiles = ({
  appName,
  filePathName,
  queries,
  fields,
  mutations,
}: CreateResolverFilesArgs) => {
  const pascalCaseAppName = pascalCase(appName);

  if (queries?.length > 0 && filePathName === "queries") {
    queries.forEach((query) => {
      writeFile({
        path: `./src/resolvers/${appName}/${filePathName}/${query}.ts`,
        data: resolverClass(query, "query"),
      });
    });
  }
  if (fields?.length > 0 && filePathName === "fields") {
    fields.forEach((field) => {
      writeFile({
        path: `./src/resolvers/${appName}/${filePathName}/${field}.ts`,
        data: resolverClass(field, "field", pascalCaseAppName),
      });
    });
  }

  if (mutations?.length > 0 && filePathName === "mutations") {
    mutations.forEach((mutation) => {
      writeFile({
        path: `./src/resolvers/${appName}/${filePathName}/${mutation}.ts`,
        data: resolverClass(mutation, "mutation"),
      });
    });
  }
};

type WriteFileArgs = {
  path: string;
  data: string;
};
const writeFile = ({ path, data }: WriteFileArgs) => {
  fs.writeFileSync(
    path,
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
