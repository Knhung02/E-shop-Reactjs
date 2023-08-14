import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Home from './components/Home';

import BlogDetail from './components/Blog/BlogDetail';

import Login from './components/Member/Login';
import Comment from './components/Blog/Comment';
import Update from './components/Account/Update';
import AddProduct from './components/Account/AddProduct';
import MyProduct from './components/Account/MyProduct';
import EditProduct from './components/Account/EditProduct';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';

import Register from './components/Member/Register';
import NotFound from './components/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
  <Router>
    <App>
      <Routes>
          <Route index path="/" element = {<Home/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/register" element = {<Register/>} />
          {/* <Route path="/login" element = {<Login/>} /> */}

          <Route path="/blog/list" element = {<Blog/>} />
          <Route path="/blog/detail/:id" element = {<BlogDetail/>} />
          <Route path="/blog/comment/:id" element = {<Comment/>} />

          <Route path="/account/update" element = {<Update/>} />
          <Route path="/account/add-product" element = {<AddProduct/>} />
          <Route path="/account/my-product" element = {<MyProduct/>} />
          <Route path="/account/edit-product/:id" element = {<EditProduct/>} />

          <Route path="/product/detail/:id" element = {<ProductDetail/>} />
          <Route path="/product/cart" element = {<Cart/>} />
          {/* paths except the ones above */}
          <Route path="*" element = {<NotFound/>} />
      </Routes>
    </App>

  </Router>

</React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
