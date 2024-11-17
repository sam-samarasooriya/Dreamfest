///////////////// ASSESSMENT STEP -  SERVER SIDE TESTING //////////////////////////

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import request from 'supertest'

import { connection } from '../db/index.ts'
import server from '../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

/////////////////////////////// WRITE THE TEST HERE ///////////////////////////////////

/// ARANGE -> ACT -> ASSERT ///

describe('Deleting an Event', () => {
  it('can be deleted', async () => {
    // TODO: write server integration test for event delete
    const res = await request(server).get('/api/v1/events/2')
    expect(res.status).toBe(200) // Verify the event with id(Number) exist

    const res2 = await request(server).delete('/api/v1/events/2')
    expect(res2.status).toBe(204) // Deletion successful

    const res3 = await request(server).get('/api/v1/events/2')
    expect(res3.status).toBe(404) // Error, event id(number) not exist
  })
})

//NOTES//
// Above test fail when run npm run test//
// But have usesd similer setup as movies.test.ts in movie-facts repo,and it works there//
