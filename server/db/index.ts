import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const db = knex.default(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database

  // returning locations from database table called locations.
  return db('locations')
}

// TODO: write some more database functions
export async function getEventsByDay(day: string) {
  const result = await db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .select(
      'events.name as eventName',
      'events.description as description',
      'locations.name as locationName',
      'events.time as time'
    )
    .where('events.day', day)
  return result
}

export async function getLocationById(id: number) {
  const result = await db('locations')
    .select(
      'id',
      'locations.name as name',
      'locations.description as description'
    )
    .where('locations.id', id)
    .first()
  return result
}

export async function updateLocation(location: any) {
  const result = await db('locations')
    .returning(['id', 'name', 'description'])
    .update({ ...location })
    .where('id', location.id)
  return result
}
// :Promise<void>
export async function addNewEvent(event: EventData) {
  const data = {
    day: event.day,
    location_id: event.locationId,
    time: event.time,
    name: event.name,
    description: event.description,
  }
  const result = await db('events').insert(data)
  return result
}
