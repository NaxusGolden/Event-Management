import React, { useState } from 'react';
import Modal from 'react-modal';
import '../Styles/ModalStyles.css';
import '../Styles/EventList.css';

Modal.setAppElement('#app');

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableRowStyle = {
  backgroundColor: '#f2f2f2',
};

const buttonStyle = {
  margin: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

const EventList = ({ events, onDelete, onUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');

  const openModal = (event) => {
    setSelectedEvent(event);
    setUpdatedTitle(event.title);
    setUpdatedDate(event.date);
    setUpdatedDescription(event.description);
    setUpdatedLocation(event.location);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdateClick = () => {
    const updatedEvent = {
      ...selectedEvent,
      title: updatedTitle,
      date: updatedDate,
      description: updatedDescription,
      location: updatedLocation,
    };
    onUpdate(updatedEvent);
    closeModal();
  };

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Título</th>
            <th style={tableCellStyle}>Fecha</th>
            <th style={tableCellStyle}>Descripción</th>
            <th style={tableCellStyle}>Ubicación</th>
            <th style={tableCellStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{event.title}</td>
              <td style={tableCellStyle}>{event.date}</td>
              <td style={tableCellStyle}>{event.description}</td>
              <td style={tableCellStyle}>{event.location}</td>
              <td style={tableCellStyle}>
                <button className="update" onClick={() => openModal(event)} style={buttonStyle}>Actualizar</button>
                <button className="delete" onClick={() => onDelete(event._id)} style={buttonStyle}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Actualizar Evento"
        className="custom-modal"
      >
        <h2>Actualizar Evento</h2>
        {selectedEvent && (
          <form>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Título"
            />
            <input
              type="text"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              placeholder="Fecha"
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Descripción"
            />
            <input
              type="text"
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              placeholder="Ubicación"
            />
            <button type="button" onClick={closeModal}>Cerrar</button>
            <button type="button" onClick={handleUpdateClick}>Guardar</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EventList;