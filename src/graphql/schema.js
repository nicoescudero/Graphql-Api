const {GraphQLSchema,GraphQLObjectType}=require('graphql');
const {allUsers,allPosts,getPostsByUserId,myPosts,allComments,commentByID,allCommentsOfAPost,allCommentsByAUser,myComments}=require('./queries');
const {createPost,updatePost,deletePost,createComment,deleteComment}=require('./mutation');

const QueryType=new GraphQLObjectType({
    name:"QueryTypes",
    description:"The root query type",
    fields:{
        allUsers,
        allPosts,
        getPostsByUserId,
        myPosts,
        allComments,
        commentByID,
        allCommentsOfAPost,
        allCommentsByAUser,
        myComments
    }
}); 

const MutationType=new GraphQLObjectType({
    name:"MutationType",
    description:"The root mutation type",
    fields:{
        createPost,
        updatePost,
        deletePost,
        createComment,
        deleteComment
    }
});

module.exports=new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
});