const zod = require('zod');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Zod Validate Failed",
                errors: result.error.flatten().fieldErrors,
            });
        }
        req.validated = result.data;
        next();
    };
};

module.exports = { validateRequest };