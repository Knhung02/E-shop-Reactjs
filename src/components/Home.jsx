
import React, {useEffect, useState, useContext} from "react";
import axiosClient from "../configs/axios";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import DataCategory from './DataCategory'

function Home({tabs = DataCategory}){
	const cart = useContext(CartContext)
	const [data, setData] = useState([])
	
	useEffect(() =>{
		let url = "/product";
		axiosClient.get(url)
		.then(res =>{
			// console.log(res.data.data)
			setData(res.data.data)
		})    
	},[])
	
	function handleCart(e){
		
		let getId = e.target.id;
		
		let data1 ={}
		let x=1
		let storage = localStorage.getItem("AddToCart");
		if(storage){

			data1 = JSON.parse(storage)
			
			Object.keys(data1).map((key, value) => {
				// console.log(data1)
				if(key === getId){
					data1[key] += 1;
					x=2
				}
			})
		}
		
		if(x===1){
			data1[getId]=1;
		}
		localStorage.setItem("AddToCart",JSON.stringify(data1))

		
		let tongQty =0;
		Object.keys(data1).map((key, value) => {
			
			console.log(data1[key] )
			// tinh tong all qty
			tongQty += data1[key] 
		 
	
		})
		// console.log(tongQty)
		cart.updateNumber(tongQty)
	}

	function handleWishList(e){
		let getId = e.target.id;
		// console.log(getId)
	}

	function renderData(){
		if(Object.keys(data).length > 0){
			return Object.keys(data).map(function(key,index){
				// console.log(data[key]);
				let img = JSON.parse(data[key].image);
				// console.log(img)
				// console.log(data[key].image)
				return(
					<div key={`product-${index}`} className="col-sm-4">
							<div className="product-image-wrapper">
								<div className="single-products">
										<div className="productinfo text-center" >
										<img alt="#" src = {"http://localhost/laravel8/public/upload/product/" + data[key]["id_user"]  +"/"+ img[0]}/>
									 		<h2 >${data[key].price}</h2>
									 		<p >{data[key].name}</p>
									 		<Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
									 	</div>
										<div className="product-overlay" id="1">
										<div className="overlay-content">
											<h2>${data[key].price}</h2>
											<p>{data[key].name}</p>
											<Link to="#" id = {data[key].id}  className="btn btn-default add-to-cart" onClick={handleCart}  ><i className="fa fa-shopping-cart"></i>Add to cart</Link>
										</div>
										</div>
								</div>
								<div className="choose">
									<ul className="nav nav-pills nav-justified">
										<li><Link to="/product/wishlist" id = {data[key].id}  onClick={handleWishList} ><i className="fa fa-plus-square"></i>Add to wishlist</Link></li>
										<li><Link className="btn btn-primary" to={"/product/detail/"+ data[key].id}> More</Link></li>
									</ul>
								</div>
							</div>
						</div>
					
				)
			})
		}
	}

    return (
        <div className="col-sm-9 padding-right">
			<div className="features_items">
				<h2 className="title text-center">Features Items</h2>		
				{renderData()}
			</div>
			
			<div className="category-tab">
				<div className="col-sm-12" style={{display:"flex"}}>
					<ul className="nav nav-tabs">
						{tabs.map((items,index)=>{
							return(
								<li >
									<Link to ="#" data-toggle="tab">
										{items.category}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<div className="tab-content">
					<div className="tab-pane fade active in" id="tshirt" >
						
						{tabs.map((items,index)=>{
							return(
								<div className="col-sm-3">
									<div className="product-image-wrapper">
										<div className="single-products">
											<div className="productinfo text-center">
												<img src={`frontend/images/home/${items.image}`} alt="" />
												<h2>{items.price}</h2>
												<p>{items.name}</p>
												<Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div> 
	
			
		</div>
    )
}
export default Home;