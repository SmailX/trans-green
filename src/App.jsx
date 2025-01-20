import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Index from './components/Index/Index';
import Shop from './components/Shop/Shop';
import SelectionOfCharging from './components/selectionOfCharging/selectionOfCharging';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/Cart/Cart';
import './App.css';

const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true); // Флаг для отслеживания первого рендера

  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  useEffect(() => {
    if (isFirstRender.current) {
      const lastPath = localStorage.getItem('lastPath');
      if (lastPath && lastPath !== location.pathname) {
        navigate(lastPath);
      }
      isFirstRender.current = false; // Установить флаг в false после первого рендера
    }
  }, [navigate, location.pathname]);

  return null;
};

const App = () => {
  return (
    <CartProvider>
    <Router>
      <Header />
      <RouteHandler />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/SelectionOfCharging" element={<SelectionOfCharging />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
    </CartProvider>
  );
};

export default App;

