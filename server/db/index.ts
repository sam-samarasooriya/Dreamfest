import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 01 - Show all locations ---- ////
// TODO: replace this with your knex query//
export async function getAllLocations(): Promise<LocationData[]> {
  const locations = await connection('locations') // [connect 'locations' table]
    .select('*') // Select all data in locations table //
  //.where () Not required as we need all data in locations table//

  return locations as LocationData[]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 02 - Show events for a day ---- ////
export async function getEventsByDay(
  day: string,
): Promise<EventWithLocation[]> {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 03 - Show the edit form ---- ////
export async function getLocationById(id: number): Promise<Location> {
  const locations = await connection('locations') // [connect 'location' table]
    // .join() We do not join any other tables
    .select('id', 'name', 'description')
    //since there NO .join() here, DO NOT require to use .select('location.id', 'location.name', 'location.description') for above
    .where('locations.id', id)
    .first()

  return locations as Location
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    .update({ name, description }) // require {} insiide () as they are objects with key value pairs

  //NOTE - .update() method from Knex does not return the updated row, Hence can not add return statemrent(return locations)
  //NOTE - Hence, use console.log(locations) below to Avoid red line in 72.
  console.log(locations)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 05 - Add a new event ---- ////
export async function addNewEvent(event: EventData) {
  // Use EventData Interface as it match "Add New Event Form" in server/browser
  const newData = await connection('events').insert({
    location_id: event.locationId, // Check ReadMe [location_Id & locationId]
    day: event.day,
    time: event.time,
    name: event.name,
    description: event.description,
  })
  console.log(newData)
  return newData
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 06 - Delete events ---- ////
export async function deleteEvent(id: number) {
  // ReadMe file says to take id as a parameter //
  const deleteData = await connection('events')
    .where('events.id', id)
    .delete('*') // This will delete entire data, "*" represent all
  console.log(deleteData)
  return deleteData
}

// export async function deleteEvent(id: number) {
//   try {
//     const result = await connection('events').where('id', id).del()
//     if (result === 0) {
//       throw new Error('No event found with the given ID')
//     }
//   } catch (error) {
//     console.error('Error deleting event:', error)
//     throw error
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// ---- STEP 07 - Create getEventId for backend test ---- ////
export const getEventById = async (id: number) => {
  const response = await connection('events').where('id', id).first()
  return response
}
