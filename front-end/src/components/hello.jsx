import React, { useState, useEffect } from 'react';

export const Hello = () => {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch('/api/')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => setInitialState(jsonResponse.hello));
  }, []);

  return (
    <div>
      {initialState.map((e) => (
        <li>{e}</li>
      ))}
    </div>
  );
};
