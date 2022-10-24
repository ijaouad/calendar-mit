import React from 'react'
import { Calender } from './components';
import EventContextProvider from './contexts/EventContext';
import ModalContextProvider from './contexts/ModalContext';

function App() {
  return (
    <div className="App">
      <EventContextProvider>
        <ModalContextProvider>
          <Calender />
        </ModalContextProvider>
      </EventContextProvider>
    </div>
  );
}

export default App;
