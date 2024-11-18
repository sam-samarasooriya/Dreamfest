// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'

import { setupApp } from './setup.tsx'

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeEvent = {
  id: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Slushie Apocalypse I',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
  locationId: 1,
}

const fakeLocations = {
  locations: [
    {
      id: 1,
      name: 'Kayak Room',
      description: 'This is the room we keep kayaks in',
    },
  ],
}


///////////// DELETE TEST  /////////////

describe('Deleting an event', () => {
  // Deleting Story 1 - shows current data on the form //
  it('shows current data on the form', async () => { 
    const eventScope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, fakeEvent)

    const locationScope = nock('http://localhost')
      .get('/api/v1/locations')
      .reply(200, fakeLocations)

    // ARRANGE
    const { ...screen } = setupApp('/events/1/edit')
    // ACT
    // ASSERT
    const nameInput = await screen.findByLabelText('Event name')
    const descriptionInput = await screen.findByLabelText('Description')

    expect(nameInput).toBeVisible()
    expect(nameInput).toHaveValue('Slushie Apocalypse I')
    expect(descriptionInput).toBeInTheDocument()
    expect(descriptionInput).toHaveValue(
      'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    )

    expect(eventScope.isDone()).toBe(true)
    expect(locationScope.isDone()).toBe(true)
  })


   ////// TODO - WRITE FRONT END TEST /////

    // Deleting Story 2 - deletes the event when the delete button is clicked //
    it('deletes the event when the delete button is clicked', async () => {
      // Mock DELETE API call
      const deleteEventScope = nock('http://localhost')
        .delete('/api/v1/events/1')
        .reply(204); // Deletion successful, no content
    
      // Mock locations fetch
      const locationScope = nock('http://localhost')
        .get('/api/v1/locations')
        .reply(200, fakeLocations);
    
      // Mock event fetch (before deletion)
      const eventScope = nock('http://localhost')
        .get('/api/v1/events/1')
        .reply(200, fakeEvent); // Pre-deletion event data
    
      // ARRANGE
      const { user, ...screen } = setupApp('/events/1/edit');
    
      // ACT
      // Wait for the form to load
      const deleteButton = await screen.findByRole('button', { name: 'Delete event' });
    
      // Simulate clicking the delete button
      await user.click(deleteButton);
    
      // ASSERT
      // Ensure the DELETE request was made
      expect(deleteEventScope.isDone()).toBe(true);
    
      // Ensure other mock requests are also done
      expect(locationScope.isDone()).toBe(true);
      expect(eventScope.isDone()).toBe(true);
    });
    
})