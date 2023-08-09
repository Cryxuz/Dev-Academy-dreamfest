import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  // TODO: Replace this with all of the locations in the database

  const locations = await db.getAllLocations()
  const viewData = { locations }

  res.render('showLocations', viewData)
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData
  const locations = await db.getLocationById(id)
  const viewData = { ...locations }
  console.log(locations.name)
  res.render('editLocation', viewData)
})

// ask this to a facilitator
// POST /locations/edit
router.post('/edit', async (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body
  const { id, name, description } = req.body
  await db.updateLocation({ id, name, description })

  // TODO: Update the location in the database based on its id
  console.log(req.body.name)
  res.redirect('/locations')
})

export default router
