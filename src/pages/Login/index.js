import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import passwordValidator from 'password-validator';

import {
  Container,
  SideBackground,
  Content,
  Navigation,
} from './styles';

import logo from '../../assets/logo.png';
import background from '../../assets/bg.png';
import Alert from '../../components/Alert';

function SingUp({ back, onSuccessfulRegistration }) {

  const [organizationList, setOrganizationList] = useState([]);
  const [organization_id, setOrganization_id] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

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
      setAlertInfo({
        type: 'alert',
        message: 'Weak password'
      });

      return false;
    }

    if (password !== passwordConfirm) {
      setAlertInfo({
        type: 'alert',
        message: 'Passwords are not the same'
      });

      return false;
    }

    if (email !== emailConfirm) {
      setAlertInfo({
        type: 'alert',
        message: 'Emails are not the same'
      });

      return false;
    }

    if (terms === false) {
      setAlertInfo({
        type: 'alert',
        message: 'You need to accept the terms to continue'
      });

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

    const validatorResult = await validator(data)

    if (validatorResult) {
      await axios.post("http://localhost:4000/users", data);

      back();
      onSuccessfulRegistration();
    } else {

      setIsAlerting(true);
      setTimeout(() => {
        setIsAlerting(false);

      }, 3000);
    }
  }

  function goToLogin() {
    back();
  }

  return (
    <Content>
      {
        isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
      }
      <form onSubmit={handleSubmit}>
        <Navigation onClick={goToLogin}>
          <FontAwesomeIcon icon={faArrowLeft} color={'#F67280'} />
        </Navigation>
        <select onChange={e => setOrganization_id(e.target.value)}>
          <option value="">Organization</option>
          {
            organizationList.map(org => (
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
    </Content>
  );
}

export default function Login() {

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
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

  function successfulRegistrationAlert() {
    setAlertInfo({
      type: 'success',
      message: 'Successful registration'
    });
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);

    }, 3000);
  }

  return (

    <Container>
      <SideBackground src={background} />
      {
        isRegistering ? <SingUp back={() => setIsRegistering(false)} onSuccessfulRegistration={successfulRegistrationAlert} /> : (
          <Content>
            {
              isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
            }
            <form>
              <img src={logo} />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={auth}>Ok</button>
            </form>
            <Navigation position={'center'} onClick={() => setIsRegistering(true)}>Don't have an account?</Navigation>
          </Content>
        )
      }
    </Container >
  );
}
