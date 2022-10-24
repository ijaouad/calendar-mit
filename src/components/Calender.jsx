import React, { useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { EventContext } from '../contexts/EventContext';
import { ModalContext } from '../contexts/ModalContext';
import AddEventForm from './AddEventForm';

const Calender = () => {

    const {events} = useContext(EventContext)
    const {handleShowModal} = useContext(ModalContext)

    useEffect(() => {
        document.querySelector('button.fc-timeGridWeek-button')
        .innerHTML = 'Semaine'
            
        document.querySelector('button.fc-timeGridDay-button')
        .innerHTML = 'Jour'
    }, [])

    const handleOpenModal = () => {
        handleShowModal(true)
    }

    return (
    <>
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView={`timeGridWeek`}

            headerToolbar={{
                left: "prev,title,next,timeGridWeek,timeGridDay",
                right: "ADD"
            }}

            locale='fr'
            
            customButtons={{
                ADD: {
                    text: '+',
                    click: () => handleOpenModal()
                }}    
            }
            
            events={events}
            eventColor={'#EFB521'}
            titleFormat={{ day: 'numeric', month: 'short' }}

            slotMinTime={'08:00:00'}
            slotMaxTime={'24:00:01'}
            slotDuration={'02:00:00'}

            dayHeaderFormat={{  day: 'numeric', weekday: 'short'}}

            eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }}

            slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }}

            allDaySlot={false}
            editable={true}
            selectable={true}
            dayMaxEvents={true}

            eventContent={renderEventContent} 
        />

        <AddEventForm />
    </>
  )
}

export default Calender


function renderEventContent(eventInfo) {
    return (
      <>
        <span className='eventInfo-timeText'>{eventInfo.timeText}</span>
        <br />
        <b className='eventInfo-eventTitle'>{eventInfo.event.title}</b>
      </>
    );
}