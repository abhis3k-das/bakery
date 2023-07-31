const allowedLinks = ["http://localhost:3000","https://glistening-klepon-5eae84.netlify.app","https://bakery-315a.onrender.com"]
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