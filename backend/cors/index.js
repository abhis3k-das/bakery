const allowedLinks = ["http://localhost:3000"]
const cors = require('cors')({
    optionSuccessStatus:true,
    credentials:true,
    origin:(origin,callback)=>{
        if(allowedLinks.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error("Link is not present in allowedLinks"))
        }
    }
});

module.exports = cors