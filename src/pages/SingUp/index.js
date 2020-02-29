import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Navigation from '../../components/Navigation';

export default function SingUp() {


  let history = useHistory();
  const [id, setId] = useState(parseInt(Date.now()));
  const [organization, setOrganization] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [terms, setTerms] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      id,
      organization,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    }

    if (email !== emailConfirm) {
      console.warn('Os emails precisam ser iguais')
      return;
    }

    if (password !== passwordConfirm) {
      console.warn('As senhas precisam ser iguais')
      return;
    }

    if (terms === false) {
      console.warn('Termo não aceito')
      return
    }

    await axios.post("http://localhost:4000/users", data);
    history.push('/');
  }

  return (
    <div className="singup-container">
      <form onSubmit={handleSubmit} className="singup-content">
        <Navigation linkPath="/" />
        <input type="text" placeholder="Organization name" value={organization} onChange={e => setOrganization(e.target.value)} />
        <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input type="email" placeholder="Your best email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="email" placeholder="Confirm your email" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} />
        <input type="password" placeholder="A strong password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm your password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />

        <span>
          <input type="checkbox" name="termsAndConditions" onChange={e => setTerms(!terms)} />
          <label htmlFor="termsAndConditions">I agree to the Adopt4Love
            <a>Terms and Conditions</a>
          </label>
        </span>

        <p>To learn more about how Adopt4Love collects, processes, shares and
          protects your personal data, read the <a>Privacy Policy</a>.</p>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
