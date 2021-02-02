import React, { useRef, useState } from "react";
import Unform from "./components/Unform";
import logo from "./logo.svg";
import "./styles.css";
import "./settings/yup-locale";
import HookForm from "./components/HookForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Forms test usage</h1>
      </header>

      <main>
        <Unform />

        <HookForm />
      </main>
    </div>
  );
};

export default App;
