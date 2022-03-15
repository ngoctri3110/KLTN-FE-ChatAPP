import Account from 'features/Account';

import ChatLayout from 'layout/ChatLayout';
import { Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<Account />} />
                <Route path="chat/*" element={<ChatLayout />} />
            </Routes>
        </div>
    );
}

export default App;
