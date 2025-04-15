import React, { useState } from 'react';

const HomePage: React.FC = () => {
    const [webSocketUrl, setWebSocketUrl] = useState('');
    const [roomName, setRoomName] = useState('');
    const [step, setStep] = useState(1);

    const handleWebSocketSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (webSocketUrl) {
            setStep(2);
        }
    };

    const handleRoomNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomName) {
            alert(`WebSocket URL: ${webSocketUrl}, Room Name: ${roomName}`);
        }
    };

    return (
        <div>
            <h1>Welcome to CollabNet</h1>
            {step === 1 && (
                <form onSubmit={handleWebSocketSubmit}>
                    <label>
                        Enter WebSocket URL:
                        <input
                            type="text"
                            value={webSocketUrl}
                            onChange={(e) => setWebSocketUrl(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Next</button>
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleRoomNameSubmit}>
                    <label>
                        Enter Room Name:
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Join</button>
                </form>
            )}
        </div>
    );
};

export default HomePage;