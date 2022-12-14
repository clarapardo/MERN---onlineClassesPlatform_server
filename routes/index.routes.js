const express = require('express')
const router = express.Router()

const Class = require('./../models/Class.model')


// Create a class
router.post("/addClass", (req, res) => {

  const { videoLink, videoCover, name, style, objective, intensity, level, duration } = req.body

  // - Add 'All' option for filtering
  const stylesArray = [style, "All"]
  const objectiveArray = [...objective, "All"]
  const intensityArray = [intensity, "All"]
  const levelArray = [level, "All"]

  Class
    .create({ videoLink, videoCover, name, style: stylesArray, objective: objectiveArray, intensity: intensityArray, level: levelArray, duration })
    .then((createdClass) => res.status(200).json(createdClass))
    .catch(err => res.status(500).json(err))
})


// Filter options
router.post("/filter", (req, res, next) => {

  let { style, objective, intensity, level, duration } = req.body

  // - If empty, give value 'All'
  if (style === '') style = 'All'
  if (objective.length === 0) objective = ['All']
  if (intensity === '') intensity = 'All'
  if (level === '') level = 'All'
  if (duration === '') duration = [5, 80]

  Class
    .find(
      { style: style, intensity: intensity, objective: { $in: objective }, level: level, duration: { $gte: duration[0], $lte: duration[1] } },
      { videoLink: 0, __v: 0, updatedAt: 0 })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err))
})



module.exports = router
