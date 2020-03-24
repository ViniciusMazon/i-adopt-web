import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import {
  Modal,
  Content,
  Header,
  ImageUpload,
  Input,
  Select,
  Button,
  Footer,
  Container,
  ButtonNewPet,
  Table,
  TableHeaderColumn,
  TableHeaderRow,
  TableColum,
  TableRow,
  TableRowButton,
  Avatar
} from './styles';

import imageTemp from '../../assets/temp-avatar-dog.jpg';
import NavBar from '../../components/NavBar';
import SearchAndFilter from '../../components/SearchAndFilter';

function NewPet({ cancel, save }) {

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [name, setName] = useState('');
  const [price, setPrice] = useState()
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState('image here');
  const [organization_id, setOrganization_id] = useState();

  useEffect(() => {
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    setOrganization_id(decoded.payload.org_id);
  }, []);

  function handlerCancel() {
    cancel();
  }

  async function handlerSave() {

    const data = {
      name,
      specie,
      gender,
      size,
      price: price || 0,
      image,
      organization_id,
    }

    await save(data);
    cancel();
  }

  return (
    <Content>
      <Modal>
        <Header>New Pet</Header>
        <ImageUpload>
          <input type='file' />
        </ImageUpload>
        <Input>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} required />
        </Input>
        <Input>
          <label>Price</label>
          <input type='number' value={price} onChange={e => setPrice(e.target.value)} />
        </Input>
        <Select>
          <label>Specie</label>
          <select name="" id="" value={specie} onChange={e => setSpecie(e.target.value)} required>
            <option value=""></option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </Select>
        <Select>
          <label>Gender</label>
          <select name="" id="" value={gender} onChange={e => setGender(e.target.value)} required>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Select>
        <Select>
          <label>Size</label>
          <select name="" id="" value={size} onChange={e => setSize(e.target.value)} required>
            <option value=""></option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
          </select>
        </Select>
        <Footer>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerCancel}>Cancel</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerSave}>Save</Button>
        </Footer>
      </Modal>
    </Content>
  );
}

function EditPet({ cancel, save }) {

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState()
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState('image here');
  const [organization_id, setOrganization_id] = useState();

  function getDataStorage() {
    let dataPet = sessionStorage.getItem('petDataEdit');
    dataPet = JSON.parse(dataPet);
    return dataPet;
  }


  useEffect(() => {
    const { id, name, price, specie, gender, size, image, organization_id } = getDataStorage();
    setId(id);
    setName(name);
    setPrice(price);
    setSpecie(specie);
    setGender(gender);
    setSize(size);
    setImage(image);
    setOrganization_id(organization_id);
  }, []);

  function handlerCancel() {
    cancel();
    sessionStorage.removeItem('petDataEdit');
  }

  async function handlerSave() {

    const data = {
      id,
      name,
      specie,
      gender,
      size,
      price: price || 0,
      image,
      organization_id,
    }

    await save(data);
    cancel();
    sessionStorage.removeItem('petDataEdit');
  }

  return (
    <Content>
      <Modal>
        <Header>Edit Pet</Header>
        <ImageUpload>
          <input type='file' />
        </ImageUpload>
        <Input>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} required />
        </Input>
        <Input>
          <label>Price</label>
          <input type='number' value={price} onChange={e => setPrice(e.target.value)} />
        </Input>
        <Select>
          <label>Specie</label>
          <select name="" id="" value={specie} onChange={e => setSpecie(e.target.value)} required>
            <option value=""></option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </Select>
        <Select>
          <label>Gender</label>
          <select name="" id="" value={gender} onChange={e => setGender(e.target.value)} required>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Select>
        <Select>
          <label>Size</label>
          <select name="" id="" value={size} onChange={e => setSize(e.target.value)} required>
            <option value=""></option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
          </select>
        </Select>
        <Footer>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerCancel}>Cancel</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerSave}>Save</Button>
        </Footer>
      </Modal>
    </Content>
  );
}

