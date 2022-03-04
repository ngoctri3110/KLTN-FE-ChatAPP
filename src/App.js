import Account from 'features/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<Account />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
