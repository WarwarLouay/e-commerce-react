/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Request from './Config/Request';

const App = () => {

  const user = localStorage.getItem('uid');
  const request = new Request();

  const [cart, setCart] = React.useState('');
  const [favorites, setFavorites] = React.useState('')
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const callPage = React.useCallback( async () => {
    const data = { user };

    const cart = await request.getCart(data);
    setCart(cart.data);

    const category = await request.get('category');
    setCategories(category.data);

    const product = await request.get('product');
    setProducts(product.data);

    const favorite = await request.getFavorite(data);
    setFavorites(favorite.data);
  }, [request, user]);

  React.useEffect(() => {
    callPage();
  }, [callPage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home cart={cart}
                                              products={products}
                                              categories={categories}
                                              favorites={favorites} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;