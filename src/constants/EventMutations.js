export const CREATE_EVENT = `
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`
export const UPDATE_EVENT = `
  mutation UpdateEvent($input: EventInput!) {
    updateEvent(input: $input) {
      id
    }
  }
`
export const CREATE_DAY = `
  mutation CreateDay($eventID: ID!, $input: EventDayInput!) {
    createDay(eventID: $eventID, input: $input) {
      id
      startAt
      endAt
    }
  }
`
export const CREATE_ROUND = `
  mutation CreateRound($eventID: ID!, $dayID: ID!) {
    createRound(eventID: $eventID, dayID: $dayID, input: { matches: [] }) {
      id
      counter
    }
  }
`
