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
            return Auth({ email, password });

        },

        addUser: async (parent, { username, email, password }) => {
            return User.create({ username, email, password })
        },

        saveBook: async (parent, { userId, authors, description, bookId, image, link, title }) => {
            return User.findOneAndUpdate (
                {_id: userId},
                { 
                    $addToSet: { savedBooks: { authors, description, bookId, image, link, title }}
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