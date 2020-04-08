const { addNewAccount, getToken, handleLogin } = require('../modules/auth')

const login = async (req,res) => {
  const { email, password } = req.body
  if(email && password) {
    const token = await handleLogin(email,password)
    if(token) {
      res.json(token)
    }else {
      res.send('error1')
    }
  }else {
    res.send('error2')
  }
}

const addAccount = async (req,res) => {
  const { email, password } = req.body
  if(email && password) {
      const newAccount = await addNewAccount(email,password)
      if(newAccount) {
        const token = await getToken(newAccount)
        if(token) {
          res.json(token)
        }else {
          res.send('error1')
        }
      }else {
        res.send('error2')
      }
  }else {
    res.send('error3')
  }
}

const verifyToken = async (req,res,next) => {
  // verify token returning true or false
}

module.exports = {
  login,
  addAccount
}
