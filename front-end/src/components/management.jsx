import React, { useState, useEffect } from 'react';
import '../styles/management.css';

export const Management = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch('/management', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const { data } = await response.json();
      setList(data);
      return data;
    }
    getData();
  }, []);

  return (
    <div className={'management-mainContainer'}>
      <div className={'tableContainer'}>
        <div className={'tableHead'}>
          <div className={'col-1'}>Nombre completo</div>
          <div className={'col-2'}> Invitaciones</div>
          <div className={'col-3'}>Total recibido $</div>
        </div>
        {list &&
          list.map(({ name, invitations }) => (
            <div className={'tableRow'} key={name}>
              <div className={'col-1'}>{name}</div>
              <div className={'col-2'}>{invitations}</div>
              <div className={'col-3'}>
                {Number(invitations * 5000).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
