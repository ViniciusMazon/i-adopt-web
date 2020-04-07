import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import passwordValidator from 'password-validator';

import './styles.css';
import ErrorBalloon from '../../components/ErrorBalloon';

export default function SingUp() {


  let history = useHistory();
  const [organizationList, setOrganizationList] = useState([]);
  const [organization_id, setOrganization_id] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadOrganizationList() {
      const response = await axios.get('http://localhost:4000/organization');
      setOrganizationList(response.data);
    }
    loadOrganizationList();
  }, []);

  async function validator(data) {
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
      organization_id,
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
      <div className="navigation-container">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} className="tab-icon" />
      </Link>
    </div>

        {
          error ? <ErrorBalloon message={errorMessage} /> : null
        }

        <select onChange={e => setOrganization_id(e.target.value)}>
          <option value="">Organization</option>
          {
            organizationList.map( org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))
          }
        </select>

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
