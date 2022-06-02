const user = require('../controllers/authController');

module.exports = async function (router) {
    // signup route
    router.route('/signup').post(async (req, res) => {
        if (user.isNewUser(req.body) != null)
            return res.status(400).send({ error: 'Usuário já existe!' })
        let out = await user.signup(req.body)
        return res.json(out)
    });

    // login route
    router.route('/login').post(async (req, res) => {
        const signedUser = await user.isNewUser(req.body)
        if (signedUser == null)
            return res.status(400).send({ error: 'User not found!' })
        let validPassword = await user.login(signedUser, req.body)
        if (validPassword) {
            res.status(200).json(validPassword);
        } else {
            res.status(401).json({ error: "Conta não encontrada ou senha incorreta!" });
        }
    });
}