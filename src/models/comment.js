const {Schema,model}=require('mongoose');

const commentSchema=new Schema({
    comment:{
        type: String,
        required:true
    },
    postID:{
        type: Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=model('Comment',commentSchema);