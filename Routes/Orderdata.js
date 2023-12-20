const express = require('express');
const router = express.Router();
const myorders = require('../models/Orders');
router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    //console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await myorders.findOne({ 'email': req.body.email })    
    //console.log(eId)
    if (eId===null) {
        try {
            //console.log(data)
            //console.log("1231242343242354",req.body.email)
            await myorders.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            //console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await myorders.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            //console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
router.post('/myorderdata', async (req, res) => {
    try {
        //console.log(req.body.email)
        let eId = await myorders.findOne({ 'email': req.body.email });
        //console.log(eId)
        res.json({orderData:eId});
    } catch (error) {
        res.send("server Error",error.message)
    }
    

});

module.exports=router;