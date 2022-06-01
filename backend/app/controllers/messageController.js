const moment = require("moment");
const db = require("../models");

module.exports = {
    sendMessage: function (options) {
        if (options?.text?.length > 0) {
            let timestamp = moment();
            Object.assign(options, { timestamp: timestamp });
            db.Message.create(options)
            return timestamp;
        }
        return {};
    },

    getUnread: function (options) {
        db.Message.findAll({
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

    getMessages: function (options) {
        db.Message.findAll({
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