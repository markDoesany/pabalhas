const {loginUser, signupUser} = require('../controllers/userController')
const express = require('express')

const router = express.Router()

//login routs
router.post('/login', loginUser)

//signup up routers
router.post('/signup', signupUser)


module.exports = router