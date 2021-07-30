const { User } = require("../models");
const { Auth } = require("../utils/auth");

const resolvers = {

    Query: {
        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },
    },

    Mutation: {
        login: async(parent, { email, password }) => {
           //find user by email
           // validate for isCorrectPassword by passing in the password from front end
            //  signToken and then return
            // 
            return signToken({ email, password, _id });

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