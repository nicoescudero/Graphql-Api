const {GraphQLID,GraphQLString}= require('graphql');
const {postType,commentType}=require('./types');
const {User,Post,Comment}= require('../models');

//POSTS

const createPost={
    type: postType,
    description:"Create a new publisher",
    args:{
        photo:{type: GraphQLString},
        description:{type: GraphQLString}
    },
    resolve:async(_,{photo,description},{verifiedUser})=>{
        const userID=verifiedUser.id;
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
        postID:{type: GraphQLID},
        photo:{type: GraphQLString},
        description:{type: GraphQLString}
    },
    resolve:async(_,{postID,photo,description},{verifiedUser})=>{
        const updatePost= await Post.findOneAndUpdate({_id:postID,userID:verifiedUser.id},{photo,description},{new:true});
        if(!updatePost)throw new Error('This post id does not belong to the user');
        else return updatePost;
    }
}

const deletePost={
    type:GraphQLString,
    description:"delete a post by id",
    args:{
        postID:{type:GraphQLID}
    },
    resolve:async(_,{postID},{verifiedUser})=>{
        try {
        const post=await Post.findById(postID);
        if(post.userID == verifiedUser.id){
            const user=await User.findById(verifiedUser.id);
            const index=user.postsID.indexOf(postID);
            await user.postsID.splice(index,1);
            await user.save();
            await Comment.deleteMany({postID});
            post.remove();
            return 'Post deleted';
        }
        else return 'This post id does not belong to the user'
        } catch (error) {
            return 'Post not found';
        }
    }
}

//COMMENTS
const createComment = {
    type: commentType,
    description: 'Create a comment in a post',
    args:{
        comment:{type:GraphQLString},
        postID:{type: GraphQLID},
    },
    resolve:async(_,{comment,postID},{verifiedUser})=>{
        const comentario=new Comment({comment,postID,userID:verifiedUser.id});
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
        commentID:{type: GraphQLID}
    },
    resolve:async(_,{commentID},{verifiedUser})=>{
            const commentDeleted=await Comment.findById(commentID);
            if(commentDeleted)
            if(commentDeleted.userID == verifiedUser.id){
                const post=await Post.findById(commentDeleted.postID);
                const index=post.comments.indexOf(commentID);
                await post.comments.splice(index, 1);
                await post.save();
                commentDeleted.remove();
                return 'Comment deleted';
            }else return 'This comment does not belong to this user'
            else return 'Comment not found';
    }
}



module.exports = {createPost,updatePost,deletePost,createComment,deleteComment};