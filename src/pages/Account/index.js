import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import './styles.css';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export default function Account() {

  let history = useHistory();

  const [id, setId] = useState('');
  const [organization, setOrganization] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('IAdopt_user'));

    setId(user.id);
    setOrganization(user.organization);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email)
    setPassword(user.password);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const changes = {
      id,
      organization,
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    await axios.put(`http://localhost:4000/users/${id}`, changes);
    sessionStorage.clear('IAdopt_user');
    history.push('/home');
  }



  return (
    <>
      <Header />
      <div className="account-container">

        <form onSubmit={handleSubmit} className={"account-content"}>
          <span>
            <Navigation linkPath={'/home'} />
          </span>
          <input type="text" placeholder={organization} value={organization} onChange={e => setOrganization(e.target.value)} required />
          <input type="text" placeholder={firstName} value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder={lastName} value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="email" placeholder={email} value={email} onChange={e => setEmail(e.target.value)} required />

          <div className="account-buttons">
            <button type="submit">Save</button>
          </div>
          <Link to='/account/password'>Change password</Link>
        </form>
      </div>
    </>
  );
}
