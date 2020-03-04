import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faDog, faMars, faVenus, faRulerVertical, faFileUpload } from '@fortawesome/free-solid-svg-icons'


import './style.css';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export default function PetsCreate() {

  let history = useHistory();

  const [id, setId] = useState(parseInt(Date.now()));
  const [name, setName] = useState('');
  const [price, setPrice] = useState('')
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [avatar, setAvatar] = useState();
  const [date, setDate] = useState('');


  useEffect(() => {
    const dNow = new Date();
    const year = dNow.getFullYear()
    const month = dNow.getMonth()
    const day = dNow.getDate()
    setDate(`${year}-${month + 1}-${day}`)
  }, []);

  async function handleAvatar(e) {}

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      id,
      name,
      price,
      specie,
      gender,
      size,
      avatar,
      date,
    }

    await axios.post('http://localhost:4000/pets', data);
    history.push('/pets');
  }

  return (
    <>
      <Header />
      <div className="petsCreate-container">
        <form onSubmit={handleSubmit}>
          <Navigation linkPath={'/pets'} />

          <div className="image-upload">
            <FontAwesomeIcon icon={faFileUpload} id="icon-image-upladod" />
            <input type="file" accept='image/*' name="upload" webkitdirectory onChange={handleAvatar} />
            <p>Choose the best photo</p>
          </div>

          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
          <input type="text" placeholder="Price. Leave it blank to indicate it's free" value={price} onChange={e => setPrice(e.target.value)} />

          <div className="petsCreate-options">
            <p>Specie</p>
            <div>
              <input type="radio" id="specie-dog" name="specie" value={"dog"} onChange={e => setSpecie(e.target.value)} required/>
              <FontAwesomeIcon icon={faDog} className="petsCreate-icon" />
              <label htmlFor="specie-dog">Dog</label>


              <input type="radio" id="specie-cat" name="specie" value={"cat"} onChange={e => setSpecie(e.target.value)} required/>
              <FontAwesomeIcon icon={faCat} className="petsCreate-icon" />
              <label htmlFor="specie-cat">Cat</label>
            </div>

            <p>Gender</p>
            <div>

              <input type="radio" id="gender-female" name="gender" value={"female"} onChange={e => setGender(e.target.value)} required/>
              <FontAwesomeIcon icon={faVenus} className="petsCreate-icon" />
              <label htmlFor="gender-female">Female</label>

              <input type="radio" id="gender-male" name="gender" value={"male"} onChange={e => setGender(e.target.value)} required/>
              <FontAwesomeIcon icon={faMars} className="petsCreate-icon" />
              <label htmlFor="gender-male">Male</label>

            </div>

            <p>Size</p>
            <div>

              <input type="radio" id="size-small" name="size" value={"small"} onChange={e => setSize(e.target.value)} required/>
              <FontAwesomeIcon icon={faRulerVertical} className="petsCreate-icon" />
              <label htmlFor="size-small">Small</label>

              <input type="radio" id="size-medium" name="size" value={"medium"} onChange={e => setSize(e.target.value)} required/>
              <FontAwesomeIcon icon={faRulerVertical} className="petsCreate-icon" />
              <label htmlFor="size-medium">Medium</label>


              <input type="radio" id="size-big" name="size" value={"big"} onChange={e => setSize(e.target.value)} required/>
              <FontAwesomeIcon icon={faRulerVertical} className="petsCreate-icon" />
              <label htmlFor="size-big">Big</label>
            </div>
          </div>

          <div className="petsCreate-buttons">
            <button type="submit">Create</button>
          </div>

        </form>
      </div>
    </>
  );
}
