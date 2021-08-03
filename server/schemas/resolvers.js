const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks")
            }
        },
    },

    Mutation: {
        loginUser: async(parent, { email, password }) => {
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
            const user = User.create({ username, email, password })
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { authors, description, bookId, image, link, title}, context) => {
            if(context.user) {
                
                const savedBookArray = await User.findOneAndUpdate (
                    { _id: context.user._id},
                    { 
                        $addToSet: { savedBooks: { authors, description, bookId, image, link, title } }
                    },
                    { new: true, runValidators: true }
                );

                return savedBookArray;
            }

            throw new AuthenticationError("You need to be logged in to save a book");
        },

        removeBook: async (parent, { bookId }, context) => {

            if(context.user) {
               const removedBook = await User.findOneAndUpdate (
                    { _id: context.user._id },
                    { $pull: { savedBooks: { _id: bookId } } },
                    { new: true }
                );

                return removedBook;
            }

            throw new AuthenticationError("Could not remove book for this user");
        },

    },

};

module.exports = resolvers;