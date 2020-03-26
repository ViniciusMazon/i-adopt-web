import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.png';
import Alert from '../../components/Alert';


export default function Login() {

  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

  async function auth(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      sessionStorage.setItem('IAdopt_session', response.data.authorization);
      sessionStorage.setItem('IAdopt_user_email', email);
      history.push('/home');
    } catch (error) {
      setAlertInfo({
        type: 'error',
        message: 'Invalid username or password'
      });
      setIsAlerting(true);
      setTimeout(() => {
        setIsAlerting(false);
      }, 3000);
    }
  }

  return (

    <div className="login-container">
      <div className="login-image" />
      <div className="login-content">
        {
          isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
        }
        <img id="logo" src={logo} alt="" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={auth}>Ok</button>
        <Link to="/singup">Don't have an account?</Link>
      </div>
    </div>
  );
}
