const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    isNewUser: async function (options) {
        return await db.User.findOne({
            where: {
                email: options.email
            }
        })
    },

    signup: async function (user) {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt)
        return await db.User.create(user);
    },

    login: async function (signedUser, requestedUser) {
        return await bcrypt.compare(requestedUser.password, signedUser.password);
    },

    changeName: async function (user) {
        return await db.User.update(user, { where: { email: user.email } });
    },

    getAll: async function () {
        return await db.User.findAll()
    }
}