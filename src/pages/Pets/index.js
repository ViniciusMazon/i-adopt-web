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
  ConfirmationBox,
  AlertZone
} from './styles';

import ImageUpload from '../../components/ImageUpload';
import ImagePreview from '../../components/ImagePreview';
import Alert from '../../components/Alert';
import NavBar from '../../components/NavBar';
import SearchAndFilter from './components/SearchAndFilter';
import Pagination from '../../components/Pagination';

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
        <ConfirmationBox />
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

    var newIdImage = 0;

    if (image.length !== 0) {
      newIdImage = await onChangeImage(image, idImage);
    }

    const data = {
      id,
      name,
      specie,
      gender,
      size,
      price: price || 0,
      id_image: newIdImage === 0 ? idImage : newIdImage.id
    }

    await save(data);
    cancel();
    sessionStorage.removeItem('petDataEdit');
  }

  async function handlerDelete() {
    setIsDeleting(true);
    await onDelete(id);
    cancel();
    sessionStorage.removeItem('petDataEdit');
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

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    specie: "'dog', 'cat'",
    gender: "'male', 'female'",
    size: "'small','medium','big'"
  });
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function initPetPage() {
      const [, token] = token_bearer.split(' ');
      var decoded = jwt.decode(token, { complete: true });
      const response = await axios.get(`http://localhost:4000/pets?organization_id=${decoded.payload.org_id}&page=${currentPage}&specie=${filters.specie}&gender=${filters.gender}&size=${filters.size}`, {
        headers: { Authorization: token_bearer }
      });
      const { pets, total } = response.data;
      setPets(pets);
      setTotalPage(total);

    }

    initPetPage();
  }, []);

  async function nextPage(page) {
    setCurrentPage(page);
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/pets?organization_id=${decoded.payload.org_id}&page=${page}&specie=${filters.specie}&gender=${filters.gender}&size=${filters.size}`, {
      headers: { Authorization: token_bearer }
    });
    const { pets, total } = response.data;
    setPets(pets);

  }

  async function resetSearch() {
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/pets?organization_id=${decoded.payload.org_id}&page=${currentPage}&specie=${filters.specie}&gender=${filters.gender}&size=${filters.size}`, {
      headers: { Authorization: token_bearer }
    });
    const { pets, total } = response.data;
    setPets(pets);
    setTotalPage(total);
  }

  async function search(pet_id, pet_name) {
    const response = await axios.get(`http://localhost:4000/pets/details?id=${pet_id}&name=${pet_name}`, {
      headers: { Authorization: token_bearer }
    });
    const pets = response.data;
    setPets(pets);
    setTotalPage(0);
  }

  async function filter(filters) {

    setFilters(filters);
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/pets?organization_id=${decoded.payload.org_id}&page=${currentPage}&specie=${filters.specie}&gender=${filters.gender}&size=${filters.size}`, {
      headers: { Authorization: token_bearer }
    });
    const { pets, total } = response.data;
    setPets(pets);
    setTotalPage(total);
  }

  async function uploadImage(image) {
    const imageData = new FormData();
    imageData.append('file', image.file);

    const image_response = await axios.post('http://localhost:4000/petsimage', imageData, {
      headers: { Authorization: token_bearer }
    });
    return image_response.data;
  }

  async function destroyImage(id) {
    await axios.delete(`http://localhost:4000/petsimage?id=${id}`, {
      headers: { Authorization: token_bearer }
    });
  }

  async function uploadData(fullData) {
    const response = await axios.post('http://localhost:4000/pets', fullData, {
      headers: { Authorization: token_bearer }
    });

    return response;
  }

  async function createPet(image, petData) {

    const { id: id_image, url } = await uploadImage(image);

    const fullData = { ...petData, id_image };

    const response = await uploadData(fullData);
    const { id, name, specie, gender, size, price, organization_id, creation_date } = response.data;
    const newPet = {
      id,
      name,
      specie,
      gender,
      size,
      price,
      id_image,
      organization_id,
      creation_date,
      url
    }
    setPets([newPet, ...pets]);

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

    const newPet = await axios.get(`http://localhost:4000/pets/details?id=${response.data.id}`, {
      headers: { Authorization: token_bearer }
    });

    const otherPets = pets.filter(pet => pet.id !== petData.id);

    setPets([newPet.data[0], ...otherPets]);
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

    setAlertInfo({
      type: 'success',
      message: 'Pet successfully deleted'
    });
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);
    }, 3000);
  }

  return (
    <Container>
      <NavBar active={'pets'} />
      <AlertZone>
        {
          isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
        }
      </AlertZone>
      {
        isCreating ? <NewPet onCancel={() => setIsCreating(false)} onSave={createPet} /> : null

      }
      {
        isEditing ? <EditPet cancel={() => setIsEditing(false)} save={editPet} onChangeImage={editImage} onDelete={deletePet} /> : null
      }
      <SearchAndFilter searchFunction={search} resetSearch={resetSearch} filterFunction={filter} />
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
          pets.map(pet => (
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
              <TableRowButton width={'16%'} onClick={() => handlerEdit(pet)}>
                Edit <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
      <Pagination numberOfPages={Array.from(Array(totalPage).keys())} selectPage={nextPage} active={currentPage - 1} />
    </Container>
  );
}
