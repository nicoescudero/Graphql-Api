const {GraphQLSchema,GraphQLObjectType}=require('graphql');
const {allUsers,getAllPosts,getPostsByUserId,allComments,commentByID,allCommentsOfAPost,allCommentsOfAUser}=require('./queries');
const {createPost,updatePost,deletePost,createComment,deleteComment}=require('./mutation');

const QueryType=new GraphQLObjectType({
    name:"QueryTypes",
    description:"The root query type",
    fields:{
        allUsers,
        getAllPosts,
        getPostsByUserId,
        allComments,
        commentByID,
        allCommentsOfAPost,
        allCommentsOfAUser
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