import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import Calendario from "./pages/Calendario/Calendario";
import Projetos from "./pages/Projetos/Projetos";
import Config from "./pages/Config/Config";
import MenuProjeto from "./pages/MenuProjeto/MenuProjeto"
import LandingPage from "./pages/LandPage/LandingPage"
import "@fontsource/montserrat";
import "./App.css";


function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/calendario",
      element: <Calendario />,
    },
    {
      path: "/projetos",
      element: <Projetos />,
    },
    {
      path: "/config",
      element: <Config />,
    },
    {
      path: "/menuprojeto",
      element: <MenuProjeto/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
