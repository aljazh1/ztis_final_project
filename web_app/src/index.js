import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import Header from "./Routes/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Products from "./Routes/Products";
import Product from "./Components/Product";
import Order from "./Routes/Order";
import Orders from "./Routes/Orders";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateProduct from "./Routes/CreateProduct";


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header/>
                {/*Pot iz Header.js se pretvori v ustrezno komponento*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/products" element={<Products/>}></Route>
                    <Route path="/product" element={<Product/>}></Route>
                    <Route path="/order" element={<Order/>}></Route>
                    <Route path="/orders" element={<Orders/>}></Route>
                    <Route path="/create_product" element={<CreateProduct/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
