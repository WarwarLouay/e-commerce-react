/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import './i18n';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Request from './Config/Request';
import Cart from './Pages/Cart/Cart';
import ShippingAddress from './Pages/ShippingAddress/ShippingAddress';
import Favorite from './Pages/Favorite/Favorite';
import Order from './Pages/Order/Order';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import { useTranslation } from 'react-i18next';

const App = () => {

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const user = localStorage.getItem('uid');
  const request = new Request();


  const [cookie, removeCookie] = useCookies([]);
  const [isIn, setIsIn] = React.useState(false);

  const [cart, setCart] = React.useState('');
  const [favorites, setFavorites] = React.useState('')
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

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
    
    favorite.data.forEach((fav) => {
      if (fav.user._id === user) {
        product.data.forEach((prod) => {
              if (prod._id === fav.product._id) {
                  prod.isFavorite = true;
              } else {
                  prod.isFavorite = false;
              }
          })
          console.log(product)
      } else {
          console.log('no');
      }
  });

  };

  React.useEffect(() => {

    const verifyUser = async () => {
      if (!cookie.jwt) {
      } else {
        const { data } = await axios.post('http://localhost:4000/api/user/auth', {}, { withCredentials: true });
        if (!data.status) {
          setIsIn(false);
        } else {
          setIsIn(true);
        }
      }
    };
    verifyUser();

    callPage();
  }, [cookie, removeCookie, user]);

  const addToCart = async (data) => {
    const cart = await request.getCart(data);
    setCart(cart.data);
  };

  const login = () => {
    setIsIn(true);
  };

  const logout = () => {
    setIsIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home cart={cart}
          products={products}
          categories={categories}
          favorites={favorites}
          isIn={isIn}
          onAddToCart={addToCart}
          onRequest={callPage}
          logout={logout} />}
        />

        <Route path='/login' element={<Login login={login} />} />

        <Route path='/cart' element={<Cart onAddToCart={addToCart}
                                            onRequest={callPage}
                                            isIn={isIn} />} />

        <Route path='/shipping' element={<ShippingAddress isIn={isIn} />} />

        <Route path='/favorite' element={<Favorite favorites={favorites}
                                                    isIn={isIn}
                                                    cart={cart}
                                                    logout={logout}
                                                    onAddToCart={addToCart}
                                                    onRequest={callPage} />} />

        <Route path='/order' element={<Order isIn={isIn} />} />

        <Route path='/order/:id' element={<OrderDetails isIn={isIn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;