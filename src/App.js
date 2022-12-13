import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MyCategories from "./components/MyCategories/MyCategories";
import NewCategory from "./components/NewCategory/NewCategory";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route index element={<MyCategories title="My categories" />} />
          <Route
            path={"newcategory"}
            element={<NewCategory title="New category" />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
