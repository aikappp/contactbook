import React from "react";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navibar from "./components/Navibar";
import MainProvider from "./CONTEXTS/MainProvider";

const MyRoutes = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default MyRoutes;
