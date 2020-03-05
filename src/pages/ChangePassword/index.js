import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Navigation from '../../components/Navigation';

export default function ChangePassword() {

  let history = useHistory();

  const [id, setId] = useState('');
  const [organization, setOrganization] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('IAdopt_user'));

    setId(user.id);
    setOrganization(user.organization);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email)
    setPassword(user.password);
  }, []);

  function validator() {
    if(oldPassword === password) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const changes = {
      id,
      organization,
      first_name: firstName,
      last_name: lastName,
      email,
      password: passwordConfirm
    }

    if (validator()) {
      await axios.put(`http://localhost:4000/users/${id}`, changes);
      history.push('/account');
    } else {
      //return error message
    }
  }

  return (
      <div className="accountPassword-container">
        <form onSubmit={handleSubmit} className={"accountPassword-content"}>
          <span>
            <Navigation linkPath={'/account'} />
          </span>
          <input type="password" placeholder='Old password' value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
          <input type="password" placeholder='New password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />

          <div className="accountPassword-buttons">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
  );
}

