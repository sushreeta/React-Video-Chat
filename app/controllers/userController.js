// const express = require('express')
// const router = express.Router()
// const {User} = require('../model/user')
// // const {authenticateUser} = require('../middlewares/authentication')


// //localhost:3000/users/register
// router.post('/register', (req,res)=>{
//      const body = req.body
//      const user = new User(body)
//      user.save()
//           .then((user)=>{
//                res.json(user)
//           })
//           .catch((err)=>{
//                res.send(err)
//           })
// })


// //localhost:3000/users/login
// router.post('/login', (req,res)=>{
//      const body = req.body
//      User.findByCredentials(body.email, body.password)
//           .then(function(user){
//                return user.generateToken()
//           })
//           .then(function(token){
//                res.setHeader('x-auth',token).send({})
//           })
//           .catch((err)=>{
//                res.send(err)
//           })
// })

// //localhost:3000/users/account
// router.get('/account',(req,res)=>{
//      const { user } = req
//      res.send(user)
// })


// //localhost:3000/users/logout
// router.delete('/logout',authenticateUser, (req,res)=>{
//      const { user, token } = req
//      User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token }}})
//           .then(()=>{
//                res.send('Successfully logged out')
//           })
//           .catch((err)=>{
//                res.send(err)
//           })
// })

// module.exports = {
//      userRouter : router
// }