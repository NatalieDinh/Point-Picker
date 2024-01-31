import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import '../css/MainMenu.css';

interface MainMenuProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
}

export default function MainMenu({
  name,
  setName,
  room,
  setRoom,
  socket,
}: MainMenuProps) {
  const [user, setUser] = useState<object>({});
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room && name) {
      socket.emit('join_room', { name, room });
      navigate('/lobby', { replace: true });
    } else {
      alert('Name and room code are required.');
    }
  };

  return (
    <div className='mainMenu'>
      <label className='sessionLabel'>Join a session</label>
      <div className='inputDiv'>
        <input
          placeholder='Name'
          onChange={event => setName(event.target.value)}
        />
        <input
          placeholder='Room Code'
          onChange={event => setRoom(event.target.value)}
        />
      </div>
      <button className='joinButton' onClick={joinRoom}>
        Join a room
      </button>
    </div>
  );
}
