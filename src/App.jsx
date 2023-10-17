import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Game from './components/Game/Game';

function App() {
  const router = createBrowserRouter([
    { path: '/game/:name', element: <Game /> },
    { path: '/', element: <Welcome /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
