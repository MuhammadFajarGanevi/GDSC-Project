
function verifyJWTMiddleware(jwtUtil) {
    return function (request, response, next) {

        try {
            if (!request.headers.authorization) {
                response.status(401).json({
                    status : false,
                    message: "Unauthenticated",
                    data : null
                })
                return
            }

            const token = request.headers.authorization.split(" ")[1]

            request.user = jwtUtil.decode(token).data

            next()
        } catch(error) {
            response.status(500).json({
                status: false,
                message: error,
                data: null
            })
        }
    }
}

module.exports = {verifyJWTMiddleware}