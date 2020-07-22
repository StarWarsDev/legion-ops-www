import { gql } from "@apollo/client"

const eventsQuery = gql`
  query AllEvents {
      events {
          id
          createdAt
          updatedAt
          name
          type
          organizer {
              id
              name
              username
              picture
          }
          headJudge {
              id
              name
              username
              picture
          }
          judges {
              id
              name
              username
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

export {
  eventsQuery
}