export default function Pets() {

  const [pets, setPets] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  useEffect(() => {
    async function initPetPage() {
      const [, token] = token_bearer.split(' ');
      var decoded = jwt.decode(token, { complete: true });
      const response = await axios.get(`http://localhost:4000/pets?organization=${decoded.payload.org_id}`, {
        headers: { Authorization: token_bearer }
      });
      setPets(response.data);
    }

    initPetPage();
  }, []);


  function search(searchValue) {
    if (searchValue) {
      var searchResult = pets.filter(pet => pet.name.toLowerCase() === searchValue.toLowerCase());
      setFilteredResults(searchResult);
    } else {
      setFilteredResults([]);
    }
  }

  function filter(filters) {

    var result = [];

    if (filters.specie) {
      result.length !== 0 ? result = result.filter(pet => pet.specie === filters.specie) : result = pets.filter(pet => pet.specie === filters.specie);
    }

    if (filters.gender) {
      result.length !== 0 ? result = result.filter(pet => pet.gender === filters.gender) : result = pets.filter(pet => pet.gender === filters.gender);
    }

    if (filters.size) {
      result.length !== 0 ? result = result.filter(pet => pet.size === filters.size) : result = pets.filter(pet => pet.size === filters.size);
    }

    setFilteredResults(result);
  }

  async function createPet(petData) {
    const response = await axios.post('http://localhost:4000/pets', petData, {
      headers: { Authorization: token_bearer }
    });

    setPets([response.data, ...pets]);
  }

  function handlerEdit(petData) {
    sessionStorage.setItem('petDataEdit', JSON.stringify(petData));
    setIsEditing(true);
  }

  async function editPet(petData) {
    const response = await axios.put(`http://localhost:4000/pets`, petData, {
      headers: { Authorization: token_bearer }
    });

    const otherPets = pets.filter(pet => pet.id !== petData.id);

    setPets([response.data, ...otherPets]);
  }

  return (
    <Container>
      <NavBar />
      {
        isCreating ? <NewPet cancel={() => setIsCreating(false)} save={createPet} /> : null
      }
      {
        isEditing ? <EditPet cancel={() => setIsEditing(false)} save={editPet} /> : null
      }
      <SearchAndFilter searchFunction={search} filterFunction={filter} />
      <Table>
        <ButtonNewPet onClick={() => setIsCreating(true)}>Create new</ButtonNewPet>
        <TableHeaderColumn>
          <TableHeaderRow width={'8%'}>ID</TableHeaderRow>
          <TableHeaderRow width={'20%'}>Pet</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Specie</TableHeaderRow>
          <TableHeaderRow width={'15%'}>Gender</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Size</TableHeaderRow>
          <TableHeaderRow width={'12%'}>Price</TableHeaderRow>
          <TableHeaderRow width={'13%'}>Date</TableHeaderRow>
          <TableHeaderRow width={'16%'}>Action</TableHeaderRow>
        </TableHeaderColumn>
        {
          (filteredResults.length > 0 ? filteredResults : pets).map(pet => (
            <TableColum key={pet.id}>
              <TableRow width={'8%'}>{pet.id}</TableRow>
              <TableRow width={'20%'}>
                <Avatar src={imageTemp} />
                {pet.name}
              </TableRow>
              <TableRow width={'8%'}>{pet.specie}</TableRow>
              <TableRow width={'15%'}>{pet.gender}</TableRow>
              <TableRow width={'8%'}>{pet.size}</TableRow>
              <TableRow width={'12%'}>{pet.price === 0 ? 'Free' : pet.price}</TableRow>
              <TableRow width={'13%'}>{pet.creation_date.split('T')[0]}</TableRow >
              <TableRowButton width={'6%'} onClick={() => handlerEdit(pet)}>
                Edit <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
              </TableRowButton>
              <TableRowButton width={'10%'}>
                <Link to={`/pets/application/${pet.id}`}>
                  Application <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
                </Link>
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
    </Container>
  );
}
