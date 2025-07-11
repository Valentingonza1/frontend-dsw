import React, { useState } from 'react';
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
    text: 'Venta minorista de carnes de primera calidad.'
  },
  {
    image: banner3,
    title: 'Realiza tu pedido',
    text: 'Haz tu pedido y retíralo directamente en el local. Contamos con todos los medios de pago.'
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('right');

  const nextSlide = () => {
    setDirection('right');
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="banner-container">
      {slides.map((slide, index) => {
        let className = 'banner';
        if (index === current) {
          className += ` active ${direction === 'right' ? 'enter-right' : 'enter-left'}`;
        } else {
          className += ` ${direction === 'right' ? 'exit-left' : 'exit-right'}`;
        }

        return (
          <div key={index} className={className}>
            <img src={slide.image} alt={`slide-${index}`} />
            <div className="banner-content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <a href="#productos">
                <button className="banner-btn">Ver productos</button>
              </a>
            </div>
          </div>
        );
      })}
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <button className="arrow right" onClick={nextSlide}>›</button>
    </div>
  );
};

export default Banner;
