const jwt = require('jsonwebtoken')
const { queryDB } = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwtSecret = 'mytestsecret'

const handleLogin = async (email,password) => {
  console.log('ok made it here with email and password', email, password)
  const account = await getAccountFromEmail(email)
  const verifiedPassword = await checkPass(password, account.hash)

  if(account && verifiedPassword) {
    const token = await getToken(account)
    return token
  }
  return false
}

const addNewAccount = async (email, password) => {
  try {
    const hash = await getHash(password)
    const query = `INSERT INTO account (email, hash)
      VALUES ('${email}', '${hash}')
      RETURNING id, email, hash;`
    
    const data = await queryDB(query)

    if(data.name === 'error') {
      return false
    }else {
      return data.rows[0]
    }
  }catch(e) {
    console.log(e)
    return false
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

async function getAccountFromEmail(email) {
  const query = `SELECT * FROM account WHERE account.Email = '${email}'`
  const data = await queryDB(query)
  
  if(data.name === 'error') {
    return false
  }else {
    return data.rows[0]
  }

}

const getToken = async (account) => {
  const token = jwt.sign({
    AccountID: account.id,
    email: account.email
  }, jwtSecret, { expiresIn: '1h' });
  return token
}

module.exports = {
  getHash,
  checkPass,
  addNewAccount,
  getToken,
  handleLogin
}
