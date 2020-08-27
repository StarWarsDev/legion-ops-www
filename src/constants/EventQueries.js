export const EVENT_QUERY = `
  query Event($id: ID!) {
    event(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      type
      organizer {
        id
        name
        picture
      }
      headJudge {
        id
        name
        picture
      }
      judges {
        id
        name
        picture
      }
      players {
        id
        name
        picture
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
              id
              name
              picture
            }
            player1VictoryPoints
            player1MarginOfVictory
            player2 {
              id
              name
              picture
            }
            player2VictoryPoints
            player2MarginOfVictory
            bye {
              id
              name
              picture
            }
            blue {
              id
              name
              picture
            }
            winner {
              id
              name
              picture
            }
          }
        }
      }
    }
  }
`

export const ALL_EVENTS_QUERY = `
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
        id
        name
        picture
      }
      headJudge {
        id
        name
        picture
      }
      judges {
        id
        name
        picture
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
`

export const CAN_MODIFY_QUERY = `
  query CanModifyEvent($id: ID!) {
    canModifyEvent(id: $id)
  }
`
