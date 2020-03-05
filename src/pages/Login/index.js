import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.png';
import ErrorBalloon from '../../components/ErrorBalloon';


export default function Login() {

  let history = useHistory();
  const [emailVerification, setEmailVerification] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function auth(e) {
    e.preventDefault();
    const response = await axios.get(`http://localhost:4000/users?email=${emailVerification}`);

    if (response.data[0].password === passwordVerification) {
      const userData = JSON.stringify(response.data[0]);
      sessionStorage.setItem('IAdopt_user', userData);
      history.push('/home');
    } else {
      setError(true);
      setErrorMessage('Username or password is invalid');
    }
  }

  return (

    <div className="login-container">
      <div className="login-image" />

      <div className="login-content">
        <img id="logo" src={logo} alt="" />
        {
          error ? <ErrorBalloon message={errorMessage} /> : null
        }
        <input type="email" placeholder="Email" value={emailVerification} onChange={e => setEmailVerification(e.target.value)} />
        <input type="password" placeholder="Password" value={passwordVerification} onChange={e => setPasswordVerification(e.target.value)} />
        <button type="button" onClick={auth}>Ok</button>
        <Link to="/singup">Don't have an account?</Link>
      </div>
    </div>
  );
}
