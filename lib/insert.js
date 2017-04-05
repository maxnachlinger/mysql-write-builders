'use strict'

module.exports = (params) => {
  const sql = ['INSERT']

  if (params.ignore) {
    sql.push(' IGNORE')
  }

  sql.push(` INTO ${params.table} `)

  // get fields from the first item
  const fields = Object.keys(params.items[0])

  sql.push(`(${fields.join(', ')}) VALUES ? `)

  if (params.upsert) {
    sql.push('ON DUPLICATE KEY UPDATE ')
  }

  // values needs to be a 2-d array for bulk INSERT
  const values = params.items
    .map((item) => Object.keys(item).map((key) => item[key]))

  if (params.upsert) {
    sql.push(
      // column = VALUES(column),
      fields
        .map((field) => `${field} = VALUES(${field})`)
        .join(', ')
    )
  }

  return {
    sql: sql.join('').trim(),
    values
  }
}
