import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';

const CreatePoint = () => {
  return(
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to='/'>
          <FiArrowLeft />
          Home
        </Link>

      </header>
      <form action="">
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
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="name">WhatsApp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State</label>
              <select name="uf" id="uf">
                <option value="0">Select a State</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a City</option>
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
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
            <li className="selected">
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
              <span>Lamps</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">
          Register Collection Point
        </button>
      </form>
    </div>
  );
};

export default CreatePoint;

// 1:10:00