import React from 'react';
import Welcome from './components/Welcome/Welcome';
import Game from './components/Game/Game';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([{ path: '/', element: <Welcome /> }, {path: '/games/waldo', element: <Game/>}]);

  return <RouterProvider router={router} />;
}

export default App;
