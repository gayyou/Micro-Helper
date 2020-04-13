import React from 'react';
import './App.css';
import Layout from "./views/layout/Layout";
import DragIcon from "./components/dragIcon/DragIcon";

function App() {
  return (
    <>
      <DragIcon key="drag-icon"/>
      <Layout key="layout"/>
    </>
  );
}

export default App;
