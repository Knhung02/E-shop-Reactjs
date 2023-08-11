import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import { BsTrash3 } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

import { Link, useNavigate } from "react-router-dom";
function MyProduct() {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	
	const handleAdd = () =>{
		navigate("/account/add-product");
	}
	useEffect(() =>{
		let url = "/user/my-product" 
		let accessToken = localStorage["token"];
		// console.log(accessToken)
		//config de gui token qua API 
		if(accessToken){
			accessToken =JSON.parse(accessToken)
			let config = { 
				headers: { 
				'Authorization': 'Bearer '+ accessToken,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
				} 
			};	
	
			axiosClient.get(url, config)
			.then(res =>{
				// console.log(res.data.data)
				setData(res.data.data)
			})    
		}
		
	},[])
	
	function deleteProduct(e){
		let getId = e.target.id;
		// console.log(getId)
		let url = "/user/product/delete/" + getId
		let accessToken = localStorage["token"];
		if(accessToken){
			accessToken =JSON.parse(accessToken)
			//config de gui token qua API 
			let config = { 
				headers: { 
				'Authorization': 'Bearer '+ accessToken,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
				} 
			};	
			axiosClient.get(url, config)
			.then(res =>{
				// console.log(res)
				setData(res.data.data)
			}).catch(error=>console.log(error))    
		}		
	}
	   
	function renderData(){
		if(Object.keys(data).length > 0){

			return Object.keys(data).map(function(key,index){
				
				let img = JSON.parse(data[key].image);
				// console.log(img)
				return(
					<tr key={key}>
						<td>{data[key].id}</td>
						<td>{data[key].name}</td>
						<td>
							<img className="imgProduct" src = {"http://localhost/laravel8/public/upload/product/" + data[key]["id_user"]  +"/"+ img[0]}/>
						</td>
						<td>{data[key].price}</td>
						<td >
							<BsTrash3 style={{cursor:"pointer"}} id={data[key].id} onClick={deleteProduct}/>
						</td>
						<td ><Link to={"/account/edit-product/" + data[key].id}><i className="glyphicon glyphicon-pencil"/></Link></td>

					</tr>		
				)
			})	
		}
	}

	return (
		<div >
			 <table>
				<thead>
				<tr className="myProduct">
					<th>Id</th>
					<th>Name</th>
					<th>Image</th>
					<th>Price</th>
					<th colSpan={2}>Action</th>
				</tr>
				</thead>
				{renderData()}
			</table>
			<button type="submit" className="add-new" onClick={handleAdd}>Add New</button>
			
		</div>
	);
}

export default MyProduct;
