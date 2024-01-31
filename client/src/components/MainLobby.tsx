import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import '../css/MainLobby.css';
interface MainLobbyProps {
  name: string;
  room: string;
  socket: Socket;
}

interface PointData {
  value: string;
}

const points: PointData[] = [
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '5' },
  { value: '8' },
  { value: '?' },
  { value: 'mug' },
];

export function MainLobby({ name, room, socket }: MainLobbyProps) {
  useEffect(() => {
    socket.on('receive_message', data => {
      console.log(data);
    });

    socket.on('points_chosen', data => {
      console.log(data);
    });

    // Remove event listener on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('points_chosen');
    };
  }, [socket]);

  const handlePointSelection = (value: number) => {
    socket.emit('points_chosen', {
      message: `${name} has selected ${value}`,
      username: 'Chatbot',
      room: room,
    });
  };

  return (
    <div className='mainLobby'>
      <h4>Hello {name}</h4>
      <h5>Welcome to room: {room}</h5>

      <div className='buttonDiv'>
        {points.map((pointData, index) => (
          <button
            className={`pointButton-${index}`}
            key={`point-${index}`}
            onClick={() => handlePointSelection(parseInt(pointData.value))}
          >
            {pointData.value}
          </button>
        ))}
      </div>
    </div>
  );
}
