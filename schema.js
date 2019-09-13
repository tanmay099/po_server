var { buildSchema } = require('graphql')

var schema = buildSchema(`
    type Query {
        posts: [Post]
    }
    type Post{
        id: Int
        title: String
        body: String
        imgUrl: String
        date: String
    }
    
`)

module.exports = schema;