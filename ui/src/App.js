import './css/App.css'
import React from 'react';
import TransactionForm from './Forms/TranscationForm';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import AdminPage from './Pages/AdminPage';
import PathForm from './Forms/PathForm'
import UserPage from './Pages/UserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/easypost-api' element={<SignIn />} />
        <Route path='/easypost-api/signin' element={<SignIn />} />
        <Route path='/easypost-api/signup' element={<SignUp />} />
        <Route path='/easypost-api/admin' element={<AdminPage />} />
        <Route path='/easypost-api/user' element={<UserPage />} />
        <Route path='/easypost-api/transform' element={<TransactionForm />} />
        <Route path='/easypost-api/addPath' element={<PathForm />} />
      </Routes>
    </Router>
  );
}

export default App;
