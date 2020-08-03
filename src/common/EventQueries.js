import { gql } from "@apollo/client"

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
