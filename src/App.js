import React from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LandPage from "./pages/LandPage/LandPage";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import ListaDeTarefas from "./pages/Home/ListadeTarefas";
import ListaDeProjetos from "./pages/Home/ListaDeProjetos";
import Calendario from "./pages/Calendario/Calendario";
import Projetos from "./pages/Projetos/Projetos"
import Config from "./pages/Config/Config"

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
    {
      path: "/calendario",
      element: <Calendario/>
    },
    {
      path: "/projetos",
      element: <Projetos/>
    },
    {
      path: "/config",
      element: <Config/>
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
