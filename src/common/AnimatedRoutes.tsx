import React from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Illust from '../illust/illust';
import Music from '../music/music';
import Vrchat from '../vrchat/vrchat';
import Bio from '../bio/bio';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={700}
      >
        <div className="w-full h-full">
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/illust" replace />} />
            <Route path="/illust" element={<Illust />} />
            <Route path="/music" element={<Music />} />
            <Route path="/vrchat" element={<Vrchat />} />
            <Route path="/bio" element={<Bio />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;
