const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

const queryDB = async (query) => {
  try {
    const res = await pool.query(query)
    return res
  } catch(e) {
    return e
  }
}

module.exports = {
  queryDB
}
