import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function OAuth2Page() {
  const accessToken = new URL(window.location.href).searchParams.get('accessToken');
  const expirationTimeIn = new URL(window.location.href).searchParams.get('expirationTimeIn');
  console.log('accessToken:', accessToken);
  console.log('expire:', expirationTimeIn);

  useEffect(() => {
    window.location.href = process.env.REACT_APP_PUBLIC_URL + '/?accessToken=' + accessToken + "&expirationTimeIn=" + expirationTimeIn;
  }, []);

  return null; // 리턴 값이 필요하지 않으므로 null 반환
}

export default OAuth2Page;
