import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadShoesAndHats() {
  const shoeResponse = await fetch('http://localhost:8080/api/shoes/');
  const hatResponse = await fetch('http://localhost:8090/api/hats/');

  if(shoeResponse.ok && hatResponse.ok) {
    const shoeData = await shoeResponse.json();
    const hatData = await hatResponse.json();
    root.render(
        <App shoes={shoeData.shoes} hats={hatData.hats} />
    );
  }
  else {
    console.log("ERROR!!!")
  }
}

loadShoesAndHats();