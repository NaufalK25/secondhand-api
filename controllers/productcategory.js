const { validationResult } = require('express-validator');
const { ProductCategory } = require('../models');
const { badRequest, notFound } = require('./error');

module.exports = {
    findAll: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return badRequest(errors.array(), req, res);
        const category = await ProductCategory.findAll();
        if (!category) return notFound(req, res);

        res.status(200).json({
            success: true,
            message: 'Category successful',
            data: category
        });
    }
};
