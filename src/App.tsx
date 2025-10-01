import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';
import Illust from './illust/illust';
import Vrchat from './vrchat/vrchat';
import Bio from './bio/bio';
import Music from './music/music';
import Welcome from './welcome/Welcome';

function App() {
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (fadeOut) setShow(false);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen min-w-full">
        {show && (
          <Welcome fadeOut={fadeOut} handleTransitionEnd={handleTransitionEnd} />
        )}

        <header className="absolute top-0 left-0 w-full h-[70px] flex items-center justify-center">
          <Header />
        </header>

        <main className="w-full h-full flex-1 flex items-center">
          <Routes>
            <Route path="/" element={<Navigate to="/illust" replace />} />
            <Route path="/illust" element={<Illust />} />
            <Route path="/music" element={<Music />} />
            <Route path="/vrchat" element={<Vrchat />} />
            <Route path="/bio" element={<Bio />} />
          </Routes>
        </main>
        
        <footer className="absolute bottom-0 left-0 w-full h-[70px] flex items-center justify-center">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
