import { fetchUserProfile } from 'app/globalSlice';
import Account from 'features/Account';

import ChatLayout from 'layout/ChatLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
function App() {
    const [isFetch, setIsFetch] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (token) await dispatch(fetchUserProfile());

            setIsFetch(true);
        };

        fetchProfile();
        // eslint-disable-next-line
    }, []);

    if (!isFetch) return '';

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
