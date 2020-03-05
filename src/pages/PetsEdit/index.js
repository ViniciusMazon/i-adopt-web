import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCat, faDog, faMars, faVenus, faRulerVertical, faEraser } from '@fortawesome/free-solid-svg-icons'


import './style.css';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export default function PetsEdit({ match }) {

  let history = useHistory();
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('')
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [avatar, setAvatar] = useState('');
  const [date, setDate] = useState('');
  const [organization, setOrganization] = useState('');
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    async function petEditInit() {
      const response = await axios.get(`http://localhost:4000/pets/${match.params.id}`)
      const data = response.data;
      setId(data.id);
      setName(data.name);
      setPrice(data.price);
      setSpecie(data.specie);
      setGender(data.gender);
      setSize(data.size);
      setAvatar(data.avatar);
      setOrganization(data.organization);
      setDate(data.date);
    }

    petEditInit();

  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const changes = {
      id,
      name,
      price,
      specie,
      gender,
      size,
      avatar,
      organization,
      date,
    }

    await axios.put(`http://localhost:4000/pets/${id}`, changes);
    history.push('/pets');
  }

  function confirmDelete() {
    setModalDelete(!modalDelete);
  }

  async function handleDelete(e) {
    e.preventDefault();
    await axios.delete(`http://localhost:4000/pets/${id}`);
    history.push('/pets');
  }

  return (
    <>
      {
        !modalDelete ? null : (
          <div className="modalDelete-container">
            <div className="modalDelete-content">
              <p><FontAwesomeIcon icon={faExclamationCircle} className="modalDelete-icon" />Are you sure you want to delete the card from {name}?</p>
              <span>
                <button onClick={confirmDelete}>No</button>
                <button onClick={handleDelete}>Yes</button>
              </span>
            </div>
          </div>
        )
      }

      <Header />
      <div className="petsEdit-container">

        <form onSubmit={handleSubmit} className={"petsEdit-content"}>

          <span>
            <Navigation linkPath={'/pets'} />
            <button type="button" onClick={confirmDelete} className="petsEdit-delete">
              <FontAwesomeIcon icon={faEraser} className="deleteIcon" />
            </button>
          </span>

          <div id="aqui-vai-foto"></div>

          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} content={name} />
          <input type="text" placeholder="Price. Leave it blank to indicate it's free" value={price} onChange={e => setPrice(e.target.value)} />

          <div className="petsEdit-options">
            <p>Specie</p>
            <div>
              <input type="radio" id="specie-dog" name="specie" value={"dog"} onChange={e => setSpecie(e.target.value)} checked={specie === 'dog' ? true : false} />
              <FontAwesomeIcon icon={faDog} className="petsEdit-icon" />
              <label htmlFor="specie-dog">Dog</label>

              <input type="radio" id="specie-cat" name="specie" value={"cat"} onChange={e => setSpecie(e.target.value)} checked={specie === 'cat' ? true : false} />
              <FontAwesomeIcon icon={faCat} className="petsEdit-icon" />
              <label htmlFor="specie-cat">Cat</label>
            </div>

            <p>Gender</p>
            <div>
              <input type="radio" id="gender-female" name="gender" value={"female"} onChange={e => setGender(e.target.value)} checked={gender === 'female' ? true : false} />
              <FontAwesomeIcon icon={faVenus} className="petsEdit-icon" />
              <label htmlFor="gender-female">Female</label>

              <input type="radio" id="gender-male" name="gender" value={"male"} onChange={e => setGender(e.target.value)} checked={gender === 'male' ? true : false} />
              <FontAwesomeIcon icon={faMars} className="petsEdit-icon" />
              <label htmlFor="gender-male">Male</label>
            </div>

            <p>Size</p>
            <div>
              <input type="radio" id="size-small" name="size" value={"small"} onChange={e => setSize(e.target.value)} checked={size === 'small' ? true : false} />
              <FontAwesomeIcon icon={faRulerVertical} className="petsEdit-icon" />
              <label htmlFor="size-small">Small</label>

              <input type="radio" id="size-medium" name="size" value={"medium"} onChange={e => setSize(e.target.value)} checked={size === 'medium' ? true : false} />
              <FontAwesomeIcon icon={faRulerVertical} className="petsEdit-icon" />
              <label htmlFor="size-medium">Medium</label>

              <input type="radio" id="size-big" name="size" value={"big"} onChange={e => setSize(e.target.value)} checked={size === 'big' ? true : false} />
              <FontAwesomeIcon icon={faRulerVertical} className="petsEdit-icon" />
              <label htmlFor="size-big">Big</label>
            </div>
          </div>

          <div className="petsEdit-buttons">
            <button type="submit">Save</button>
          </div>

        </form>

      </div>
    </>
  );
}
