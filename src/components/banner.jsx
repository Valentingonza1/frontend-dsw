import React, { useState } from 'react';
import './Banner.css';
import banner1 from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg'; // Asegurate de tener 2 o 3 imágenes

const slides = [
  {
    image: banner1,
    title: 'Variedad de cortes y productos',
    text: 'Contamos con una amplia variedad de cortes, embutidos y productos de excelentísima calidad para tu disfrute.'
  },
  {
    image: banner2,
    title: 'Carnes argentinas',
    text: 'Venta minorista de Carnes de primera calidad'
  },
  {
    image: banner3,
    title: 'Realiza tu pedido',
    text: 'Hace tu pedido y lo retiras directamente en el local, contamos con todos los medios de pago.'
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const nextSlide = () => {
    setCurrent((current + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + total) % total);
  };

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${slides[current].image})` }}
    >
      <div className="banner-content">
        <h1>{slides[current].title}</h1>
        <p>{slides[current].text}</p>
        <a href="#productos">
          <button className="banner-btn">Ver productos</button>
        </a>
      </div>
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <button className="arrow right" onClick={nextSlide}>›</button>
      </div>
  );
};  

export default Banner;
