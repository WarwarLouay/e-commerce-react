

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Request from './Config/Request';
import Cart from './Pages/Cart/Cart';

const App = () => {

  const user = localStorage.getItem('uid');
  const request = new Request();

  const [cart, setCart] = React.useState('');
  const [favorites, setFavorites] = React.useState('')
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const callPage = async () => {
      const data = { user };
  
      const cart = await request.getCart(data);
      setCart(cart.data);
  
      const category = await request.get('category');
      setCategories(category.data);
  
      const product = await request.get('product');
      setProducts(product.data);
  
      const favorite = await request.getFavorite(data);
      setFavorites(favorite.data);
  
      console.log('jhjg');
    };

    callPage();
  }, [request, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home cart={cart}
                                              products={products}
                                              categories={categories}
                                              favorites={favorites} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;