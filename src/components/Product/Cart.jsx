import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import { Link } from "react-router-dom";

function Cart() {
	const [data, setData] = useState([]);    
    let storage = localStorage.getItem("AddToCart");
    const [errors, setErrors] = useState({});
    let handleTotal =0;
    let total = 0;
    
	useEffect(() =>{

            axiosClient.post("/product/cart", storage)
                
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    // console.log(res.data.data)
                    setData(res.data.data)
                }
            })
	},[])
    // let getId = e.target.id;
     // console.log(getId)
    // - tang qty va total len ma k can reload 
    // - luu qty moi vao localStorage, de reload thi hien thi ra

    function handleDown(e){
        let getId = e.target.id;
        
        // copy ra 1 data moi 
        let data2 = [...data];
        data2.map((items,index)=>{
        
            if(items.id == getId){
                if(items.qty>1){
                    data2[index]["qty"] -=1;
                }else{
                    delete data2[index]
                }
            }
        })
        let a = data2.filter(n => n)
        setData(a)
        if(storage){

			data2 = JSON.parse(storage)
			
			Object.keys(data2).map((key) => {
				// console.log(key)
				if(key == getId){
                    
                    if(data2[key]>1){
                        data2[key] -= 1;
					    localStorage.setItem("AddToCart",JSON.stringify(data2))
                    }
                    else{
                        delete data2[key];
                        localStorage.setItem("AddToCart",JSON.stringify(data2))
                    }
					
				}
			})
		}

    }
    function handleUp(e){
        let getId = e.target.id;
        // copy ra 1 data moi 
        let data2 = [...data];
        data2.map(function(items,index){
        
            if(items.id == getId){
                data2[index]["qty"] +=1;
            
            }
                // kiem tra id co trong nay k?
                // co thi tang qty len 
        })
        setData(data2)
        if(storage){

			data2 = JSON.parse(storage)
			
			Object.keys(data2).map((key) => {
				console.log(data2[key])
				if(key == getId){
					data2[key] += 1;
					localStorage.setItem("AddToCart",JSON.stringify(data2))
				}
			})
		}
    }

    function handleRemove(e){
        let getId = e.target.id;
        
        // copy ra 1 data moi 
        let data3 = [...data];
        
        data3.map(function(items,index){
        
            if(items.id == getId){
                delete data3[index]
            }
        })
        // console.log(data1)
        let a = data3.filter(n => n)
        // console.log(a)
        setData(a)
        if(storage){

			let data3 = JSON.parse(storage)
			
			Object.keys(data3).map((key) => {
				// console.log(key)
				if(key == getId){
					delete data3[key]
                    
					localStorage.setItem("AddToCart",JSON.stringify(data3))
				}
			})
		}       
    }
    
	function renderData(){
        if(Object.keys(data).length > 0){
			return Object.keys(data).map(function(key,index){
				let img = JSON.parse(data[key].image);
				// console.log(data[key].id)
                handleTotal = data[key].price * data[key].qty
                total += handleTotal
				return(
                    <tr key={`product_${index}`} className="product">
                        <td className="cart_product">
                            <Link to><img alt="#" className="imgCart" src = {"http://localhost/laravel8/public/upload/product/" + data[key]["id_user"]  +"/"+ img[0]}/></Link>
                        </td>
                        <td className="cart_description">
                            <h4><Link to>{data[key].name}</Link></h4>
                            <p>Web ID: {data[key].web_id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${data[key].price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <Link id ={data[key].id} onClick={handleUp} className="cart_quantity_up" to="#" > + </Link>
                                <input className="cart_quantity_input" type="text" name="quantity" value={data[key].qty} autoComplete="off" size={2} />
                                <Link id ={data[key].id} onClick={handleDown} className="cart_quantity_down" to="#"> - </Link>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p id ={data[key].id} className="cart_total_price">${handleTotal}</p>
                        </td>
                        <td className="cart_delete"  >
                            <Link  className="cart_quantity_delete" to="#"><i id ={data[key].id} onClick={handleRemove} className="fa fa-times" /></Link>
                        </td>
                    </tr>
        	    )
            })       
        }
    }

	return (
        
		<section id="cart_items">
            <div className="container">
                <div className="breadcrumbs">
                <ul className="breadcrumb">
                    <li><Link to="#">Home</Link></li>
                    <li className="active">Shopping Cart</li>
                </ul>
                </div>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description">Description</td> 
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                        {renderData()}
                        
                        </tbody>
                    </table>
                <p className="finalTotal" >
                    Total: ${total}
                </p>
                </div>
            </div>
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text"/>
                                    </li>
                                </ul>
                                <Link className="btn btn-default update" to="#">Get Quotes</Link>
                                <Link className="btn btn-default check_out" to="#">Continue</Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>$61</span></li>
                                </ul>
                                    <Link className="btn btn-default update" to="#">Update</Link>
                                    <Link className="btn btn-default check_out" to="#">Check Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
	        </section>
        </section> 

	);
}

export default Cart;