const { queryDB } = require('../db')
const { getHash } = require('./auth')
const bcrypt = require('bcrypt')
const saltRounds = 10

const addNewUser = async (email, password) => {
  try {
    const hash = await getHash(password)
    const query = `INSERT INTO account (email, hash)
      VALUES ('${email}', '${hash}')
      RETURNING id;`
    
    const res = await queryDB(query)
    return res
  }catch(e) {
    return e
  }
}

async function getHash(password) {
  const hash = await bcrypt.hash(password,saltRounds)
  return hash
}

async function checkPass(password, hash) {
  const match = await bcrypt.compare(password, hash)
  return match
}


async function testingPassword() {
  const password = 'thisisatestofthehash'
  const hash = await getHash(password)
  const matches = await checkPass(password,hash)
  console.log('this is matches', matches)
}

module.exports = {
  getHash,
  checkPass,
  addNewUser
}
