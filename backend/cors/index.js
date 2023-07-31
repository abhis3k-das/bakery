<<<<<<< HEAD
const allowedLinks = ["http://localhost:3000","https://glistening-klepon-5eae84.netlify.app","https://bakery-315a.onrender.com"]
=======
const allowedLinks = ["http://localhost:3000","https://glistening-klepon-5eae84.netlify.app/home"]
>>>>>>> 8bf84367e42f17ffd09678a087a8b06e201184a2
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