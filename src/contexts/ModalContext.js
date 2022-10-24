import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

const ModalContextProvider = (props) => {

    const [showModal, setShowModal] = useState(false)
    

    const handleShowModal = (value) => {
        setShowModal(value)
    }

    return (
        <ModalContext.Provider value={{showModal, handleShowModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider