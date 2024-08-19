const express = require('express')
const router = express.Router()
const RoastLog = require('../models/roastLog')
const verifyJWT = require('../middleware/verifyJWT')
const getRoastLog = require('../middleware/getRoastLog')
const paginatedResults = require('../middleware/paginatedResults')

//Getting all
router.get('/', verifyJWT, paginatedResults(RoastLog), async (req, res) => {
    try {
        const roastLogs = await RoastLog.find()
        res.json(res.paginatedResults)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Getting one
router.get('/:id', verifyJWT, getRoastLog, (req, res) =>{
    res.json(res.roastLog)
})
// Creating one
router.post('/', verifyJWT, async (req, res) => {
  const roastLog = new RoastLog({
    bean: req.body.bean,
    roastDate: req.body.roastDate,
    description: req.body.description,
    targetRoastLevel: req.body.targetRoastLevel,
    phTemp: req.body.phTemp,
    phTime: req.body.phTime,
    roastProfile: { 
      tempOverTime: req.body.roastProfile.tempOverTime,
      roastLevel: req.body.roastProfile.roastLevel,
      startWeight: req.body.roastProfile.startWeight,
      endWeight: req.body.roastProfile.endWeight,
      firstCrack: req.body.roastProfile.firstCrack,
      rollingFirstCrack: req.body.roastProfile.rollingFirstCrack,
      secondCrack: req.body.roastProfile.secondCrack,
      totalRoastTime: req.body.roastProfile.totalRoastTime,
      color: req.body.roastProfile.color,
      roastImageUrl: req.body.roastProfile.roastImageUrl,
      roastNotes: req.body.roastProfile.roastNotes

    }
  })
  try {
    const newRoastLog = await roastLog.save()
    res.status(201).json(newRoastLog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//updating one
router.patch('/:id', verifyJWT, getRoastLog, async (req, res) =>{
  if (req.body.bean != null) {
    res.roastLog.bean = req.body.bean
  }
  if (req.body.description != null) {
    res.roastLog.description = req.body.description
  }
  if (req.body.targetRoastLevel != null) {
    res.roastLog.targetRoastLevel = req.body.targetRoastLevel
  }
  if (req.body.phTemp != null) {
    res.roastLog.phTemp = req.body.phTemp
  }
  if (req.body.phTime != null) {
    res.roastLog.phTime = req.body.phTime
  } 
  if (req.body.roastProfile.startWeight != null) {
    res.roastLog.roastProfile.startWeight = req.body.roastProfile.startWeight
  }
  if (req.body.roastProfile.endWeight != null) {
    res.roastLog.roastProfile.endWeight= req.body.roastProfile.endWeight
  }
  if (req.body.roastProfile.firstCrack != null) {
    res.roastLog.roastProfile.firstCrack= req.body.roastProfile.firstCrack
  }
  if (req.body.roastProfile.rollingFirstCrack != null) {
    res.roastLog.roastProfile.rollingFirstCrack= req.body.roastProfile.rollingFirstCrack
  }
  if (req.body.roastProfile.secondCrack != null) {
    res.roastLog.roastProfile.secondCrack= req.body.roastProfile.secondCrack
  }
  if (req.body.roastProfile.totalRoastTime != null) {
    res.roastLog.roastProfile.totalRoastTime= req.body.roastProfile.totalRoastTime
  }
  if (req.body.roastProfile.color != null) {
    res.roastLog.roastProfile.color= req.body.roastProfile.color
  }
  if (req.body.roastProfile.roastLevel != null) {
    res.roastLog.roastProfile.roastLevel= req.body.roastProfile.roastLevel
  }
  if (req.body.roastProfile.roastNotes != null) {
    res.roastLog.roastProfile.roastNotes = req.body.roastProfile.roastNotes
  }
  try {
    const updateRoastLog = await res.roastLog.save()
    res.json(updateRoastLog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//deleting one
router.delete('/:id', verifyJWT, getRoastLog, async (req, res) =>{
  try {
    await res.roastLog.remove()
    res.json({ message: 'Deleted Roast Log' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) 

module.exports = router