import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import FormError  from "../Member/FormError";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct(props){
    const navigate = useNavigate()
    let params = useParams()
   
    const [getBrand, setBrand] = useState("")

    const [getCategory, setCategory] = useState("")

    const [errors, setErrors] = useState({});

    const [getFile, setFile] = useState("")
    
    const [getAvatar, setAvatar] = useState([]);

    const [inputs, setInputs] = useState({
        name: "" ,
        price: "" ,
        company: "",
        detail:"",
        category:"",
        brand:"",
        image:[],
        id_user:""
    });

    useEffect(() =>{
        
        let url = ("/user/product/" + params.id)
       
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
                // console.log(res.data.data)
            
                const edit = res.data.data
                
                if(Object.keys(edit).length > 0){

                    // console.log(edit.name)
                    setInputs({
                        name: edit.name ,
                        price: edit.price ,
                        company: edit.company_profile ,
                        detail: edit.detail ,
                        sale: edit.sale ,
                        status: edit.status ,
                        category: edit.id_category ,
                        brand: edit.id_brand ,
                        image:edit.image,
                        id_user: edit.id_user
                    });
                }
		     }).catch(error=> console.log(error))
        }

    },[])
    
    useEffect(() =>{
        axiosClient.get("/category-brand")
        .then(res=>{
            // console.log(res.data.category)
            setBrand(res.data.brand)
            setCategory(res.data.category)
            
        })
        .catch(error => console.log(error))
    },[])
    

    function handleFile(e){
        const file = e.target.files
        // console.log(file)
         setFile(file);	
         
    }

    function handleInput(e){
        const nameInput = e.target.name;
  
        const value = e.target.value;

        setInputs(state => ({...state, [nameInput]: value}))
       
    }
    
    function handleAvatar(e){
        // console.log(isChecked)
        const {value, checked}= e.target;

        if(checked)
        {
            setAvatar(state => ([...state, value]))
        }
        else{
             
          let x = getAvatar.filter(item => item !== value)
          setAvatar(x)
        }
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
              console.log(value)
                return(
                    <option value={value.id}>{value.brand}</option>
                )
            })
        }
    }
    function renderImg(){
        let img = inputs.image;

        if(img.length > 0){
            return img.map((value,key)=>{
                return (
                    <li>
                        <img src = {"http://localhost/laravel8/public/upload/product/"+ inputs.id_user+ "/" + value} />
                        <input type="checkbox" onChange={handleAvatar} checked={ value.getAvatar} value={value} name="getAvatar"/>
                    </li>
                )
            })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(getAvatar);
       
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
            flag=false
        }
        if(inputs.brand===""){
            errorSubmit.brand="Please enter Brand"
            flag=false
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
            console.log(getFile)
            Object.keys(getFile).map((key,index)=>{
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
                    errorSubmit.file = "Update up to 3 picture"
                }
                else{
                    console.log("ok")
                } 
            })
        }
        if((getAvatar).length + Object.keys(getFile).length > 3){
            flag = false;
            errorSubmit.file = "Update up to 3 picture"
        }
                

        console.log(flag);
        if(!flag){
            setErrors(errorSubmit);
        }else{
            setErrors({});

            let url = "/user/product/update/" + params.id;
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
           
               
                const formData = new FormData();
                    formData.append("name",inputs.name );
                    formData.append("price", inputs.price);
                    formData.append("category", inputs.category);
                    formData.append("brand",inputs.brand);
                    formData.append("company",inputs.company);
                    formData.append("detail", inputs.detail);
                    formData.append("status",inputs.status);
                    // formData.append("sale", inputs.sale);
               
                    Object.keys(getFile).map((item,i) =>{
                         formData.append("file[]", getFile[item]);
                        
                    })
                    Object.keys(getAvatar).map((item,i) =>{
                         formData.append("avatarCheckBox[]", getAvatar[item]);
                    })
                    axiosClient.post(url,formData, config)
                    .then(res =>{
                        
                        if(res.data.errors){
                            setErrors(res.data.errors)
                        }else{
                            console.log(res)
                            alert("Edit product successful")
                            navigate("/account/my-product");
                        }
                        
                    }).catch( errors=>console.log(errors))    
            }
        }

    }

    return(
        <>            
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                <h2>Edit product!</h2>
                <form action="#" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" value={inputs.name} onChange ={handleInput}/>
                    <input type="text" placeholder="Price" name="price"  value={inputs.price}  onChange ={handleInput}/>
                     <select value={inputs.category} name="category" onChange ={handleInput}>
                        <option value="">Please choose Category</option>
                        {renderCategory()}          
                     </select>
                     <select value={inputs.brand} name="brand" onChange ={handleInput}>
                        <option value="">Please choose Brand</option>
                        {renderBrand()}   
                     </select>
                     <select onChange={handleInput} value={inputs.status}  name="status" >
                        <option value={1}>new</option>
                        <option value={0}>sale</option>
                     </select>

                     {/* {renderSale()} */}
                    <input type="text" placeholder="Company" name="company" value={inputs.company}  onChange ={handleInput}/>
                    <input type="file" onChange={handleFile} name="getFile" multiple />
                    <ul className="checkFile">
                        {renderImg()}

                    </ul>
                    <textarea name="detail" rows={11} value={inputs.detail} onChange={handleInput} />
                    <FormError errors ={errors}/>
                    <button type="submit" className="btn btn-default">Edit</button>
                </form>
                </div>{/*/sign up form*/}
            </div>
            
        </>
       
    )

    
}
export default EditProduct;