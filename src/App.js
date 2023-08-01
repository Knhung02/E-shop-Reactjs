
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import MenuLeft2 from './components/Layout/MenuLeft2';
import { useLocation } from 'react-router-dom';
import React, {useState} from "react";
import { CartContext } from './components/CartContext';


function App(props) {
  let params1 = useLocation();
  console.log(params1)

  const [count, setCount] = useState("")

  function updateNumber(tongQty){
    setCount(tongQty)
    localStorage.setItem("Cart",tongQty)
  }

  return (
    <div>
        <CartContext.Provider 
          value ={{
            count:count,
            updateNumber:updateNumber  
           }}>
            <Header/>
            <section>
                <div className="container">
                    <div className="row">
                        {params1['pathname'].includes("product/cart") ? null : <MenuLeft/>}
                        {props.children}
                    </div>
                </div>
            </section>
            <Footer/>
        </CartContext.Provider>
    </div>
  );
}

export default App;

