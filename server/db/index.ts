import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

//////// ---- STEP 01 - Show all locations ---- ////
// TODO: replace this with your knex query//
export async function getAllLocations(): Promise<LocationData[] | undefined> {
  const locations = await connection('locations') // [connect 'locations' table]
    .select('*') // Select all data in locations table //
  //.where () Not required as we need all data in locations table//

  return locations as LocationData[]
}

//
//
//
//////// ---- STEP 02 - Show events for a day ---- ////
export async function getEventsByDay(
  day: string,
): Promise<EventWithLocation[] | undefined> {
  const events = await connection('events') // [connect 'event' table]
    .join('locations', 'events.location_id', 'locations.id')
    .select(
      'events.id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName', // selecting location. name from location Table //
    )
    .where('events.day', day)

  return events as EventWithLocation[]
}

//
//
//
//////// ---- STEP 03 - Show the edit form ---- ////
export async function getLocationById(
  id: number,
): Promise<Location | undefined> {
  const locations = await connection('locations') // [connect 'location' table]
    // .join() We do not join any other tables
    .select('id', 'name', 'description')
    //since there NO .join() here, DO NOT require to use .select('location.id', 'location.name', 'location.description') for above
    .where('locations.id', id)
    .first()

  return locations as Location
}
//
//
//
//////// ---- STEP 04 - Submit the form ---- ////
//
//NOTE - There is NO updatedLocation (object) parameter in this project. So use id,name,description instead //
//
export async function updateLocation(
  id: number,
  name: string,
  description: string,
) {
  const locations = await connection('locations') // [connect 'location' table]
    // .join() We do not join any other tables
    //.select() We do not use .select as we update details form the form //
    .where('locations.id', id)
    //.first() not required
    .update({ name, description })// require {} insiide () as they are objects with key value pairs

  console.log(locations)
}
//
//
//
//////// ---- STEP 05 - Add a new event ---- ////
export async function addNewEvent(event:EventData) // Use EventData Interface as it match "Add New Event Form" in server/browser 
 {



  
}
//
//
//
//////// ---- STEP 06 - Delete events ---- ////
