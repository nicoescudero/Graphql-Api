const {GraphQLList,GraphQLID}=require('graphql');
const {userType,postType,commentType}=require('./types');
const {User,Post,Comment}= require('../models');

//USERS

const allUsers={
    type:GraphQLList(userType),
    description:"Get all users",
    resolve:async(_,args)=>{
        const users= await User.find();
        return users;
    }
}

//POSTS

const getAllPosts={
    type:GraphQLList(postType),
    description:"Get all posts",
    resolve:async(_,args)=>{
        return await Post.find();
    }
};

const getPostsByUserId={
    type:GraphQLList(postType),
    description:"Get posts by user id",
    args:{
        userID:{type:GraphQLID},
    },
    resolve:async(_,{userID})=>{
        return await Post.find({userID});
    }
}

//COMMENTS

const allComments={
    type:GraphQLList(commentType),
    description:'All Comments',
    resolve:async()=>{
        return await Comment.find();
    }
}

const commentByID={
    type:commentType,
    description:'Comment by ID',
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,{id})=>{
        return await Comment.findById(id);
    }
}

const allCommentsOfAPost={
    type:GraphQLList(commentType),
    description:'List of comments of a post',
    args:{
        postID:{type:GraphQLID}
    },
    resolve:async(_,{postID})=>{
        return await Comment.find({postID});
    }
}

const allCommentsOfAUser={
    type:GraphQLList(commentType),
    description:'List of comments of a user',
    args:{
        userID:{type:GraphQLID}
    },
    resolve:async(_,{userID})=>{
        return await Comment.find({userID});
    }
}

module.exports= {allUsers,getAllPosts,getPostsByUserId,allComments,commentByID,allCommentsOfAPost,allCommentsOfAUser};