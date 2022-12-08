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
router.get("/filter", (req, res, next) => {

  // - If empty, give value 'All'
  const {
    style = "All",
    objective = "All",
    intensity = "All",
    level = "All",
    duration = [5, 80]
  } = req.body

  Class
    .find({ style: style, intensity: intensity, objective: objective, level: level, duration: { $lte: duration[1], $gte: duration[0] } })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err))
})



module.exports = router
