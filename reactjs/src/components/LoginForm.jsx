import React, { useState, useRef, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  // 쿠키 만들어주는 함수
  const [cookie , setCookie] = useCookies(['token']);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버로 전송할 로그인 데이터
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const serverUrl = 'http://localhost:8091/api/auth/login';

    const dataJson = JSON.stringify(data);
    console.log('dataJson', dataJson);

    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
    })
    .then(res => {
      console.log('res.status: ', res.status);
      if (res.status !== 200) {
        return alert('로그인에 실패하였습니다. 다시 시도해주세요~');
      }

      return res.json();
    })
    .then(data => {      
      if (data) {
        
        // 쿠키에 token 값 저장
        const expireTimeDate = new Date(Number(data.tokenExpiresIn));
        console.log('expireTime: ', expireTimeDate.toLocaleString());
        setCookie('token', data.accessToken, { path: '/', expires: expireTimeDate });

        window.location.href = '/thejoeun1-boilerplate1';
      }
    });
  };

  // console.log(formData)

  return (
    <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <h2 className="text-white">LOGIN</h2>
            <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
            <div className="mb-2">
              <form action="/login" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <button type="button" className="btn btn-secondary mt-3">회원가입</button>
            </div>
            <div>
            <a href={`${process.env.REACT_APP_API_GATEWAY_HOST}/oauth2/authorization/google`}>
            <img src={`${process.env.REACT_APP_PUBLIC_URL}/img/google3.png`} alt="google" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm