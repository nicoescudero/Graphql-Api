const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList}=require('graphql');
const {User,Post,Comment}=require('../models');

const userType=new GraphQLObjectType({
    name:'UserType',
    fields:()=>({
        _id:{type: GraphQLID},
        username:{type: GraphQLString},
        email:{type: GraphQLString},
        posts:{
            type:GraphQLList(postType),
            resolve:async(parent)=>{
                return await Post.find({userID:parent._id});
            }
        }
    })
});

const postType=new GraphQLObjectType({
    name:'PostType',
    fields:()=>({
        _id:{type: GraphQLID},
        description:{type: GraphQLString},
        photo:{type: GraphQLString},
        user: {
            type: userType,
            resolve:async(parent)=>{
                return await User.findById(parent.userID);
            }
        },
        comments:{
            type:GraphQLList(commentType),
            resolve:async(parent)=>{
                return await Comment.find({postID:parent._id});
            }
        },
        createdAt:{type: GraphQLString},
        updatedAt:{type: GraphQLString},
    })
})

const commentType=new GraphQLObjectType({
    name:'CommentType',
    fields:{
        _id:{type: GraphQLID},
        comment:{type: GraphQLString},
        post:{
            type: postType,
            resolve:async(parent)=>{
                return await Post.findById(parent.postID);
            }
        },
        user:{
            type: userType,
            resolve:async(parent)=>{
                return await User.findById(parent.userID);
            }
        }
    }
});


module.exports={userType,postType,commentType};