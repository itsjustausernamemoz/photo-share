const express = require('express');
const UsersRouter = require.Router();
const db = require('../models');
const bodyParser = require('body-parser');
UsersRouter.use(bodyParse.urlencoded())
UsersRouter.use(bodyParse.json())

UsersRouter.Route('/login')
.post((request, response) => {
    const password = request.body.password
    const username = request.body.username
    db.users.findOne({where: {username: username, password: password}}.then(user=>{
            response.send(user)
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
    )
)})






module.exports = UsersRouter;