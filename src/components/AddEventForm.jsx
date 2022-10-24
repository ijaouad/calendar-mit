import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal'
import { EventContext } from '../contexts/EventContext'
import { ModalContext } from '../contexts/ModalContext'

const AddEventForm = () => {
    
    const [event, setEvent] = useState({title:'', start:'', end:'', backgroundColor:'', borderColor:''})

    const {events, handleSetEvents} = useContext(EventContext)
    const {showModal, handleShowModal} = useContext(ModalContext)

    const addEvent = () => {
        if (!event.title || !event.start || !event.end ) {
            return;
        }
        handleSetEvents(event)
        localStorage.setItem('events', JSON.stringify([...events, event]))
        handleShowModal(false)
        setEvent({title:'', start:'', end:''})
    }

    return (
    <>
        <ReactModal
           isOpen={showModal}
           contentLabel="Form Modal"
           ariaHideApp={false}
        >
          <div className='modal-form'>
            <button className='btn-close-modal' onClick={() => handleShowModal(false)}>X</button>
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
                    <div>
                        <label htmlFor="fin">Choisir un color </label>
                        <div 
                            className='colors-radio-group' 
                            onChange={(e) => setEvent({...event, backgroundColor: e.target.value, borderColor: e.target.value})}>
                            <input type="radio" name="color" id="yellow" className='color-radio color-yellow' value={'#EFB521'} />
                            <input type="radio" name="color" id="blue" className='color-radio color-blue' value={'#6CA7FF'} />
                            <input type="radio" name="color" id="green" className='color-radio color-green' value={'#8DBE00'} />
                        </div>
                    </div>
                    <button className='btn-modal-add' onClick={addEvent}>Ajouter</button>
                </div>
            </div>
        </ReactModal>
    </>
  )
}

export default AddEventForm