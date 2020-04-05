const { addNewUser } = require('../modules/auth')

const login = async (req,res) => {
  console.log('ok heard login in the auth controller finally.')
}

const addUser = async (req,res) => {
  // pull out email and password here.
  // need to eventually check to make sure
  // that email doesn't already exisist in db

  const test = await addNewUser('tylermoko1@gmail.com', 'password')
  console.log('this is test', test)
}

module.exports = {
  login,
  addUser
}
