import React, { createContext, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import { queryEvent, queryMyEvents } from "../api";

const EventContext = createContext()

export function EventProvider({children, slug, eventId}) {
  const { auth } = useContext(DataContext)
  const [event, setEvent] = useState()

  const getEvent = async (idToken, eventId) => {
    if (eventId !== "" && idToken !== "") {
      const event = await queryEvent(idToken, eventId)
      setEvent(event)
    }
  }

  useEffect(async () => {
    if (auth && auth.idToken !== "") {
      getEvent(auth.idToken, eventId)
    }
  }, [])

  useEffect(async () => {
    if (auth && auth.idToken !== "") {
      getEvent(auth.idToken, eventId)
    }
  }, [auth])

  return (<EventContext.Provider value={{
    event
  }}>{children}</EventContext.Provider>)
}

export default EventContext