const message = require('../controllers/messageController');

module.exports = async function (router) {
    router.route('/sendMessage').post(async (req, res) => {
        let out = await message.sendMessage(req.body);
        return res.json(out);
    });

    router.route('/getUnread').post(async (req, res) => {
        let out = await message.getUnread(req.body);
        return res.json(out);
    });

    router.route('/getMessages').post(async (req, res) => {
        let out = await message.getMessages(req.body);
        return res.json(out);
    });
}