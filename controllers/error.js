module.exports = {
    badRequest: (err, req, res) => {
        res.status(400).json({
            success: false,
            message: 'Kesalahan validasi',
            data: err
        });
    },
    unAuthorized: (req, res) => {
        res.status(401).json({
            success: false,
            message: 'Tidak memiliki token',
            data: null
        });
    },
    forbidden: (req, res, message = 'Dilarang') => {
        res.status(403).json({
            success: false,
            message,
            data: null
        });
    },
    notFound: (req, res, message = `Endpoint ${req.originalUrl} tidak ditemukan`) => {
        res.status(404).json({
            success: false,
            message,
            data: null
        });
    },
    notFoundDefault: (req, res) => {
        res.status(404).json({
            success: false,
            message: `Endpoint ${req.originalUrl} tidak ditemukan`,
            data: null
        });
    },
    methodNotAllowed: (req, res) => {
        res.status(405).json({
            success: false,
            message: `Metode ${req.method} tidak diizinkan di endpoint ${req.originalUrl}`,
            data: null
        });
    },
    internalServerError: (err, req, res) => {
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err,
            data: null
        });
    }
};
