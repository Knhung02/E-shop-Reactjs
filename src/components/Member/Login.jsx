import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import FormError from "./FormError";
import axiosClient from "../../configs/axios";
import { message } from "antd";
function Login(){
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email:"",  password:"", 
    });
    const [errors, setErrors] = useState({});

    function handleInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]: value}))
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let errorSubmit ={}
        let flag = true;
        const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      
        if(inputs.email === ""){
            flag = false;
            errorSubmit.email ="Please enter Email";
        }else if(!regex.test(inputs.email)){
            flag = false;
            errorSubmit.email ="Wrong Email format ";
        }

        if(inputs.password === ""){
            flag = false;
            errorSubmit.password = "Please enter Password"
        }
        if(!flag){
           
            setErrors(errorSubmit);
        }else{
           
            setErrors({});
            const data ={
                email: inputs.email,  
                password:inputs.password, 
                level: 0,
            }
            // console.log(data)
            axiosClient.post("/login", data)
            .then((res)=>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                    message.error('Login failed!')
                }else{
                    message.success('Login successful!')
                    // true-> local
                    // console.log(res)
                    const auth = res.data.Auth;
                    const token = res.data.token;
                    localStorage.setItem("isLogin", JSON.stringify(true));
                    localStorage.setItem("infoUser", JSON.stringify(auth));
                    localStorage.setItem("token", JSON.stringify(token));
                    navigate("/")
                }
            }).catch( errors=>console.log(errors))
                    
        }

    }

    return(
        <div>
            <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                <form action="#" onSubmit={handleSubmit}>             
                    <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange ={handleInput}/>
                    <input type="password" placeholder="Password" name="password" value={inputs.password} onChange ={handleInput}/>
                    <input type="text" placeholder="Level"  value="0" onChange ={handleInput}/>
                    <FormError errors={errors}/>
                    <button type="submit" className="btn btn-default" >Login</button>
                </form>
            </div>{/*/login form*/}
            </div>
        </div>
    )
}
export default Login;
