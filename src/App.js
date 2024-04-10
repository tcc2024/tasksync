import React from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LandPage from "./pages/LandPage/LandPage";
import Cadastrar from "./pages/Cadastrar/Cadastrar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LandPage />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
