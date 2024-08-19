const User = require('../models/user')
const jwt = require('jsonwebtoken')


const handleRefreshToken = async (req, res) => {
    // Get cookie from the request
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // Get refresh token from the cookie
    const refreshToken = cookies.jwt;
    // clear the cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true})

    // Get the user that has the refresh token
    const foundUser = await User.findOne({ refreshToken }).exec()
    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); // Forbidden
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ email: decoded.email }).exec()
                hackedUser.refreshToken = []
                const result = await hackedUser.save()
                console.log(result)
            }
        )
        return res.sendStatus(403) // Forbidden
    }
    
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)

    // evaluate jwt
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                console.log('expired refresh token')
                foundUser.refreshTOken = [...newRefreshTokenArray]
                const result = await foundUser.save()
                console.log(result)
            }
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403)

            // Referesh toke was still valid
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            )
            const newRefreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
            const result = await foundUser.save()

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
            res.json({ user: decoded.email, accessToken })
        }
    )
}

module.exports = { handleRefreshToken }