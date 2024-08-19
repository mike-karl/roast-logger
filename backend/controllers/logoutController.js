const User = require('../models/user')

 const handleLogout = async (req, res) => {
    // delete that access token on client

    const cookies = req.cookies
   
    if (!cookies?.jwt) return res.sendStatus(204) // no content
    const refreshToken = cookies.jwt

    // cheeck if the refresh token is in db
    const foundUser = await User.findOne({ refreshToken }).exec()
    console.log('I ran!')
    if (!foundUser) {
        console.log(cookies)
        res.clearCookie('jwt', { httpOnly: true , sameSite: 'None', secure: true})
        
        return res.sendStatus(204)
        
    }

    // delete the refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true , sameSite: 'None', secure: true })
    res.sendStatus(204)
 }

 module.exports = { handleLogout }