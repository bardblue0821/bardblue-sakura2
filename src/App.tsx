import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/footer';
import Illust from './illust/illust';
import Vrchat from './vrchat/vrchat';
import Bio from './bio/bio';
import Music from './music/Music';
import Video from './video/Video';
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
      <div className="flex-col">
        {show && (
          <Welcome fadeOut={fadeOut} handleTransitionEnd={handleTransitionEnd} />
        )}

        <header className="w-full h-[70px] flex items-center justify-center">
          <Header />
        </header>

        <main className="flex-1 h-[calc(100vh-140px)]">
          <Routes>
            <Route path="/" element={<Navigate to="/illust" replace />} />
            <Route path="/illust" element={<Illust />} />
            <Route path="/music" element={<Music />} />
            <Route path="/vrchat" element={<Vrchat />} />
            <Route path="/video" element={<Video />} />
            <Route path="/bio" element={<Bio />} />
          </Routes>
        </main>
        
        <footer className="w-full h-[70px] flex items-center justify-center">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
