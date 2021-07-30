const { gql } = require('apollo-server-express');

const typeDerfs= gql`
    
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    }

    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String

    }
    
    type Query {
        user(userId: ID!): User
        books: [Book]!
    }

    type Mutation {
        login( email: String!, password: String!): User
        addUser( username: String!, email: String!, password:String! ): User
        saveBook(userId: ID!, authors: String!, description: String!, bookId: String!, image: String!, link: String!, title: String! ): User
        removeBook( bookId: ID!): User
    }



`;



module.exports = typeDefs;