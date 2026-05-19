function catchAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(req, res, next)
            .catch(next)
    }
}


module.exports = catchAsync;