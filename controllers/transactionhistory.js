const {  notFound } = require('../controllers/error');
const { User, Transaction, TransactionHistory } = require('../models');

module.exports = {
    findByUser: async (req, res) => {
        let transaction;
        if (req.user.roleId == 2) {
            //kalo dia seller dia bakal nampilin transaksi barang seller
            transaction = await TransactionHistory.findAll({
                include: [{ model: Transaction }] }, { include: { model: User}});
        } else {
            //kalo dia buyer dia bakal nampilin transaksi yang dia ajukan
            transaction = await TransactionHistory.findAll(
                { include: { model: User}},
                { where: { userId: req.user.id } }
            );
        }

        if (transaction.length === 0)
            return notFound(req, res, 'Transction not found');

        res.status(200).json({
            success: true,
            message: 'Transction found',
            data: transaction
        });
    }
};
