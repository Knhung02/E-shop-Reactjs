import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import FormError  from "../Member/FormError";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    const navigate = useNavigate();
    const [getBrand, setBrand] = useState("")
    const [getCategory, setCategory] = useState("")
    
    const [inputs, setInputs] = useState({
        name: "" ,
        price: "" ,
        company: "",
        detail:"",
        sale:"",
        status: 1,
        category:"",
        brand:"",
    });

    const [errors, setErrors] = useState({});

    const [getFile, setFile] = useState("")

    useEffect(() =>{
        axiosClient.get("/category-brand")
        .then(res=>{
            console.log(res.data.category)
            setBrand(res.data.brand)
            setCategory(res.data.category)
        })
        .catch(error => console.log(error))
    },[])
    

    function hanldeFile(e){
        const file = e.target.files
        // console.log(file)
        setFile(file);	
       
    }
    
    function renderCategory(){
        if(getCategory.length >0){
            return getCategory.map((value,key)=>{
                return(
                    <option value={value.id}>{value.category}</option>
                )
            })
        }
    }
    
    function renderBrand(){
        if(getBrand.length >0){
            return getBrand.map((value,key)=>{
                return(
                   <option value={value.id}>{value.brand}</option>
                )
            })
        }
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
  

        if(inputs.name ===""){
            flag = false;
            errorSubmit.password = "Please enter Name"
        }
        if(inputs.price ===""){
            flag = false;
            errorSubmit.phone = "Please enter Price"
        }
        if(inputs.category===""){
            errorSubmit.category="Please enter Category"
            flag=false;
        }

        if(inputs.brand===""){
            errorSubmit.brand="Please enter Brand"
            flag=false;
        }

        if(inputs.company ===""){
            flag = false;
            errorSubmit.name = "Please enter Company"
        }
        if(inputs.detail ===""){
            flag = false;
            errorSubmit.address = "Please enter Detail"
        }

        // console.log(getFile)
        if(Object.keys(getFile).length > 0){
            // console.log(getFile)
            Object.keys(getFile).map((key,index) =>{
                // console.log(getFile[key].type)
                const arr =["png", "jpg", "jpeg", "PNG", "JPG"]
                
                let size = getFile[key].size;
                let type = getFile[key].type;
                const splitT = type.split("/");
                
                if(size > 1024 * 1024){
                    flag = false;
                    errorSubmit.file = "The size of File is too big"
                }
                else if(!arr.includes(splitT[1])){
                    flag = false;
                    errorSubmit.file = "Wrong file format "
                }
                else if((Object.keys(getFile).length)> 3){
                    flag = false;
                    errorSubmit.file = "Upload up to 3 pictures"
                }
                else{
                    console.log("ok")
                } 
            })
        }
            
        // console.log(flag); =>True
        if(!flag){
            setErrors(errorSubmit);
        }else{
            // tat ca ok het
            setErrors({});
            //duong dan Api
            let url = "/user/product/add" 
            let accessToken = localStorage["token"];
            console.log(accessToken)
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
        
                const formData = new FormData();
                    formData.append("name",inputs.name );
                    formData.append("price", inputs.price);
                    formData.append("category", inputs.category);
                    formData.append("brand",inputs.brand);
                    formData.append("company",inputs.company);
                    formData.append("detail", inputs.detail);
                    formData.append("status",inputs.status);
                    formData.append("sale", inputs.sale);
            
                    Object.keys(getFile).map((item,i) =>{
                        formData.append("file[]", getFile[item]);
                    })
                    axiosClient.post(url,formData, config)
                    
                    .then(res =>{
                        console.log(res)
                        if(res.data.errors){
                            setErrors(res.data.errors)
                        }else{
                            console.log(res)
                            alert("Add product successful!")
                            let datas = res.data.data
                            localStorage.setItem("infoProduct", JSON.stringify(datas));
                            navigate("/account/my-product");
                        }
                    }).catch( errors=>console.log(errors))
                }    
        }

    }
    
    function renderSale(){
        // console.log(inputs.status)
        if(inputs.status===1){
            return(
               <></>
            )
        }else{
            return(
                <div>
                    <input  id='sale2' type="text" onChange={handleInput}/>
                    <span className="span1">%</span>
                </div>
            )
        }
       
    }
    return(
        <>            
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                <h2>Create product!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" value={inputs.name} onChange ={handleInput}/>
                    <input type="text" placeholder="Price" name="price"  value={inputs.price}  onChange ={handleInput}/>
                     <select name="category" onChange ={handleInput}>
                        <option value="">Please choose Category</option>
                        {renderCategory()}          
                     </select>
                     <select name="brand" onChange ={handleInput}>
                        <option value="">Please choose Brand</option>
                        {renderBrand()}   
                     </select>
                     <select onChange={handleInput} value={inputs.status}  name="status" >
                        <option value={1}>new</option>
                        <option value={0}>sale</option>
                     </select>

                     {renderSale()}
                    <input type="text" placeholder="Company" name="company" value={inputs.company}  onChange ={handleInput}/>
                    <input type="file" onChange={hanldeFile} name="getFile" multiple />
                    <textarea name="detail" placeholder="Detail" rows={11} value={inputs.detail} onChange={handleInput} />
                    <FormError errors ={errors}/>   
                    <button type="submit" className="btn btn-default">Add New</button>
                </form>
                </div>{/*/sign up form*/}
            </div>
                
        </>
       
    )

    
}
export default AddProduct;