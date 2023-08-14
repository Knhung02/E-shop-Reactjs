
import React, {useState} from "react";
import axiosClient from "../../configs/axios";
import FormError from "../Member/FormError";
import { Link } from "react-router-dom";

function Comment(props){

  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({})

  function handleInput(e){
    setComment(e.target.value)
  }

  function handleSubmit(e){
    
    e.preventDefault();

    let errorSubmit = {}
    let flag = true;

    let user = localStorage.getItem("isLogin")
    if(!user){
      flag = false;
      errorSubmit.comment = "Please Login"
    }
    else if(comment === ""){
      
      flag = false;
      errorSubmit.comment = "Please enter Comment"
    }

    if(!flag){
      setErrors(errorSubmit)
    }
    else{
       setErrors({})
       
        let userData = localStorage["infoUser"]
         //duong dan Api
        // console.log(userData)
        if(userData){
          userData =JSON.parse(userData)
          let url = "/blog/comment/" + props.idBlog 
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
          if(comment){
            const formData = new FormData();
                formData.append("id_blog",props.idBlog );
                formData.append("id_user", userData.id);
                formData.append("id_comment", props.idRep ? props.idRep : 0);
                formData.append("comment", comment);
                formData.append("image_user", userData.avatar);
                formData.append("name_user", userData.name);
                
            axiosClient.post(url,formData, config)
            .then(res =>{
             
              if(res.data.errors){
                  setErrors(res.data.errors)
              }else{
                  console.log(res)
                  props.getCmt(res.data.data)
              }
               
            })    
            .catch( errors=>console.log(errors))
          }     
         }
        }
    }
  }
  
	return(
		<div>
        <div className="replay-box">
            <div className="row">
              <div className="col-sm-12">
                <h2>Leave a replay</h2>
                <div className="text-area" > 
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <textarea name="message" rows={11} onChange={handleInput} />
                  <Link onClick={handleSubmit} className="btn btn-primary" to ="#" >post comment</Link>
                </div>
              </div>
            </div>
          </div>
          <FormError errors ={errors}/>
      </div>
	)
}
export default Comment;

// - viet ham click reply thi lay id ra 
// - ben detail viet 1 ham truyen xuong ListComment de lay id len 
// - truyen qua comment -> goi ra xem thu lay xuong dc chua => log ra -> ok thi set vao api gui qua 
// => log ra xem ket qua ve id-comment co = id vua gui k