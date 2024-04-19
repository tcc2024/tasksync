import React from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LandPage from "./pages/LandPage/LandPage";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import ListaDeTarefas from "./pages/Home/ListadeTarefas";
import ListaDeProjetos from "./pages/Home/ListaDeProjetos";

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
      element: <ListaDeTarefas/>, 
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
