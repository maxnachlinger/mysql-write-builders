# mysql-write-builders

Generates INSERT and UPDATE SQL statements for MySQL from JS objects and arrays

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/maxnachlinger/mysql-write-builders.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/mysql-write-builders
[npm-image]: https://img.shields.io/npm/v/mysql-write-builders.svg?style=flat
[npm-url]: https://npmjs.org/package/mysql-write-builders
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

### Installation:
```
npm i mysql-write-builders
```
### Usage:
```javascript
'use strict'
const writeSql = require('mysql-write-builders')

const thingsToInsert = [
  { name: 'Thing 1', color: 'Red' },
  { name: 'Thing 2', color: 'Blue' }
]

const result = writeSql.insert({
  table: 'test',
  items: thingsToInsert
});
/*
result: {
  sql: INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING id;
  values: ['Thing 1', 'Red', 'Thing 2', 'Blue']
}
*/

const thingToUpdate = { name: 'Thing 1 (edited)', color: 'Green' }

const result = writeSql.update({
  table: 'test',
  item: thingToUpdate,
  where: 'id = 100'
});

/*
result: {
  sql: UPDATE test SET name = $1, color = $2 WHERE id = 100;
  values: ['Thing 1 (edited)', 'Green']
}
*/
```

### Why:
Writing UPDATE and INSERT SQL statements isn't terribly fun, this helps a little with that :)