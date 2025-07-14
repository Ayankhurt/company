// import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
// import Navbar from './componement/Navbar'
// import Main from './componement/main'
import NotFound from './componement/NotFound'

function App() {
    return (
        <>
            <Routes>
                <Route path="*" element={<NotFound />} /> {/* This is the 404 route */}
            </Routes>
        </>
    );
}
export default App
