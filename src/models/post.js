const {model,Schema}=require('mongoose');

const postSchema=new Schema({
    photo:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        false:true
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{timestamps:true});


postSchema.methods.addComment = function(comment){
    this.comments.push(comment);
}

postSchema.methods.deleteComment = async function(id){
    const index=this.comments.indexOf(id);
    await comments.splice(index, 1);
    return ;
}

module.exports= model('Post',postSchema);