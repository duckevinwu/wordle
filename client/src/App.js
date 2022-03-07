import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Game from './components/Game';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
