import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';

export default function Login() {

  let history = useHistory();
  const [emailVerification, setEmailVerification] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  async function auth(e) {
    e.preventDefault();
    const response = await axios.get(`http://localhost:4000/users?email=${emailVerification}`);

    if (response.data[0].password === passwordVerification) {
      history.push(`/home/${response.data[0].first_name}`);
    }
  }

  return (
    <div className="login-container">
      <img src={logo} alt="" />
      <input type="email" placeholder="Email" value={emailVerification} onChange={e => setEmailVerification(e.target.value)} />
      <input type="password" placeholder="Password" value={passwordVerification} onChange={e => setPasswordVerification(e.target.value)} />
      <button type="button" onClick={auth}>Ok</button>
      <Link to="/singup">Don't have an account?</Link>
    </div>
  );
}
