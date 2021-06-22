import React, { useState } from 'react';
import '../styles/share.css';

export const Share = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState(undefined);

  const onClickHandler = async () => {
    const response = await fetch('/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
      }),
    });

    const { status, link } = await response.json();
    if (status === 'not found') {
      setUrl('¡Este usuario no existe!');
    } else {
      setUrl(link);
    }
  };

  return (
    <div className={'share-mainContainer'}>
      <div className={'formContainer'}>
        <div className={'inputContainer'}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={'submitContainer'} onClick={onClickHandler}>
          <div className={'submitText'}>COMPARTIR</div>
        </div>
        <div className={'urlContainer'}>
          <div>{url}</div>
        </div>
      </div>
    </div>
  );
};
