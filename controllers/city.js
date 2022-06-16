const { City } = require('../models');


module.exports = {
    getAll: async (req, res) => {
        const city = await City.findAll({
            attributes:["id","city"],
            order:[["id","ASC"]]
         });

        res.status(200).json({
            success: true,
            data: city
        });
    }
};


