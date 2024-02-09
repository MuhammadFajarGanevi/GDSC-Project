function loginValidator(request, response, next) {
    const data = [
        request.body.email,
        request.body.password
    ]

    if (data[0] && data[1]) {
        next()
    }else {
        response.status(400).json({
            "status": false,
            "message": "required email & password"
        })
    }
}

module.exports = {loginValidator}