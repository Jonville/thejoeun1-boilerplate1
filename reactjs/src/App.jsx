import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useCookies } from 'react-cookie';
import ArticleListPage from './pages/ArticleListPage';

function App() {

  // 쿠키에 토큰값이 저장되어있는지 확인
  const [cookie] = useCookies(['token']);
  const cookieToken = cookie.token;
  console.log('cookie :', cookieToken);

  // 로그인 상태인지 확인
  let isLogin = false;
  if (cookieToken) {
    isLogin = true;
  }

  return (
    <Layout>
      <Routes>
        <Route path='/' element={isLogin ? <ArticleListPage /> : <HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
