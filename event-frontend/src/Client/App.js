import React, { useState, useEffect } from 'react';
import EventList from '../Components/EventList';
import EventForm from '../Components/EventForm';
import axios from 'axios';
import '../Styles/App.css'

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://192.168.2.5:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleEventSubmit = async (eventData) => {
    try {
      if (selectedEvent) {
        await axios.put(`http://192.168.2.5:5000/api/events/${selectedEvent._id}`, eventData);
        setSelectedEvent(null);
      } else {
        await axios.post('http://192.168.2.5:5000/api/events', eventData);
      }
      fetchEvents();
    } catch (error) {
      console.error('Error al crear/actualizar evento:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://192.168.2.5:5000/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      await axios.put(`http://192.168.2.5:5000/api/events/${event._id}`, event);
      fetchEvents();
    } catch (error) {
      console.error('Error al actualizar evento:', error);
    }
  };

  return (
    <div>
      <h1>Gestor de Eventos</h1>
      <EventForm onEventSubmit={handleEventSubmit} initialEvent={selectedEvent} />
      <EventList events={events} onDelete={handleDeleteEvent} onUpdate={handleUpdateEvent} />
    </div>
  );
  
};


export default App;