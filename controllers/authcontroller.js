const { register, login } = require('../services/authservice');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await register(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
