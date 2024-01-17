# resgen

An opinionated CLI tool to generate GraphQL resolver folders

## Installing

```
Install globally:

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
  --qs --queries specify query names to be generated
  --ms --mutations specify mutation names to be generated
  --fs --fields specify field names to be generated
```

## Usage

```
$ rgen -n User -s f
```

```
The above command generates a 'User' folder with 'mutations' and 'queries' subfolders, skipping 'fields' subfolder.

Note: rgen looks for a 'src' folder in your root directory and creates a 'resolvers' folder in 'src' if it doesn't exist.


| +-- resolvers
|    +-- User
|       +-- mutations
|           +-- index.ts
|        +-- queries
|           +-- index.ts
|      +-- index.ts

```

### Specify queries

```

$ rgen -n User -s f --qs getUser --ms createUser

`getUser` and `createUser`  files are added to the 'queries' and 'mutations' subfolders respectively. These files have a starter Class method.

| +-- resolvers
|    +-- User
|       +-- mutations
|           +-- createUser.ts
|           +-- index.ts
|        +-- queries
|           +-- getUser.ts
|           +-- index.ts
|      +-- index.ts

```

### Skip more than one folder

```
$ rgen -n User -s m q
```

```
The above command skips 'mutations' and 'queries' subfolders.

| +-- resolvers
|    +-- User
|       +-- fields
|          +-- index.ts
|      +-- index.ts

```

```
This tool was modelled after the folder structure I use for my GraphQL server applications

| +-- src
|   +-- resolvers
|     +-- User
|        +-- fields
|          +-- index.ts
|        +-- mutations
|          +-- index.ts
|        +-- queries
|          +-- index.ts
|       +-- index.ts

```
