const express = require('express');
const UsersRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
UsersRouter.use(bodyParser.urlencoded())
UsersRouter.use(bodyParser.json())
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//login
UsersRouter.route('/login')
.post((request, response) => {
    const password = request.body.password
    const username = request.body.username
    db.user.findOne({where: {username: username, password: password}}
        .then(async (user) =>{
            if (user){
                bcrypt.compare(password, user.password, (error, same) => {
                    if(same){
                        console.log("logged in, user ID =", user.id)
                        request.session.userId = user.id
                        response.redirect('/')
                    }else{
                        response.redirect('/login')
                    }
                })
            }
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
    )
)})//signup
UsersRouter.route('/signUp')
.post(async(request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const username = request.body.username

    db.user.create({email: email, password: encryptedPassword, username: username}).then(user=>{
      //response.send(user) // changed in chapter 7.2
      response.redirect('/login');
    }).catch((error) => {
        response.send("You do not have an account. Try signing up!")
    })
})
/* UsersRouter.route('/signup')
.post(async (request, response) => {
    const email = request.body.email
    const password = request.body.password
    const username = request.body.username
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    db.user.create({email: email[0], username: username, password: password}.then(user=>{
           // response.send(user)
           response.redirect('/login');
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
    )
)}) */



module.exports = UsersRouter;