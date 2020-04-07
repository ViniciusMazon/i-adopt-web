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
  Avatar,
  ConfirmationBox
} from './styles';

import ImageUpload from '../../components/ImageUpload';
import ImagePreview from '../../components/ImagePreview';
import Alert from '../../components/Alert';
import NavBar from '../../components/NavBar';
import SearchAndFilter from '../../components/SearchAndFilter';

function NewPet({ onCancel, onSave }) {

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [name, setName] = useState('');
  const [price, setPrice] = useState()
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [organization_id, setOrganization_id] = useState();
  const [image, setImage] = useState([]);

  useEffect(() => {
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    setOrganization_id(decoded.payload.org_id);
  }, []);

  function handlerCancel() {
    onCancel();
  }

  async function handlerSave() {

    const dataPet = {
      name,
      specie,
      gender,
      size,
      price: price || 0,
      organization_id,
    }

    await onSave(image, dataPet);
    onCancel();
  }

  function handleUploadImage(files) {

    const filesData = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImage({ ...filesData[0] });
  }


  return (
    <Content>
      <Modal>
        <Header>New Pet</Header>
        {
          image.length === 0 ? <ImageUpload onUpload={handleUploadImage} /> : <ImagePreview src={image.preview} onRemoveImage={() => setImage([])} />
        }

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
        <ConfirmationBox/>
        <Footer>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerCancel}>Cancel</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerSave}>Save</Button>
        </Footer>
      </Modal>
    </Content>
  );
}

function EditPet({ cancel, save, onChangeImage, onDelete }) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [specie, setSpecie] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [idImage, setIdImage] = useState(0);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    function getDataStorage() {
      let dataPet = sessionStorage.getItem('petDataEdit');
      dataPet = JSON.parse(dataPet);
      return dataPet;
    }

    const { id, name, specie, gender, size, price, id_image, url } = getDataStorage();
    setId(id);
    setName(name);
    setSpecie(specie);
    setGender(gender);
    setPrice(price);
    setIdImage(id_image)
    setSize(size);
    setUrl(url);
  }, []);

  useEffect(() => {
    if (image.length !== 0) {
      setUrl(image.preview);
    }
  }, [image]);


  function handlerCancel() {
    cancel();
    sessionStorage.removeItem('petDataEdit');
  }

  function handleUploadImage(files) {

    const filesData = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImage({ ...filesData[0] });
  }

  async function handlerSave() {

    let new_id_image = 0;

    if (image.length !== 0) {
      new_id_image = await onChangeImage(image, idImage);
    }

    const data = {
      id,
      name,
      specie,
      gender,
      size,
      price: price || 0,
      id_image: new_id_image === 0 ? idImage : new_id_image,
      url
    }

    await save(data);
    cancel();
    sessionStorage.removeItem('petDataEdit');
  }

  async function handlerDelete() {
    setIsDeleting(true);
    await onDelete(id);
    cancel();
  }

  return (
    <Content>
      <Modal>
        <Header>Edit Pet</Header>
        {
          url.length === 0 ? <ImageUpload onUpload={handleUploadImage} /> : <ImagePreview src={url} onRemoveImage={() => setUrl('')} />
        }
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
        <ConfirmationBox>
          {
            isDeleting ? (
              <>
                Are you sure you want to delete this record?
                <Button color={'#666'} colorHover={'#F67280'} onClick={() => setIsDeleting(false)}>No</Button>
                <Button color={'#666'} colorHover={'#F67280'} onClick={handlerDelete}>Yes</Button>
              </>
            ) : null
          }
        </ConfirmationBox>
        <Footer>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerCancel}>Cancel</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={() => setIsDeleting(true)}>Delete</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerSave}>Save</Button>
        </Footer>
      </Modal>
    </Content>
  );
}

export default function Pets() {

  const [pets, setPets] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  useEffect(() => {
    async function initPetPage() {
      const [, token] = token_bearer.split(' ');
      var decoded = jwt.decode(token, { complete: true });
      const response = await axios.get(`http://localhost:4000/pets?organization_id=${decoded.payload.org_id}`, {
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

  async function uploadImage(image) {
    const imageData = new FormData();
    imageData.append('file', image.file);

    const image_response = await axios.post('http://localhost:4000/petsimage', imageData);
    return image_response.data.id;
  }

  async function destroyImage(id) {
    await axios.delete(`http://localhost:4000/petsimage?id=${id}`);
  }

  async function uploadData(fullData) {
    const response = await axios.post('http://localhost:4000/pets', fullData, {
      headers: { Authorization: token_bearer }
    });

    return response;
  }

  async function createPet(image, petData) {

    const id_image = await uploadImage(image);

    const fullData = { ...petData, id_image };

    const response = await uploadData(fullData);
    setPets([response.data, ...pets]);

    setAlertInfo({
      type: 'success',
      message: 'Pet successfully registered'
    });
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);
    }, 3000);
  }

  function handlerEdit(petData) {
    sessionStorage.setItem('petDataEdit', JSON.stringify(petData));
    setIsEditing(true);
  }

  async function editImage(image, id_old_image) {
    const response = await uploadImage(image);
    await destroyImage(id_old_image);
    return response
  }

  async function editPet(petData) {

    const response = await axios.put(`http://localhost:4000/pets`, petData, {
      headers: { Authorization: token_bearer }
    });

    const otherPets = pets.filter(pet => pet.id !== petData.id);

    setPets([response.data, ...otherPets]);
    setAlertInfo({
      type: 'success',
      message: 'Pet successfully edited'
    });
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);
    }, 3000);
  }

  async function deletePet(id) {
    await axios.delete(`http://localhost:4000/pets?id=${id}`, {
      headers: { Authorization: token_bearer }
    });

    setPets(pets.filter(pet => pet.id !== id));
  }

  return (
    <Container>
      <NavBar />
      {
        isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
      }
      {
        isCreating ? <NewPet onCancel={() => setIsCreating(false)} onSave={createPet} /> : null

      }
      {
        isEditing ? <EditPet cancel={() => setIsEditing(false)} save={editPet} onChangeImage={editImage} onDelete={deletePet} /> : null
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
          {console.log(pets)}
        </TableHeaderColumn>
        {
          (filteredResults.length > 0 ? filteredResults : pets).map(pet => (
            <TableColum key={pet.id}>
              <TableRow width={'8%'}>{pet.id}</TableRow>
              <TableRow width={'20%'}>
                <Avatar src={pet.url} />
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
