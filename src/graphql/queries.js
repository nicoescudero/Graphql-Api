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

const allPosts={
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
        userID:{type:GraphQLID}
    },
    resolve:async(_,{userID})=>{
        return await Post.find({userID});
    }
}

const myPosts={
    type:GraphQLList(postType),
    description:"All posts by the authenticated user",
    resolve:async(_,args,{verifiedUser})=>{
        return await Post.find({userID:verifiedUser.id});
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
        commentID:{type:GraphQLID}
    },
    resolve:async(_,{commentID})=>{
        return await Comment.findById(commentID);
    }
}

const allCommentsOfAPost={
    type:GraphQLList(commentType),
    description:'List of comments to a post',
    args:{
        postID:{type:GraphQLID}
    },
    resolve:async(_,{postID})=>{
        return await Comment.find({postID});
    }
}

const allCommentsByAUser={
    type:GraphQLList(commentType),
    description:'List of comments from a user',
    args:{
        userID:{type:GraphQLID}
    },
    resolve:async(_,{userID})=>{
        return await Comment.find({userID});
    }
}

const myComments={
    type:GraphQLList(commentType),
    description:'All comments by the authenticated user',
    resolve:async(_,args,{verifiedUser})=>{
        return await Comment.find({userID:verifiedUser.id});
    }
}

module.exports= {allUsers,allPosts,getPostsByUserId,myPosts,allComments,commentByID,allCommentsOfAPost,allCommentsByAUser,myComments};