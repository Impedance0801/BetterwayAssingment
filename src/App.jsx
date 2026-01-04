
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home"
import Cart  from "./pages/Cart"

const App = () => {
  return(
    <div>
     
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Cart" element={<Cart/>} ></Route>
      </Routes>
    </div>
  );
};

export default App;
