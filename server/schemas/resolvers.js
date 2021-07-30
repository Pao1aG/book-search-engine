const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {

    Query: {
        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },
    },

    Mutation: {
        login: async(parent, { email, password }) => {
           //find user by email
           const user = await User.findOne({ email });

           if(!user) {
               throw new AuthenticationError("No user found with this email");
           }
           
           // validate for isCorrectPassword by passing in the password from front end
           const correctPw = await user.isCorrectPassword(password);

           if(!correctPw) {
               throw new AuthenticationError("Incorrect password");
           }
           //  signToken and then return
            
           const token = signToken(user);
           return { token, user };

        },

        addUser: async (parent, { username, email, password }) => {
            return User.create({ username, email, password })
        },

        saveBook: async (parent, { userId, authors, description, title, bookId, image, link }) => {
            return User.findOneAndUpdate (
                {_id: userId},
                { 
                    $addToSet: { savedBooks: { authors, description, title, bookId, image, link }}
                },
                {
                    new: true,
                    runValidators: true
                }
            )
        },

        removeBook: async (parent, { bookId }) => {
            return User.findOneAndUpdate (
                {_id: userId },
                { $pull: { savedBooks: { _id: bookId } } },
                { new: true }
            );
        },

    },

};

module.exports = resolvers;