const moment = require("moment");
const db = require("../models");

module.exports = {
    sendMessage: async function (options) {
        if (options?.text?.length > 0) {
            let timestamp = moment();
            Object.assign(options, { wasRead: false, timestamp: timestamp });
            await db.Message.create(options)
            return timestamp;
        }
        return {};
    },

    getUnread: async function (options) {
        return await db.Message.findAll({
            where: {
                [Op.and]: [{
                    receiverEmail: options.receiverEmail,
                    wasRead: false
                }]
            },
            group: [senderEmail],
            order: [['timestamp', 'DESC']]
        })
    },

    getMessages: async function (options) {
        return await db.Message.findAll({
            where: {
                [Op.and]: [{
                    receiverEmail: options.receiverEmail,
                    senderEmail: options.senderEmail
                }]
            },
            order: [['timestamp', 'DESC']]
        })
    }
}