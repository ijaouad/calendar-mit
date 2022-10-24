import React, { createContext, useEffect, useState } from 'react'

export const EventContext = createContext();

const EventContextProvider = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
      let storedEvents = localStorage.getItem('events')
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents))
        }
    }, [])
    

    const handleSetEvents = (event) => {
        setEvents([...events, event])
    }

    return (
        <EventContext.Provider value={{events, handleSetEvents}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider