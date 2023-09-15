// import './css/Auth.css'
import './css/App.css'
import React from 'react';
import TransactionForm from './Forms/TranscationForm';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import AdminPage from './Pages/AdminPage';
import PathForm from './Forms/PathForm'
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
        <Route path='/addPath' element={<PathForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
