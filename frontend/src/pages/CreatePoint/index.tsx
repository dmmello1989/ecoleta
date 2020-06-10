import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [success, setSuccess] = useState({
    map: '',
    modal: 'modal-hidden',
  });

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
      const ufSymbols = res.data.map(uf => uf.sigla);
      setUfs(ufSymbols);
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {
        const cityNames = res.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, [])

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  };

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  };

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ 
      ...formData,
      [name]: value
    });
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    };

    setSuccess({
      map: 'map-hidden',
      modal: 'modal'
    })

    await api.post('points', data);
  }

  return(
    <div id="page-create-point">
      <header>
        <Link to='/'>
          <img src={logo} alt="Ecoleta"/>
        </Link>

        <Link to='/'>
          <FiArrowLeft />
          Home
        </Link>

      </header>
      <form onSubmit={handleSubmit}>
        <h1>Register a<br/> collection point</h1>

        <fieldset>
          <legend>
            <h2>About</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Business Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="name">WhatsApp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <Map 
            className={success.map}
            center={initialPosition}
            zoom={15} 
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State</label>
              <select name="uf" id="uf" onChange={handleSelectedUf} value={selectedUf}>
                <option value="0">Select a State</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                <option value="0">Select a City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Items for collection</h2>
            <span>Select one or more items below</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li 
                key={item.id} 
                onClick={() => handleSelectedItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">
          Register Collection Point
        </button>
      </form>
      
      {/* Success Modal */}
      <div id="hide" className={success.modal}>
        <div className="content">
          <div className="left">
            <main>
              <h1>Success! The collection point has been registered.</h1>

              <Link to="/">
                <span>
                  <FiArrowLeft />
                </span>
                <strong>Return to Home</strong>
              </Link>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoint;