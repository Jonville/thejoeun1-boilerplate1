import React, { useState } from 'react'

function SignUpForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버로 전송할 회원 가입 데이터
    const data = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname
    };

    const serverUrl = 'http://localhost:8091/api/auth/signup';

    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      // 서버로부터 온 응답 처리
      console.log(result);

           // 회원 가입 성공 메시지를 띄우고 로그인 페이지로 이동
           window.alert('회원 가입에 성공했습니다.');
           window.location.replace('/thejoeun1-boilerplate1/login');

    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // console.log(formData);

  return (
    <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <h2 className="text-white">SIGN UP</h2>
            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>
            <div className = "mb-2">
              <form onSubmit={handleSubmit}>
                <input type="hidden"/>
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
                <div className="mb-3">
                  <label className="form-label text-white">nickname</label>
                  <input
                    type="text" 
                    className="form-control"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange} 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpForm