const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Response = require('../models/Response')
const{ ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

router.post('/quiz/greymatter', ensureAuthenticated, async (req, res) => {
    const {a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20} = req.body;

    const user = await User.findOne({email: req.user.email});
    const response = new Response;
    
    user.greyMatter = true;
    await user.save();

    response.name = user.name;
    response.user = user._id;
    response.greyMatter.push(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
    await response.save();

    res.send(response);
})

router.post('/quiz/languageriot', ensureAuthenticated, async (req, res) => {
    const {a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20} = req.body;

    const user = await User.findOne({email: req.user.email});
    const response = await Response.findOne({ user: user._id});
    
    user.languageRiot = true;
    await user.save();

    response.languageRiot.push(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
    await response.save();

    res.send(response);
})

router.post('/quiz/rackYB', ensureAuthenticated, async (req, res) => {
    const {a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20} = req.body;

    const user = await User.findOne({email: req.user.email});
    const response = await Response.findOne({ user: user._id});
    
    user.rackYB = true;
    await user.save();

    response.rackYB.push(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
    await response.save();

    res.send(response);
})

module.exports = router;