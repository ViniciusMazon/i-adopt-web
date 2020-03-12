import React, { useState } from 'react';
import axios from 'axios';
import passwordValidator from 'password-validator';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Navigation from '../../components/Navigation';
import ErrorBalloon from '../../components/ErrorBalloon';

export default function SingUp() {


  let history = useHistory();
  const [organization, setOrganization] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  function validator(data) {
    const { } = data;
    var schema = new passwordValidator();
    schema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().not().spaces();

    if (!schema.validate(password)) {
      setErrorMessage('Weak password');
      return false;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('Passwords are not the same');
      return false;
    }

    if (email !== emailConfirm) {
      setErrorMessage('Emails are not the same');
      return false;
    }

    if (terms === false) {
      setErrorMessage('You need to accept the terms to continue');
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      organization,
      email,
      password,
    }

    if (validator(data)) {
      await axios.post("http://localhost:4000/users", data);
      history.push('/');
    } else {
      setError(true);
    }
  }

  return (
    <div className="singup-container">
      <div className="singup-image" />

      <form onSubmit={handleSubmit} className="singup-content">
        <Navigation linkPath="/" />

        {
          error ? <ErrorBalloon message={errorMessage}/> : null
        }

        <input type="text" placeholder="Organization name" value={organization} onChange={e => setOrganization(e.target.value)} required />
        <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="email" placeholder="Your best email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="email" placeholder="Confirm your email" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} required />
        <input type="password" placeholder="A strong password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm your password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />

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
