const express = require('express')
const router = express.Router()
const passport = require('passport')
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth')

const User = require('../models/User')
const { route } = require('.')

//@method   POST
//@desc     Registers user
//@access   public
router.post('/register', async (req, res) => {
    const { name, email, password, password2, code } = req.body;
    console.log(req.body)
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }

    if(password != password2){
        errors.push({msg: 'Passwords do not match'});
    }
    if(9 < 6){
        errors.push({ msg: 'Password should be at leadt 6 characters long.'})
    }
    if(errors.length > 0){
        res.send({errors, name, email});
    } else {
        let member = false;
        if(code === 'SSITofficial'){
            member = true;
        }

        const user = await User.findOne({ email });
        if(user){
            errors.push({msg : `User with email ${email} already exists as ${user.name}.`});
            res.send(500, {errors, name, email, password, password2});
        } else{
            const newUser = new User({ name, email, password, password2, member});
            newUser.save();
            res.send(200, newUser);
        }

    }
})

//@method   POST
//@desc     Logs in the user
//@access   Public
router.get('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//@method   GET
//@desc     Logs out the user
//@access   Private
router.get('/logout', (req, res) => {
    req.logout();
    res.send({ msg: `User ${req.user.name} has successfully logged out.`});
})
module.exports = router;

