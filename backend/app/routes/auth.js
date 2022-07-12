const user = require('../controllers/authController');
const db = require('../models');

module.exports = async function (router) {
    // signup route
    router.route('/signup').post(async (req, res) => {
        if (await user.isNewUser(req.body) != null)
            return res.status(400).send({ error: 'Usuário já existe!' })
        let out = await user.signup(req.body)
        return res.json(out)
    });

    // login route
    router.route('/login').post(async (req, res) => {
        const signedUser = await user.isNewUser(req.body)
        if (signedUser == null)
            return res.status(400).send({ error: 'Conta não encontrada ou senha incorreta!' })
        let validPassword = await user.login(signedUser, req.body)
        if (validPassword) {
            res.status(200).json(await db.User.findOne({ where: { email: req.body.email } }));
        } else {
            res.status(401).json({ error: "Conta não encontrada ou senha incorreta!" });
        }
    });

    router.route('/changeName').post(async (req, res) => {
        let out = await user.changeName(req.body)
        return res.json(out)
    });

    router.route('/getAll').post(async (req, res) => {
        let out = await user.getAll()
        return res.json(out)
    })
}