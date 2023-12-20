const express = require('express');
const router = express.Router();
router.post('/fooddata',(req,res)=>{
    try {
        //console.log(global.fcitems);
        res.send([global.fitems,global.fcitems]);
        
    } catch (error) {
        console.log(error);
        res.send('server error');;
    }
})
module.exports=router;