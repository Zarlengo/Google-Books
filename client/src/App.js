import React from "react";
import Router from './components/router';
import { BookContextProvider } from "./utils/BookContext";

import './App.css';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Router />
      </BookContextProvider>
    </div>
  );
}


export default App;
