import React, { useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { CartContext } from '../CartContext';
import { message } from 'antd';



function Header(){
    const navigate = useNavigate();
    const cart = useContext(CartContext)
    let storage = localStorage.getItem("Cart");
    function logout(){
        localStorage.removeItem("isLogin");
        navigate("/login")  
        message.success('Logout successful!')
    }
    let user=localStorage.getItem("isLogin")

    function renderLogin(){
        // - goi local ra 
        if(user){
            user=JSON.parse(user)
            if(user === true){
                return(
                    <li onClick={logout}>
                        <Link to ="#"><i className="fa fa-lock"></i>Logout</Link>
                    </li>
                )
            }else{
                return(
                    <li><Link to="/login" ><i className="fa fa-lock" />Login</Link></li> 
                )

            }
            
        }
        else{
            return(
                <li>
                    <Link to="/login">
                        <i className="fa fa-lock"></i> 
                        Login
                    </Link>
                </li>
            )
        }
    }

    function renderRegister(){
        return(
            user ? null:( (<li><Link to="/register"><i className="fa fa-lock"></i> Register </Link></li>))
        )
    }

        
    function renderAccount(){
        return(
            user ? ( <li><Link to="/account/update"><i className="fa fa-user" /> Account</Link></li>) : null
        )
    }
    

        return(
            <div>
                
                <header id="header">
                    <div className="header_top">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="contactinfo">
                                        <ul className="nav nav-pills">
                                            <li><Link to="#"><i className="fa fa-phone"></i> +2 95 01 88 821</Link></li>
                                            <li><Link to="#"><i className="fa fa-envelope"></i> info@domain.com</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="social-icons pull-right">
                                        <ul className="nav navbar-nav">
                                            <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                            <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                            <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                            <li><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
                                            <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="header-middle">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 clearfix">
                                    <div className="logo pull-left">
                                        <Link to="/">
                                            <img src="/frontend/images/home/logo.png" alt="" width={100} />
                                        </Link>
                                    </div>
                                    <div className="btn-group pull-right clearfix">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                                USA
                                                <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link to="#">Canada</Link></li>
                                                <li><Link to="#">UK</Link></li>
                                            </ul>
                                        </div>
                                        
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                                DOLLAR
                                                <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link to=" ">Canadian Dollar</Link></li>
                                                <li><Link to=" ">Pound</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 clearfix">
                                    <div className="shop-menu clearfix pull-right">
                                        <ul className="nav navbar-nav">
                                            {renderAccount()}
                                            
                                            <li><Link to="#"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                                            <li><Link to="product/cart"><i className="fa fa-shopping-cart"></i> Cart ({storage})</Link></li>
                                            
                                            {renderLogin()}
                                            {renderRegister()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="header-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>
                                    <div className="mainmenu pull-left">
                                        <ul className="nav navbar-nav collapse navbar-collapse">
                                            <li><Link to="/" className="active">Home</Link></li>
                                            <li className="dropdown"><Link to="account/my-product">Shop<i className="fa fa-angle-down"></i></Link>
                                                <ul role="menu" className="sub-menu">
                                                    <li><Link to="account/my-product">Products</Link></li>
                                                    
                                                    <li><Link to="product/cart">Cart</Link></li> 

                                                </ul>
                                            </li> 
                                            <li className="dropdown"><Link to="/blog/list">Blog<i className="fa fa-angle-down"></i></Link>
                                                <ul role="menu" className="sub-menu">
                                                    <li><Link to="/blog/list">Blog List</Link></li>
                                                    <li><Link to="/blog/list">Blog Single</Link></li>
                                                </ul>
                                            </li> 
                                            <li><Link to="*">404</Link></li>
                                            <li><Link to="contact-us.html">Contact</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="search_box pull-right">
                                        <input type="text" placeholder="Search"/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    
	            </header>
	

            </div>
        )
        
    
}

export default Header;	