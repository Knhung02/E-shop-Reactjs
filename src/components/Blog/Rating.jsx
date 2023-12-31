import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import FormError from "../Member/FormError";
import axiosClient from '../../configs/axios';
import { Link } from "react-router-dom";

function Rating(props){

    const [rating, setRating] = useState(0)

    const [errors, setErrors] = useState({})
    useEffect(() =>{
        axiosClient.get("/blog/rate/" + props.idBlog)
        .then(res=>{
           
            const rates= res.data.data;
           
            if(Object.keys(rates).length > 0){
               
                let s = 0;
                Object.keys(rates).map(function(key,index){
                    s += rates[key].rate;
                })
                let avg = s / (Object.keys(rates).length)
                    
                setRating(avg)
                console.log(avg)
            }
        })
        .catch(error => console.log(error))
    },[])
    
    function changeRating( newRating, name ) {
        setRating(newRating);
        let errorSubmit ={}
        let flag = true;

        let user = localStorage.getItem("isLogin")
        if(!user){
            flag = false;
            setRating(0)
            errorSubmit.rating = "Please Login"
        }
        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            setErrors({})
            let userData = localStorage["infoUser"]
            let url = "/blog/rate/" + props.idBlog 
            let accessToken = localStorage["token"];
            // console.log(accessToken)
            //config de gui token qua API 
            if(accessToken && userData){
                userData=JSON.parse(userData)
                accessToken =JSON.parse(accessToken)
                let config = { 
                    headers: { 
                        'Authorization': 'Bearer '+ accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    } 
                };	     
                // k cho phep: set vao trc va lay ra cung 1 luc
                if(newRating){
                    const formData = new FormData();
                    formData.append("blog_id",props.idBlog );
                    formData.append("user_id", userData.id);
                    formData.append("rate", newRating)
                
                    axiosClient.post(url,formData, config)
                    .then(res =>{
                        if(res.data.errors){
                            setErrors(res.data.errors)
                        }else{                  
                            console.log("ok")
                        }
                        
                    })
                }
                
            }
            
        }
    }
    return(
       <div>
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />
                </li>
                <li className="color">(6 votes)</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><Link className="color" to ="#">Pink <span>/</span></Link></li>
                <li><Link className="color" to ="#">T-Shirt <span>/</span></Link></li>
                <li><Link className="color" to ="#">Girls</Link></li>
            </ul>
        </div>
        <FormError errors ={errors}/>
    </div>

    )

}
export default Rating;