// import './css/Auth.css'
import './css/App.css'
import React from 'react';
import TransactionForm from './TranscationForm';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import AdminPage from './Pages/AdminPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<AdminPage />}/>
        <Route path='/transform' element={<TransactionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
