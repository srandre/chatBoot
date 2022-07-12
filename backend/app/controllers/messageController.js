const moment = require("moment");
const db = require("../models");
const WebSocket = require('ws');
const piesocket = require('piesocket-nodejs')

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
        let result = [];
        const lastMessages = await db.Message.findAll({
            where: {
                [Op.or]: [{
                    receiverEmail: options.receiverEmail
                }, { senderEmail: options.receiverEmail }]
            }, include: [{
                association: 'sender'
            }, {
                association: 'receiver'
            }],
            order: [['timestamp', 'DESC']]
        })

        lastMessages.map(x => {
            let find = result.findIndex(y => (y.senderEmail == x.senderEmail && y.receiverEmail == x.receiverEmail) || (y.senderEmail == x.receiverEmail && y.receiverEmail == x.senderEmail))
            if (find == -1)
                result.push({
                    senderEmail: x.senderEmail,
                    receiverEmail: x.receiverEmail,
                    lastMessage: x,
                    unread: 0
                })
        })

        const unread = await db.Message.findAll({
            where: {
                receiverEmail: options.receiverEmail
            }, include: [{
                association: 'sender'
            }, {
                association: 'receiver'
            }],
            order: [['timestamp', 'DESC']]
        })

        unread.map(x => {
            let find = result.findIndex(y => (y.senderEmail == x.senderEmail && y.receiverEmail == x.receiverEmail) || (y.senderEmail == x.receiverEmail && y.receiverEmail == x.senderEmail))
            if (find == -1)
                result.push({
                    senderEmail: x.senderEmail,
                    receiverEmail: x.receiverEmail,
                    lastMessage: x,
                    unread: (!x.wasRead && x.senderEmail != options.receiverEmail) ? 1 : 0
                })
            else {
                if (!x.wasRead && x.senderEmail != options.receiverEmail)
                    result[find].unread++;
            }
        })

        return result;
    },

    markAsRead: async function (options) {
        return await db.Message.update({ wasRead: true }, {
            where: {
                receiverEmail: options.receiverEmail,
                senderEmail: options.senderEmail
            }
        })
    },

    getMessages: async function (options) {
        const result = await db.Message.findAll({
            where: {
                [Op.or]: [{
                    receiverEmail: options.receiverEmail,
                    senderEmail: options.senderEmail
                }, {
                    senderEmail: options.receiverEmail,
                    receiverEmail: options.senderEmail
                }]
            },
            include: [{
                association: 'sender'
            }, {
                association: 'receiver'
            }],
            order: [['timestamp', 'ASC']]
        })

        await this.markAsRead({ receiverEmail: options.receiverEmail, senderEmail: options.senderEmail })

        return result;
    }
}