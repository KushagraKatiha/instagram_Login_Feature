const express = require('express')
const { home, signIn, signUp, getUser, signOut } = require('../controllers/userControllers.js')
const auth = require('../middleware/auth.js')

const router = express.Router()

router.get('/', home)
router.post('/signin', signIn)
router.post('/signup', signUp)
router.get('/getuser', auth, getUser)
router.post('/signout', auth, signOut)

module.exports = router