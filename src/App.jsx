import './styles/App.css';
import Header from './components/header';
import Hero from './components/Hero';
import Productos from './components/Productos';
import Footer from './components/Footer';




import Navbar from './components/Navbar';
import './App.css';
import Banner from './components/banner'; // tu nuevo componente



function App() {
  return (
    <div>
      <Navbar />

      {/* Acá vamos a poner el Hero con la imagen grande */}
      <Banner /> {/* Banner con la imagen grande y botón */}
      <Hero />
      <Productos />
      <Footer />

    </div>
  );
}

export default App;



