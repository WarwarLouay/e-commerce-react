import React from 'react'
import Carousel from '../../Components/Carousel/Carousel'
import Categories from '../../Components/Categories/Categories'
import Features from '../../Components/Features/Features'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import Products from '../../Components/Products/Products'

const Home = ({ cart, products, categories, favorites, isIn, onAddToCart, logout, onRequest }) => {
  return (
    <div>
      <NavBar cart={cart} favorites={favorites} isIn={isIn} logout={logout} />
      <Carousel />
      <Features />
      <Categories categories={categories} />
      <Products products={products} isIn={isIn} onAddToCart={onAddToCart} favorites={favorites} onRequest={onRequest} />
      <Footer />
    </div>
  )
}

export default Home
