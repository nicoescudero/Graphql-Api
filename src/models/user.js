const {Schema,model}=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    postsID:[
        {
            type: Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},{timestamps:true})

userSchema.statics.encryptPassword=async function(password){
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    return hash;
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}


module.exports=model('User',userSchema);