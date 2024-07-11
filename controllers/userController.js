const { User } = require('../models');
const { Product } = require('../models');


exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({
            username,
            email,
            encryptedPassword: password 
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const { uuid } = req.params;
        const user = await User.findOne({ where: { uuid } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { username, email, password } = req.body;
        const user = await User.findOne({ where: { uuid } });
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.encryptedPassword = password || user.encryptedPassword; // Asegúrate de cifrar la contraseña antes de almacenarla
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const user = await User.findOne({ where: { uuid } });
        if (user) {
            await user.destroy();
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserProducts = async (req, res) => {
    try {
        const { uuid } = req.params;
        const user = await User.findOne({
            where: { uuid },
            include: Product
        });
        if (user) {
            res.status(200).json(user.Products);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
