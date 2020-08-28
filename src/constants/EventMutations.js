import gql from "graphql-tag/src"
import { userFragment } from "./EventQueries"

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`
export const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: EventInput!) {
    updateEvent(input: $input) {
      id
    }
  }
`
export const CREATE_DAY = gql`
  mutation CreateDay($eventID: ID!, $input: EventDayInput!) {
    createDay(eventID: $eventID, input: $input) {
      id
      startAt
      endAt
    }
  }
`
export const CREATE_ROUND = gql`
  mutation CreateRound($eventID: ID!, $dayID: ID!) {
    createRound(eventID: $eventID, dayID: $dayID, input: { matches: [] }) {
      id
      counter
    }
  }
`
export const CREATE_MATCH = gql`
  mutation CreateMatch($eventID: ID!, $roundID: ID!, $input: MatchInput!) {
    createMatch(eventID: $eventID, roundID: $roundID, input: $input) {
      id
      player1 {
        ...User_user
      }
      player2 {
        ...User_user
      }
    }
  }
  ${userFragment}
`
