import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import List from "./pages/list.jsx";
// import './App.css'

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </>
  );
}         