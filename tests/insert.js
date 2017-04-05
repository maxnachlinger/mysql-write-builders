'use strict'

const test = require('tape')
const insert = require('../lib').insert

test('Constructs a simple bulk insert', (t) => {
  const items = [
    {id: 1, name: 'Test 1', color: 'Blue'},
    {id: 2, name: 'Test 2', color: 'Red'}
  ]
  const expected = {
    sql: 'INSERT INTO test (id, name, color) VALUES ?',
    values: items.map((item) => Object.keys(item).map((key) => item[key]))
  }

  const result = insert({
    items,
    table: 'test'
  })

  t.deepEqual(result, expected, 'Returns the expected SQL and values')
  t.end()
})

test('Constructs a simple bulk upsert', (t) => {
  const items = [
    {id: 1, name: 'Test 1', color: 'Blue'},
    {id: 2, name: 'Test 2', color: 'Red'}
  ]
  const expected = {
    sql: 'INSERT INTO test (id, name, color) VALUES ? ON DUPLICATE KEY UPDATE id = VALUES(id), name = VALUES(name), ' +
    'color = VALUES(color)',
    values: items.map((item) => Object.keys(item).map((key) => item[key]))
  }

  const result = insert({
    items,
    table: 'test',
    upsert: true
  })

  t.deepEqual(result, expected, 'Returns the expected SQL and values')
  t.end()
})

test('Constructs a simple bulk insert ignore', (t) => {
  const items = [
    {id: 1, name: 'Test 1', color: 'Blue'},
    {id: 2, name: 'Test 2', color: 'Red'}
  ]
  const expected = {
    sql: 'INSERT IGNORE INTO test (id, name, color) VALUES ?',
    values: items.map((item) => Object.keys(item).map((key) => item[key]))
  }

  const result = insert({
    items,
    table: 'test',
    ignore: true
  })

  t.deepEqual(result, expected, 'Returns the expected SQL and values')
  t.end()
})
