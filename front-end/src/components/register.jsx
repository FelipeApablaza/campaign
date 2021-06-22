import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/register.css';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAdress] = useState('');
  const [gender, setGender] = useState('');
  const [key] = useState(useParams().key);
  const [status, setStatus] = useState(undefined);

  const onClickHandler = async () => {
    if (!(email && name && address && gender && key)) {
      return setStatus('¡Faltan datos!');
    }
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        address,
        gender,
        key,
      }),
    });

    const { status } = await response.json();
    if (status === 'success') {
      setStatus('¡Usuario registrado exitosamente!');
    } else if (status === 'already used') {
      setStatus('¡Esta invitación ya fue utilizada!');
    } else {
      setStatus('¡Invitación invalida!');
    }
  };

  return (
    <div className={'register-mainContainer'}>
      <div className={'formContainer'}>
        <div className={'title'}></div>
        <div className={'inputContainer'}>
          <input
            placeholder="Nombrer completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
          />
          <select
            name="cars"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Sexo
            </option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>
        <div className={'submitContainer'} onClick={onClickHandler}>
          <div className={'submitText'}>REGISTRARSE</div>
        </div>
        <div className={'urlContainer'}>
          <div>{status}</div>
        </div>
      </div>
    </div>
  );
};
