# shop-back  #

## Install ##

The project are using Yarn to manager the packages.

```shell
$ yarn
```

## Run project ##

### Dev mode ###

Dev mode is configure to use all features in the local machine.

Project will run in the port: `3001`

```shell
$ yarn start:dev
```

### Production mode ###

Production mode is configure to run with dinamics parameters.

Project will run in the port: `8081`

```shell
$ yarn start
```

### Test mode ###

Command to run all tests.

```shell
$ yarn test
```


## Endpoints ##

```shell
GET /repositories/search
```

Edpoint to get repositories in Github API by different parameters.

| Querystring | Type| Description |
|-------------|-----|-------------|
| date | string | Date when the project was created. The endpoint will return data that the date of creation is greater than that parameter|
| language | string| Programation language |
| sort | string| field that you can sort: starts, forks, help-wanted-issues or updated|
| order | string| order of data. can be: desc or asc|
| page | number| pagination of request |
| perPage | number| number of data to return per page|
