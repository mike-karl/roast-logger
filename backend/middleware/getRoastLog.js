const RoastLog = require('../models/roastLog')

const getRoastLog = async (req, res, next) => {
    let roastLog
    try {
      roastLog = await RoastLog.findById(req.params.id)
      if (roastLog == null) {
        return res.status(404).json({ message: 'cannot find roast log' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.roastLog = roastLog
    next()
  }

  module.exports = getRoastLog