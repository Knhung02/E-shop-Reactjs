import React, {useEffect, useState} from "react";
import axios from "axios";
import FormError from "../Member/FormError";
function Update(){
    const [inputs, setInputs] = useState({
        name: "" ,
        email: "" ,
        password: "" ,
        phone: "" ,
        address: "" 
    });
    const [errors, setErrors] = useState({});

    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState()

    useEffect(() =>{
        let user = localStorage.getItem("infoUser")
        if(user){
            user=JSON.parse(user)
            //  console.log(user)
             setInputs({
                name: user.name ,
                email: user.email,  
                password: user.password, 
                phone: user.phone ,
                address: user.address
            });

        }
        
    },[])
    function hanldeFile(e){
        const file = e.target.files
        let reader = new FileReader();	
        reader.onload = (e) => {	
            setAvatar(e.target.result);	
            setFile(file);	
        };	
        reader.readAsDataURL(file[0]);	
    }

    function handleInput(e){
        const nameInput = e.target.name;
  
        const value = e.target.value;

        setInputs(state => ({...state, [nameInput]: value}))
       
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
       
        let errorSubmit ={}
        let flag = true;
  

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
                errorSubmit.file = "error file"
            }
            else if(!arr.includes(splitT[1])){
                flag = false;
                errorSubmit.file = "Wrong file format "
            } 
        }
        if(!flag){
            setErrors(errorSubmit);
        }else{
            // tat ca ok het
            setErrors({});
            const userData = JSON.parse(localStorage["infoUser"])
            //duong dan Api
           
    
            let url = "http://localhost/laravel8/public/api/user/update/" + userData.id
            let accessToken = localStorage["token"];
            // console.log(accessToken)
            //config de gui token qua API 
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

            
            const formData = new FormData();
                formData.append("name",inputs.name );
                formData.append("email", inputs.email);
                formData.append("password",inputs.password ? inputs.password : "");
                formData.append("phone", inputs.phone);
                formData.append("address",inputs.address);
                formData.append("avatar", getAvatar);
                axios.post(url,formData, config)
                .then(res =>{
                    
                    if(res.data.errors){
                        setErrors(res.data.errors)
                    }else{
                    
                    // console.log(res)
                        const auth = res.data.Auth
                        const token = res.data.token
                        localStorage.setItem("infoUser", JSON.stringify(auth));
                        localStorage.setItem("token", JSON.stringify(token));

                    alert("Update successful!")
                    }
                    
                })
                }      
        }

    }
    
    return(
        <>            
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                <h2>User Update!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" value={inputs.name} onChange ={handleInput}/>
                    <input type="email" placeholder="Email Address" name="email" disabled value={inputs.email}  onChange ={handleInput}/>
                    <input type="password" placeholder="Password" name="password" value={inputs.password}  onChange ={handleInput}/>
                    <input type="text" placeholder="Phone" name="phone" value={inputs.phone}  onChange ={handleInput}/>
                    <input type="text" placeholder="Address" name="address" value={inputs.address}  onChange ={handleInput}/>
                    <input type="file"  name="getFile"   onChange={hanldeFile}/>
                    <input type="text" placeholder="Level" value="0" name="level" onChange ={handleInput}/>
                    <FormError errors={errors}/>
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
                </div>{/*/sign up form*/}
            </div>
            
        </>
       
    )

    
}
export default Update;