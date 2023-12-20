const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secrettoken='mynameistejeshreddypursuingbcainmanipaluniversityaiminingtobecomefullstackdeveloper';
router.post('/createuser',
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 6 }),
    body('name').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let secpassword=await bcrypt.hash(req.body.password,salt);
        await user.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
            location: req.body.location

        }).then(() => { res.send({ success: true }); }).catch((error) => {
            console.log(error);
            res.send({ success: false });
        })
    })


router.post('/loginuser',
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        await user.findOne({
            email: req.body.email,
        }).then(async (data)=>{
            if (!data) {
                return res.status(400).send({ errors: 'try logging with correct email' });
            }
            let cmpassword=await bcrypt.compare(req.body.password,data.password)
            if (!cmpassword) {
                return res.status(400).send({ errors: 'try logging with correct password'});
            }
            const used={
                user:{
                    id:data.id
                }
            }
            const authtoken=jwt.sign(used,secrettoken);
            return res.send({ success: true,authtoken:authtoken});
            
        }).catch((error) => {
            console.log(error);
            res.send({ success: false });
        })
    })
module.exports = router;