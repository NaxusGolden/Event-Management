Pruebas Unitarias en el Frontend (React)

Para React, utilizaremos Jest y React Testing Library, que son las herramientas más comunes para pruebas unitarias en este entorno.

1. Configuración de Jest y React Testing Library:

Si estás usando Create React App, Jest y React Testing Library ya vienen configurados. De lo contrario, puedes instalarlos con:

Bash

npm install --save-dev jest @testing-library/react @testing-library/jest-dom
2. Ejemplo de prueba para EventForm.js:

Crea un archivo llamado EventForm.test.js en el mismo directorio que EventForm.js.

JavaScript

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EventForm from './EventForm';

describe('EventForm', () => {
  it('debería permitir la entrada de datos en los campos', () => {
    const { getByPlaceholderText } = render(<EventForm />);
    fireEvent.change(getByPlaceholderText('Título'), { target: { value: 'Evento de prueba' } });
    fireEvent.change(getByPlaceholderText('Fecha'), { target: { value: '2023-12-31' } });
    fireEvent.change(getByPlaceholderText('Descripción'), { target: { value: 'Descripción de prueba' } });
    fireEvent.change(getByPlaceholderText('Ubicación'), { target: { value: 'Ubicación de prueba' } });
    expect(getByPlaceholderText('Título').value).toBe('Evento de prueba');
    expect(getByPlaceholderText('Fecha').value).toBe('2023-12-31');
    expect(getByPlaceholderText('Descripción').value).toBe('Descripción de prueba');
    expect(getByPlaceholderText('Ubicación').value).toBe('Ubicación de prueba');
  });

  it('debería llamar a onEventSubmit con los datos del formulario', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<EventForm onEventSubmit={mockSubmit} />);
    fireEvent.change(getByPlaceholderText('Título'), { target: { value: 'Evento de prueba' } });
    fireEvent.change(getByPlaceholderText('Fecha'), { target: { value: '2023-12-31' } });
    fireEvent.change(getByPlaceholderText('Descripción'), { target: { value: 'Descripción de prueba' } });
    fireEvent.change(getByPlaceholderText('Ubicación'), { target: { value: 'Ubicación de prueba' } });
    fireEvent.click(getByText('Guardar Evento'));
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Evento de prueba',
      date: '2023-12-31',
      description: 'Descripción de prueba',
      location: 'Ubicación de prueba',
    });
  });
});
3. Ejemplo de prueba para EventList.js:

Crea un archivo llamado EventList.test.js en el mismo directorio que EventList.js.

JavaScript

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EventList from './EventList';

describe('EventList', () => {
  const events = [
    { _id: '1', title: 'Evento 1', date: '2023-12-01', description: 'Desc 1', location: 'Ubicación 1' },
    { _id: '2', title: 'Evento 2', date: '2023-12-02', description: 'Desc 2', location: 'Ubicación 2' },
  ];

  it('debería renderizar la lista de eventos', () => {
    const { getByText } = render(<EventList events={events} />);
    expect(getByText('Evento 1')).toBeInTheDocument();
    expect(getByText('Evento 2')).toBeInTheDocument();
  });

  it('debería llamar a onDelete cuando se hace clic en Eliminar', () => {
    const mockDelete = jest.fn();
    const { getByText } = render(<EventList events={events} onDelete={mockDelete} />);
    fireEvent.click(getByText('Eliminar'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('debería llamar a onUpdate cuando se hace clic en Actualizar', () => {
    const mockUpdate = jest.fn();
    const { getByText } = render(<EventList events={events} onUpdate={mockUpdate} />);
    fireEvent.click(getByText('Actualizar'));
    expect(mockUpdate).toHaveBeenCalledWith(events[0]);
  });
});
Pruebas Unitarias en el Backend (Node.js con Jest/Mocha)

Para Node.js, usaremos Jest para las pruebas unitarias.

1. Configuración de Jest:

Instala Jest como dependencia de desarrollo:

Bash

npm install --save-dev jest supertest
2. Ejemplo de prueba para rutas CRUD (usando Supertest):

Crea un archivo llamado events.test.js en tu directorio de pruebas (por ejemplo, test).

JavaScript

const request = require('supertest');
const app = require('../app'); // Asegúrate de que la ruta sea correcta
const mongoose = require('mongoose');

describe('Event API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('debería obtener todos los eventos', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería crear un nuevo evento', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({ title: 'Evento de prueba', date: '2023-12-31', description: 'Descripción de prueba', location: 'Ubicación de prueba' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  // Agrega pruebas para actualizar y eliminar eventos
});
3. Ejecución de las pruebas:

Para ejecutar las pruebas de Jest, agrega un script en tu package.json:
JSON

"scripts": {
  "test": "jest"
}
Luego, ejecuta npm test en tu terminal.