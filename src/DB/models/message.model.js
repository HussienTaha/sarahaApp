import mongoose from "mongoose";
const messageschema=new mongoose.Schema({  
    content:{
        type:String,
        required:true,
        minlength:1,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId  ,  
        ref:"User",
        required :true
    },

    
 },{timestamps:true});
 const MessageModel= mongoose.model.Message||mongoose.model('Message',messageschema);
 export default MessageModel;