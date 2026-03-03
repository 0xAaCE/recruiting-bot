import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className="app">
      <h1>Recruiting Bot</h1>
      <p>AI-powered chatbot to assist recruiters</p>
      <div className="chat-container">
        <p>Chat interface coming soon...</p>
      </div>
    </div>
  );
}

export default App;
