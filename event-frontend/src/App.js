import React, { useState, useEffect } from 'react';
import EventList from './Components/EventList';
import EventForm from './Components/EventForm';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleEventSubmit = async (eventData) => {
    try {
      await axios.post('http://localhost:5000/events', eventData);
      fetchEvents();
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  return (
    <div>
      <h1>Gestor de Eventos</h1>
      <EventForm onEventSubmit={handleEventSubmit} />
      <EventList events={events} />
    </div>
  );
};

export default App;