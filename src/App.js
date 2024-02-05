import React from "react";
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from "./Components/Home";
import Detail from "./Components/Detail";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} end/>
        <Route path="details/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
