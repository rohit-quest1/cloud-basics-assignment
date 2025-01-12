const Joi = require('joi');

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).regex(/^[a-zA-Z0-9_-]+$/).required(),  // Added regex for valid characters
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next(); // Proceed if validation passes
};

const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().optional(),
        price: Joi.number().positive().required(),  // Ensure price is a positive number
        stock: Joi.number().integer().min(0).required(),  // Ensure stock is an integer and >= 0
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const validateOrder = (req, res, next) => {
    console.log("inside validate")
    const schema = Joi.object({
        productId: Joi.number().positive().required(),  // Ensure productId is a positive number
        quantity: Joi.number().integer().min(1).required(),  // Ensure quantity is a positive integer
    });

    const { error } = schema.validate(req.body);
    console.log(error)
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = { validateUser, validateOrder, validateProduct };
