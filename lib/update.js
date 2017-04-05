'use strict'

module.exports = (params) => {
  const sql = [`UPDATE ${params.table} SET `]

  // col = value clause
  const fieldsValues = Object.keys(params.item).reduce((accum, key) => {
    accum.fields.push(`${key} = ?`)
    accum.values.push(params.item[key])
    return accum
  }, {fields: [], values: []})

  sql.push(
    fieldsValues.fields.join(', ')
  )

  if (params.where) {
    sql.push(` WHERE ${params.where}`)
  }

  return {
    sql: sql.join('').trim(),
    values: fieldsValues.values
  }
}
