import React from 'react';
import './Banner.css';
import bannerImage from '../assets/banner.jpg'; // asegurate que este path sea correcto

const Banner = () => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        paddingLeft: '4rem'
      }}
    >
      <div>
        <h1>Variedad de cortes y productos</h1>
        <p>
          Contamos con una amplia variedad de cortes, embutidos y productos de
          excelentísima calidad para tu disfrute.
        </p>
        <a href="#productos">
          <button className="banner-btn">Ver productos</button>
        </a>
      </div>
    </div>
  );
};

export default Banner;
