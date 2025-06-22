import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:false
    },
    fileUrl: {
        type: String,
        required: false
    },
    fileType: {
        type: String,
        required: false
    }
},{timestamps:true});
export const Message = mongoose.model("Message", messageModel);