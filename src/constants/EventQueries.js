import gql from "graphql-tag"

const userFragment = gql`
  fragment User_user on User {
    id
    name
    picture
  }
`

export const EVENT_QUERY = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      type
      organizer {
        ...User_user
      }
      headJudge {
        ...User_user
      }
      judges {
        ...User_user
      }
      players {
        ...User_user
      }
      days {
        id
        createdAt
        updatedAt
        startAt
        endAt
        rounds {
          id
          counter
          matches {
            id
            createdAt
            updatedAt
            player1 {
              ...User_user
            }
            player1VictoryPoints
            player1MarginOfVictory
            player2 {
              ...User_user
            }
            player2VictoryPoints
            player2MarginOfVictory
            bye {
              ...User_user
            }
            blue {
              ...User_user
            }
            winner {
              ...User_user
            }
          }
        }
      }
    }
  }
  ${userFragment}
`

export const ALL_EVENTS_QUERY = gql`
  query AllEvents(
    $eventType: EventType
    $startsAfter: Date
    $endsBefore: Date
  ) {
    events(
      eventType: $eventType
      startsAfter: $startsAfter
      endsBefore: $endsBefore
    ) {
      id
      createdAt
      updatedAt
      name
      description
      type
      organizer {
        ...User_user
      }
      headJudge {
        ...User_user
      }
      judges {
        ...User_user
      }
      players {
        id
      }
      days {
        id
        startAt
        endAt
      }
    }
  }
  ${userFragment}
`

export const CAN_MODIFY_QUERY = gql`
  query CanModifyEvent($id: ID!) {
    canModifyEvent(id: $id)
  }
`
