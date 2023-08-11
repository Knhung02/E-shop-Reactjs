import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import FormError from "./FormError";
function Register(){

    const [inputs, setInputs] = useState({
        name: "" ,
        email:"",  
        password:"", 
        phone:"" ,
        address:"", 
        level:""
    });
    const [errors, setErrors] = useState({});

    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState("")
    
    function hanldeFile(e){
        const file = e.target.files
          // send file to api server
        let reader = new FileReader();	
        reader.onload = (e) => {	
            setAvatar(e.target.result);	//gui qua api
            setFile(file);	
        };	
        reader.readAsDataURL(file[0]);	
    }

    function handleInput(e){
        const nameInput = e.target.name;
        //-> email , pass
        const value = e.target.value;
        //-> 123,7777
        setInputs(state => ({...state, [nameInput]: value}))
        
        //state => ({...state* giu lai thang cu trc do
        //[pass]: 777
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
            errorSubmit.email ="Wrong Email format";
        }

        if(inputs.password ===""){
            flag = false;
            errorSubmit.password = "Please enter Password"
        }
        if(inputs.phone ===""){
            flag = false;
            errorSubmit.phone = "Please enter Phone"
        }
        if(inputs.name ===""){
            flag = false;
            errorSubmit.name = "Please enter Name"
        }
        if(inputs.address ===""){
            flag = false;
            errorSubmit.address = "Please enter Address"
        }
        
        if(getFile){
            const arr =["png", "jpg", "jpeg", "PNG", "JPG"]
            // console.log(getFile[0]["size"])
            let size = getFile[0]["size"];
            let type = getFile[0]["type"];
            const splitT = type.split("/");
            
            if(size > 1024 * 1024){
                flag = false;
                errorSubmit.file = "file loi"
            }
            else if(!arr.includes(splitT[1])){
                flag = false;
                errorSubmit.file = "Wrong file format "
            } 
        }else{
            flag = false;
            errorSubmit.file = "Please upload file"
        }
        if(!flag){
            setErrors(errorSubmit);
        }else{
            // tat ca ok het
            setErrors({});
            const data ={
                name : inputs.name,
                email: inputs.email,  
                password:inputs.password, 
                phone: inputs.phone ,
                address:inputs.address, 
                avatar: getAvatar,
                level: 0,
            }
            console.log(data)
            axiosClient.post("/register", data)
            
            .then((res)=>{
                
                    if(res.data.errors){
                        setErrors(res.data.errors)
                    }else{
                        alert("Register successful")
                    }
                    
            
            })

            
        }

    }

    return(
        <>            
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" value={inputs.name} onChange ={handleInput}/>
                    <input type="email" placeholder="Email Address" name="email" value={inputs.email}  onChange ={handleInput}/>
                    <input type="password" placeholder="Password" name="password" value={inputs.password}  onChange ={handleInput}/>
                    <input type="text" placeholder="Phone" name="phone" value={inputs.phone}  onChange ={handleInput}/>
                    <input type="text" placeholder="Address" name="address" value={inputs.address}  onChange ={handleInput}/>
                    <input type="file"  name="getFile"   onChange={hanldeFile}/>
                    <input type="text" placeholder="Level" value="0" name="level" onChange ={handleInput}/>
                    <FormError errors ={errors}/>
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
                </div>{/*/sign up form*/}
            </div>
        </>
       
    )

    
}
export default Register;