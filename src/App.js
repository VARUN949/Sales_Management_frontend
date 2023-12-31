import './App.css';
// import LoginForAll from "./components/Login/LoginForAll"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import MyProvider from './Context/MyProvider'
import OrderList from './components/Orders/OrdersList'
import ProductList from './components/Products/ProductList';
import Billing from './components/Billing/Billing';

function App() {
  return (
    <div className="bg-slate-700">
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login/*" element={<><Navbar /><Login /></>}></Route>
            <Route path="/signup/*" element={<><Navbar /><SignUp /></>}></Route>
            <Route path="/" element={<><Navbar /></>}></Route>
            <Route path="/order" element={<><Navbar /><OrderList /></>}></Route>
            <Route path="/Products" element={<><Navbar /><ProductList /></>}></Route>
            <Route path="/billing" element={<><Navbar /><Billing /></>}></Route>



          </Routes>
        </BrowserRouter>
      </MyProvider>

    </div>
  );
}

export default App;
