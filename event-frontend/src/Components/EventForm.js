import React, { useState, useEffect } from 'react';
import '../Styles/EventForm.css'

const EventForm = ({ onEventSubmit, initialEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDate(initialEvent.date);
      setDescription(initialEvent.description);
      setLocation(initialEvent.location);
    } else {
      setTitle('');
      setDate('');
      setDescription('');
      setLocation('');
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !description || !location) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    onEventSubmit({ title, date, description, location });

    setTitle('');
    setDate('');
    setDescription('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Fecha"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="descripcion"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="ubicacion"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Guardar Evento</button>
    </form>
  );
};

export default EventForm;