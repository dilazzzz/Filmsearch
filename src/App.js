import React from "react";
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Banner from "./Components/Banner/Banner";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Banner />
            <Header />
            <Content />
        </div>
      </BrowserRouter>
  );
}

export default App;
