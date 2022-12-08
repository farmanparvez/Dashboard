import { useContext, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthContext from "./AuthContext";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { axiosRequest } from "./utils/request";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Home from "./Components/Home"
import Homepage from "./Components/Homepage"

function App() {
  const { isLogedIn, hello, login } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/dish/:id" element={<Home/>} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
