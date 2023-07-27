import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';

function App() {

  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
