(function() {
    const express = require('express');
    const bodyParser = require('body-parser');
    const User = require('../schema/schema.js');
    const bcrypt = require('bcrypt-nodejs');
    //const BSON = require('bson');
    //const bson = new BSON();
    const appRouter = express.Router();
    const tokenService = require('../services/token-service');
    const onlineUsers = require('../schema/chatUsersSchema');
    const Blog = require('../schema/bogSchema');
    function router(app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        /*app.use('/app/', (req, res, next) => {
            let authToken = req.headers.authorization;
            if (!authToken) {
                res.status(401).json({ "status": "false", "errorMessage": "UnAuthorized user" })
            }

            let verifyAuthToken;
            try {
                verifyAuthToken = tokenService.verifyToken(authToken);
                next();
            } catch (err) {
                res.status(401).json({ "status": "false", "errorMessage": err.message });
            }

        })*/

        appRouter.route('/')
            .get((req, res) => {
                User.find().then((docs) => {
                    res.json({status:true, data: docs});
                }, (err) => {
                    console.log('ERR - ', err);
                })
            })

            .post((req, res) => {
                let user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;

                user.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json({ msg: 'User Saved' });
                })
            })

        appRouter.get('/getOnlineUsers', (req, res) => {
            onlineUsers.find().then((docs) => {
                console.log('DOC - ', docs);
                let allUsers = [...(new Set(docs))];
                res.json({status: true, data: docs});
            }, (err) =>{
                console.log('Get Chat User err - ', err);
            })
        })

        app.post('/login', (req, res) => {
            let userName = req.body.name;
            let password = req.body.password;
            let onlineUser = new onlineUsers();

            User.findOne({ name: userName }, (err, user) => {
                if (!user) {
                    res.json({ "status": false, "errorMessage": "Invalid User" });
                } else {
                    let check = user.comparePassword(password);
                    if (!check) {
                        res.json({ "status": false, "errorMessage": "Invalid Credentials" });
                    } else {
                        let tokenkey = tokenService.generateToken(user);
                        onlineUser.name = user.name;
                        onlineUser.save((err, doc) =>{
                            console.log('In Save');
                            if(err){
                                console.log(err);
                            }
                        })
                        res.json({ "status": true, "successMessage": "success", "tokenkey": tokenkey });
                    }
                }
            })
        })

        app.post('/blog', (req, res) => {
            let blog = new Blog();

            blog.name = req.body.name;
            blog.title = req.body.title;
            blog.content = new Buffer(req.body.content).toString('base64');
            blog.save((err, doc) => {
                if(err){
                    console.log(err);
                    return;
                }

                res.json({status:true, msg:'saved!'});
            })
        })

        app.get('/getBlogs', (req, res) => {
            Blog.find((err, docs) => {
                if(err){
                    console.log(err);
                }
                docs.map((obj) => {
                    obj.content = new Buffer(obj.content, 'base64').toString('ascii');
                    return obj;
                });
                res.send(docs);
            })
        })

        app.use('/app', appRouter);
    }

    module.exports = router;
})()
