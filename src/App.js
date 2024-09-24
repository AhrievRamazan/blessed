import React from "react";

import {About, Footer, Header, Skills, Testimonial, Work} from './container'
import { Navbar } from "./components";
import './App.scss'

export const App = () => {
  return  (
    <div className="app">
        <Navbar/>
        <Header></Header>
        <About></About>
        <Work></Work>
        <Skills></Skills>
        <Testimonial></Testimonial>
        <Footer></Footer>
    </div>
  )
};

export default App;
