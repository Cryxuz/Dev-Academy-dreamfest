import React from 'react'
import VolunteerListItem from '../VolunteerListItem/VolunteerListItem'

export default function VolunteerList ({ volunteers, eventId }) {
  return (
    <>
      <h4>List of Volunteers</h4>
      <ul>
        {volunteers?.length
          ? volunteers.map(volunteer => {
            return (
              <VolunteerListItem
                key={volunteer.userId}
                volunteer={volunteer}
                eventId={eventId}
              />
            )
          })
          : <p>No volunteers yet</p>
        }
      </ul>
    </>
  )
}
