import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

////////////////////////////////////////////////////////////////////////////////////////////////

//////// STEP 05 - Call addNewEvent() function into the route ////

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    //
    // TODO: call your new db.addNewEvent function below and use the returned ID
    const id = await db.addNewEvent({
      name,
      description,
      time,
      locationId,
      day,
    })
    //
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////

//////// STEP 06 - Call deleteEvent(id) function into the route ////
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // TODO: Below is DELETE the event function with this matching ID

    const delResult = await db.deleteEvent(id)
    //
    if (delResult) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    next(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////

///// STEP 07 - Use of getEventId for backend test ////

// router.get('/:id', async (req, res, next) => {
//   try {
//     const id = Number(req.params.id)
//     // TODO: Replace event below with the event from the database using its id
//     // NOTE: It should have the same shape as this one
//     const event = {
//       id: id,
//       locationId: 1,
//       day: 'friday',
//       time: '2pm - 3pm',
//       name: 'Slushie Apocalypse I',
//       description:
//         'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
//     }
//     // TODO: if there's no event with that id, respond with a 404 instead

//     res.json(event)
//   } catch (e) {
//     next(e)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    //event from the database using its id
    const event = await db.getEventById(id)

    //if there's no event with that id, respond with a 404 instead
    if (!event) {
      return res.status(404).json({ error: 'Sorry, Event does not exsist' })
    }

    res.json(event)
  } catch (e) {
    next(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////

// router.patch('/:id', async (req, res, next) => {
//   try {
//     const { name, description, time } = req.body
//     const id = Number(req.body.id)
//     const day = validateDay(req.body.day)
//     const locationId = Number(req.body.locationId)

// TODO: UPDATE the event in the db with the matching ID using these details,
// if no event has a matching id, respond with a 404 instead
//     res.sendStatus(204)
//   } catch (e) {
//     next(e)
//   }
// })
