export const MY_PROFILE = `
  query MyProfile {
    myProfile {
      account {
        id
        name
        picture
        username
      }
      organizedEvents {
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
      judgingEvents {
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
      participatingEvents {
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
  }
`
