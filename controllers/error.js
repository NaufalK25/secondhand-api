module.exports = {
    badRequest: (err, req, res) => {
        res.status(400).json({
            success: false,
            message: 'Validation error',
            data: err
        });
    },
    unAuthorized: (req, res) => {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
            data: null
        });
    },
    forbidden: (req, res) => {
        res.status(403).json({
            success: false,
            message: 'Forbidden',
            data: null
        });
    },
    notFound: (req, res, msg = '') => {
        res.status(404).json({
            success: false,
            message: msg ? msg : `Endpoint ${req.path} not found`,
            data: null
        });
    },
    methodNotAllowed: (req, res) => {
        res.status(405).json({
            success: false,
            message: `Method ${req.method} not allowed at endpoint ${req.path}`,
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
