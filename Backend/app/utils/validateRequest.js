const AppError = require('../utils/AppError');

const requireFields = (fields, reqBody) => {
    const missingFields = [];

    fields.forEach(field => {
        if (!reqBody[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        throw new AppError(`Fields are missing : ${missingFields.join(', ')}`, 400)
    }
}
module.exports = requireFields;