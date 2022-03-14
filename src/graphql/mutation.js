const {GraphQLID,GraphQLString}= require('graphql');
const {postType,commentType}=require('./types');
const {User,Post,Comment}= require('../models');

//POSTS

const createPost={
    type: postType,
    description:"Create a new publisher",
    args:{
        userID:{type: GraphQLID},
        photo:{type: GraphQLString},
        description:{type: GraphQLString}
    },
    resolve:async(_,{userID,photo,description})=>{
        const newPost=new Post({userID,photo,description});
        const user=await User.findById(userID);
        await newPost.save();
        await user.postsID.push(newPost);
        user.save();
        return newPost;
    }
}


const updatePost={
    type: postType,
    description:"update a post",
    args:{
        id:{type: GraphQLID},
        photo:{type: GraphQLString},
        description:{type: GraphQLString}
    },
    resolve:async(_,{id,photo,description})=>{
        return await Post.findByIdAndUpdate(id,{photo,description},{new:true});
    }
}

const deletePost={
    type:GraphQLString,
    description:"delete a post by id",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,{id})=>{
        const postDeleted=await Post.findById(id);
        if(postDeleted){
            const userID=postDeleted.userID;
            const user=await User.findById(userID);
            const index=user.postsID.indexOf(id);
            await user.postsID.splice(index,1);
            await user.save();
            await Comment.deleteMany({postID:id});
            postDeleted.remove();
            return 'Post deleted';
        }
        else return 'Post not found';
    }
}

//COMMENTS
const createComment = {
    type: commentType,
    description: 'Create a comment in a post',
    args:{
        comment:{type:GraphQLString},
        postID:{type: GraphQLID},
        userID:{type: GraphQLID}
    },
    resolve:async(_,{comment,postID,userID})=>{
        const comentario=new Comment({comment,postID,userID});
        const post=await Post.findById(postID);
        await comentario.save();
        await post.comments.push(comentario._id);
        await post.save();
        return comentario;
    }
};

const deleteComment={
    type: GraphQLString,
    description:'Delete a comment',
    args:{
        id:{type: GraphQLID}
    },
    resolve:async(_,{id})=>{
        let commentDeleted=await Comment.findById(id);
        if(commentDeleted){
            const post=await Post.findById(commentDeleted.postID);
            console.log(post);
            const index=post.comments.indexOf(id);
            await post.comments.splice(index, 1);
            await post.save();
            commentDeleted.remove();
            return 'Comment deleted';
        }
        else return 'Comment not found';
    }
}



module.exports = {createPost,updatePost,deletePost,createComment,deleteComment};