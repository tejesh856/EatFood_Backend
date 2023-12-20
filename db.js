const mongoose = require('mongoose');
const mongourl="mongodb+srv://tejesh:VijPad6972@cluster0.ycbrzpc.mongodb.net/EatFood?retryWrites=true&w=majority";

const mongodb=async ()=>{
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(async()=>{
            console.log('MongoDB connected successfully');
            const fetchdata=await mongoose.connection.db.collection('food-items');
            const fetchdatas=await mongoose.connection.db.collection('category-items');
            const fdatas=await fetchdata.find({}).toArray();
            const fcdatas=await fetchdatas.find({}).toArray();
            global.fitems=fdatas;
            global.fcitems=fcdatas;
            //console.log(global.fcitems);
        }).catch((err)=>{console.log(err)})
}
module.exports=mongodb;