import { useState } from 'react';

function JoinSession() {
  const [roomCode, setRoomCode] = useState<string>('');

  const createChannel = () => {
    // const response = client.queryUser()
  };

  return (
    <div className='joinSession'>
      <h4>Create session</h4>
      <input
        placeholder='Room Code'
        onChange={event => setRoomCode(event.target.value)}
      />
      <button onClick={createChannel}>Join Room</button>
    </div>
  );
}
