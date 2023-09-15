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
        <Route path='/easypost-api' element={<SignIn />} />
        <Route path='/easypost-api/signin' element={<SignIn />} />
        <Route path='/easypost-api/signup' element={<SignUp />} />
        <Route path='/easypost-api/admin' element={<AdminPage />}/>
        <Route path='/easypost-api/transform' element={<TransactionForm />} />
        <Route path='/easypost-api/addPath' element={<PathForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
