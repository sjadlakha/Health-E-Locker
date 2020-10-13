const multer=require('multer')
const upload=multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx)/)){
            return cb(new Error('Should be Image'))
        }
        cb(undefined,true)
    }
})
module.exports=upload