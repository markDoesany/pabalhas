const express = require('express')
const {
        createWorkout,
        getWorkouts,
        getWorkout,
        deleteWorkout,
        updateWorkout
      } = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//requrie auth for all workouts
router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET single workout
router.get('/:id',getWorkout)

//POST a workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router