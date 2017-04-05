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

#### Insert
```javascript
const writeSql = require('mysql-write-builders')

const items = [
  {id: 1, name: 'Test 1', color: 'Blue'},
  {id: 2, name: 'Test 2', color: 'Red'}
]

const result = writeSql.insert({
  table: 'test',
  items
})
/*
result:
{ 
  sql: 'INSERT INTO test (id, name, color) VALUES ?',
  values: [ [ 1, 'Test 1', 'Blue' ], [ 2, 'Test 2', 'Red' ] ] 
}
*/
```

#### Upsert
```javascript
const writeSql = require('mysql-write-builders')

const items = [
  {id: 1, name: 'Test 1', color: 'Blue'},
  {id: 2, name: 'Test 2', color: 'Red'}
]

const result = insert({
  table: 'test',
  items,
  upsert: true
})
/*
result: {
  sql: 'INSERT INTO test (id, name, color) VALUES ? 
    ON DUPLICATE KEY UPDATE 
    id = VALUES(id), 
    name = VALUES(name), 
    color = VALUES(color)',
  values: items.map((item) => Object.keys(item).map((key) => item[key]))
}
*/
```

#### Insert ignore
```javascript
const writeSql = require('mysql-write-builders')

const items = [
  {id: 1, name: 'Test 1', color: 'Blue'},
  {id: 2, name: 'Test 2', color: 'Red'}
]

const result = writeSql.insert({
  table: 'test',
  items,
  ignore: true,
})
/*
result:
{ 
  sql: 'INSERT IGNORE INTO test (id, name, color) VALUES ?',
  values: [ [ 1, 'Test 1', 'Blue' ], [ 2, 'Test 2', 'Red' ] ] 
}
*/
```

#### Update
```javascript
const writeSql = require('mysql-write-builders')

const item = { name: 'Thing 1 (edited)', color: 'Green' }

const result = writeSql.update({
  table: 'test',
  item,
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
