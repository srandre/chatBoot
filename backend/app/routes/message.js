const messages = require('../controllers/messageController');

module.exports = function (router) {
    router.route('/sendMessage').post((req, res) => {
        let out = messages.sendMessage(req.body);
        return res.json(out);
    });

    router.route('/getUnread').post((req, res) => {
        let out = messages.getUnread(req.body);
        return res.json(out);
    });

    router.route('/getMessages').post((req, res) => {
        let out = messages.getMessages(req.body);
        return res.json(out);
    });
}