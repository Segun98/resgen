# resgen

An opinionated CLI tool to generate GraphQL resolver folders and files

## Installing

> $ npm i resgen or yarn add resgen

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

> $ regen -n User -s f

> The above command generates a User folder with 'mutations' and 'queries' subfolders, skipping 'fields' subfolder

### Skip more than one files

> $ regen -n User -s m q

> The above command skips 'mutations' and 'queries' subfolders
