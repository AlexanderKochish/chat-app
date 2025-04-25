import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [text, setText] = useState("");

  const send = () => {
    socket.emit("sendMessage", {
      text,
      roomId: "ad6bdc0d-43d2-4639-9673-df517cc4a8e1", 
      ownerId: "2dcebf9a-fa74-4946-842d-600562b3a114",
    });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Отправить</button>
    </div>
  );
}