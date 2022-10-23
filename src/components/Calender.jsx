import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import ReactModal from 'react-modal';

const Calender = () => {

    const [time, setTime] = useState('Week');
    const [showModal, setShowModal] = useState(false)
    const [event, setEvent] = useState({title:'', start:'', end:''})
    const [events, setEvents] = useState([])

    useEffect(() => {
        let storedEvents = localStorage.getItem('events')
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents))
        }
    }, [])

    const addEvent = () => {
        if (!event.title || !event.start || !event.end ) {
            return;
        }
        setEvents([...events, event])
        localStorage.setItem('events', JSON.stringify([...events, event]))
        setShowModal(false)
        setEvent({title:'', start:'', end:''})
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }
    
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleEventClick = (eventInfo) => {
        let colors = ['#EFB521', '#6CA7FF', '#8DBE00']
        let index = Math.floor(Math.random() * 3)
        eventInfo.el.style.background = colors[index]
        eventInfo.el.style.border = colors[index]
        setTime('Day')
    }

    return (
    <>
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView={`timeGrid${time}`}

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
            
            dateClick={() => {
                setTime('Day')
            }}

            eventClick={handleEventClick}
            eventContent={renderEventContent} 
        />

        <ReactModal 
           isOpen={showModal}
           contentLabel="Form Modal"
           ariaHideApp={false}
        >
          <div className='modal-form'>
            <button className='btn-close-modal' onClick={handleCloseModal}>X</button>
            <div className="bg-form">
                    <div>
                    <label htmlFor="entretien">Titre d'entretien</label>
                    <input type="text" id="entretien" name="entretien" placeholder="entretien" value={event.title} onChange={(e) => setEvent({...event, title: e.target.value})}/>
                    </div>

                    <div>
                        <label htmlFor="debut">Date de debut</label>
                        <input type="datetime-local" name="debut" id="debut" value={event.start} onChange={(e) => setEvent({...event, start: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="fin">Date de fin</label>
                        <input type="datetime-local" name="fin" id="fin" value={event.end} onChange={(e) => setEvent({...event, end: e.target.value})} />
                    </div>
                    <button className='btn-modal-add' onClick={addEvent}>Ajouter</button>
          </div>
          </div>
        </ReactModal>
    </>
  )
}

export default Calender


function renderEventContent(eventInfo) {
    console.log(eventInfo);
    return (
      <>
        <span className='eventInfo-timeText'>{eventInfo.timeText}</span>
        <br />
        <b className='eventInfo-eventTitle'>{eventInfo.event.title}</b>
      </>
    );
}