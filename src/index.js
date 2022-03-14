const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const morgan=require('morgan');
const schema=require('./graphql/schema');
const auth=require('./middlewares/auth');
const {User}= require('./models');
const generateToken=require('./util/token');

require('dotenv').config();
require('./db/connections');

const app=express();
app.set('port',process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(morgan('dev'));

app.get('/',(req,res)=>res.send('Holaaa'))

app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user)return res.send('User not found');
    else{
        if(await user.comparePassword(password))
        {
            const token=await generateToken({id:user._id});
            return res.json(token);
        }
        else return res.send('Invalid password');
    }
});

app.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    const account=await User.findOne({email});
    if(account)throw new Error('There is an account with this email address');
    const newUser=new User({username,email,password:await User.encryptPassword(password)});
    await newUser.save();
    return res.send(newUser);
});

app.use(auth);

var root={
    verifiedUser: function(args,request){
        return request.verifiedUser;
    }
}

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:root,
    graphiql:true,
}));

app.listen(app.get('port'), ()=>console.log('listening on port: '+app.get('port')));
