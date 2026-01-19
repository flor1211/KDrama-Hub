import './css/App.css';
import About from './pages/About';
import DramaDetails from './pages/DramaDetails';
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { DramaProvider } from './context/DramaContext';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


function App() {
  return (
    <DramaProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/drama/:id" element={<DramaDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </DramaProvider>

  )
}


export default App;
