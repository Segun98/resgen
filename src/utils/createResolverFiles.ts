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
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${query}.ts`,
        prettier.format(resolverClass(query, "query"), {
          parser: "typescript",
          semi: true,
          singleQuote: true,
          printWidth: 80,
          arrowParens: "avoid",
          trailingComma: "all",
        })
      );
    });
  }
  if (fields?.length > 0 && filePathName === "fields") {
    fields.forEach((field) => {
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${field}.ts`,
        prettier.format(resolverClass(field, "field", pascalCaseAppName), {
          parser: "typescript",
          semi: true,
          singleQuote: true,
          printWidth: 80,
          arrowParens: "avoid",
          trailingComma: "all",
        })
      );
    });
  }

  if (mutations?.length > 0 && filePathName === "mutations") {
    mutations.forEach((mutation) => {
      fs.writeFileSync(
        `./src/resolvers/${appName}/${filePathName}/${mutation}.ts`,
        prettier.format(resolverClass(mutation, "mutation"), {
          parser: "typescript",
          semi: true,
          singleQuote: true,
          printWidth: 80,
          arrowParens: "avoid",
          trailingComma: "all",
        })
      );
    });
  }
};
