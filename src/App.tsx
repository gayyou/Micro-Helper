import React from 'react';
import './App.css';
import Layout from "./views/layout/Layout";
import DragIcon from "./components/dragIcon/DragIcon";
import MyPureCom from "./labs/pureComponent/MyPureCom";

function App() {
  return (
    <>
      <DragIcon key="drag-icon"/>
      <Layout key="layout"/>
      <MyPureCom/>
    </>
  );
}

export default App;
