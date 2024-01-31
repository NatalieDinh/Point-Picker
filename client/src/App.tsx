import React, { useState } from 'react';
import './css/App.css';
import MainMenu from './components/MainMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { MainLobby } from './components/MainLobby';

const socket = io('http://localhost:3001');

function App() {
  const [room, setRoom] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainMenu
              name={name}
              room={room}
              setName={setName}
              setRoom={setRoom}
              socket={socket}
            />
          }
        />
        <Route
          path='/lobby'
          element={<MainLobby name={name} room={room} socket={socket} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
