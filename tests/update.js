'use strict'

const test = require('tape')
const update = require('../lib').update

test('Constructs a simple update', (t) => {
  const item = {name: 'Test', color: 'Blue'}
  const expected = {
    sql: 'UPDATE test SET name = ?, color = ? WHERE id = 1',
    values: Object.keys(item).map((key) => item[key])
  }

  const result = update({
    item,
    where: 'id = 1',
    table: 'test'
  })

  t.deepEqual(result, expected, 'Returns the expected SQL and values')
  t.end()
})
