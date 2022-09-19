# resgen

An opinionated CLI tool to generate GraphQL resolver folders and files

## Installing

```
$ npm i -g resgen or yarn global add resgen
```

## Commands

```
Options:
      --help     Show help
      --version  Show version
  -n, --name     folder name                                          [required]
  -s, --skip     skip a folder: fields (f), mutations(m), queries (q)
                                               choices: "f", "m", "q"
```

## Usage

```
$ rgen -n User -s f
```

```
The above command generates a User folder with 'mutations' and 'queries' subfolders,
skipping 'fields' subfolder.


| +-- resolvers
|    +-- User
|       +-- mutations
|           +-- index.ts
|        +-- queries
|           +-- index.ts
|    +-- index.ts

```

### Skip more than one file

```
$ rgen -n User -s m q
```

```
The above command skips 'mutations' and 'queries' subfolders.

| +-- resolvers
|    +-- User
|       +-- fields
|          +-- index.ts
|    +-- index.ts

```

```
This tool was modelled after the folder structure I use for my GraphQL server applications

| +-- src
|   +-- resolvers
|      +-- User
|        +-- fields
|          +-- index.ts
|      +-- index.ts

```
