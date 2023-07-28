import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useCookies } from 'react-cookie';

function MainNavigation() {

  // 쿠키 불러오기
  const [cookie, setCookie, removeCookie] = useCookies(['token']);

  // 로그인 한 닉네임 
  const [nickname, setNickname] = useState('');

  // 로그인 상태인지 확인
  let isLogin = false;
  const cookieToken = cookie.token;
  if (cookieToken) {
    isLogin = true;
  }

  useEffect(() => {
    if (isLogin) {
      const accessToken = 'Bearer ' + cookieToken;

      fetch('/api/member/me', {
        method: 'GET',
        headers: {
          "Content-Type": 'appliation/json',
          "Authorization": accessToken,
        },
      }).then(res => {
        if (!(res && res.status === 200)) {
          alert('회원정보를 가져오는데 실패하였습니다. ㅠㅠㅠ');
        }
        return res.json();

      }).then(data => {
        console.log('member/me ', data);
        if (data)
          setNickname(data.nickname);
      });
    }
  }, [isLogin])

  const toggleLogoutHandler = () => {
    removeCookie('token');

    alert('로그아웃 하였습니다.');
    window.location.href = 'http://localhost:3000/thejoeun1-boilerplate1/login'
  }
  return (
    <header>
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
        <div className="container-fluid">
          <Link to='/' className='navbar-brand'>LOGO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" >
            <ul className='navbar-nav'>
              <li className='nav-item'><Link to='/' className='nav-link'>Home1</Link></li>
              <li className='nav-item'><Link to='/about' className='nav-link'>About</Link></li>
            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                {!isLogin && <Link to='/login' className='nav-link'>Login</Link>}
              </li>
              <li className='nav-item'>
                {!isLogin && <Link to='/signup' className='nav-link'>SignUp</Link>}
              </li>
              <li className='nav-item'>
                {isLogin && <Link to='/profile' className='nav-link'>{nickname} , 반갑습니다</Link>}
              </li>
              <li className='nav-item'>
                {isLogin && <button onClick={toggleLogoutHandler}>logout</button>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;