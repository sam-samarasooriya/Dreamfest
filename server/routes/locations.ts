import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

////////////////////////////////////////////////////////////////////////////////////////////////

//// STEP 01 - Call getAllLocations() function into the route ////
// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the locations in the database

    // const locations = [
    //   {
    //     id: 1,
    //     name: 'TangleStage',
    //     description:
    //       'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
    //   },
    //   {
    //     id: 2,
    //     name: 'Yella Yurt',
    //     description:
    //       "It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here!",
    //   },
    // ]
    //
    //
    // ------ [Calling the getAllLocations() function here] -----
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    //
    next(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////

//// STEP 03 - Call getLocationById() function into the route ////
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    // TODO: Get the location based on its id and replace this viewData
    // const location = {
    //   id: id,
    //   name: 'TangleStage',
    //   description:
    //     'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
    //}
    const location = await db.getLocationById(Number(id)) // The id shows as type string, hence changing it to Number
    res.json({ location })
  } catch (e) {
    //
    next(e)
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////

//// STEP 04 - Call updateLocations() function into the route ////
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    // TODO: call db.updateLocation with these details
    await db.updateLocation(id, name, description)
    res.sendStatus(204)
  } catch (e) {
    //
    next(e)
  }
})

export default router

////////////////////////////////////////////////////////////////////////////////////////////////
