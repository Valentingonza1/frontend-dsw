import React, { useState, useEffect } from 'react';
import './Banner.css';
import banner1 from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const nextSlide = () => {
    setCurrent((current + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + total) % total);
  };

  return (
    <div className="banner-container">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="banner"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="banner-content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <a href="#productos">
                <button className="banner-btn">Ver productos</button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow left" onClick={prevSlide}>
        ‹
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};

export default Banner;
