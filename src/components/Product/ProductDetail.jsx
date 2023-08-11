import axiosClient from '../../configs/axios';
import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import DataCategory from '../DataCategory'
function ProductDetail({taps= DataCategory}) {
    let params=useParams()
    const [data,setData]=useState({})
    const [imgData,setImg]=useState([])
    // console.log(imgData)
    const [changeImg,setchangeImg]=useState("")
   
    useEffect(()=>{
        axiosClient.get("/product/detail/" + params.id)
        .then(res =>{
             console.log(res)
            setData(res.data.data)
            setImg(res.data.data.image)
            let checkImg=JSON.parse(res.data.data.image)
            //  console.log(checkImg)
            setchangeImg(checkImg[0])
        })
        .catch(error=> console.log(error))
    },[])
    function renderData(){
        if(Object.keys(data).length>0){
            return(
               <>
                <div className="col-sm-5">
                <div className="view-product">
                                                                                          {/* **** */}
                <img src={"http://localhost/laravel8/public/upload/product/" + data.id_user+"/" + changeImg }alt="" />
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                {/* Wrapper for slides */}
                  <div className="carousel-inner">
                      {renderImg()}
                  </div>
                  {/* Controls */}
                  <a className="left item-control" href="#similar-product" data-slide="prev">
                      <i className="fa fa-angle-left" />
                  </a>
                  <a className="right item-control" href="#similar-product" data-slide="next">
                      <i className="fa fa-angle-right" />
                  </a>
                </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">{/*/product-information*/}
                          <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                          <h2>{data.name}</h2>
                          <p>Web ID: {data.web_id}</p>
                          <img src="images/product-details/rating.png" alt="" />
                          <span>
                              <span>${data.price}</span>
                              <label>Quantity:</label>
                              <input type="text" defaultValue={3} />
                              <button type="button" className="btn btn-fefault cart">
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                              </button>
                          </span>
                          
                          <p><b>Availability:</b> In Stock</p>
                          <p><b>Condition:{data.condition}</b> New</p>
                          <p><b>Brand:{data.id_brand}</b> E-SHOPPER</p>
                          <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>{/*/product-information*/}
                    </div>
                </> 
            )
        }
    }
   
    function renderImg(){
        return Object.keys(data).map((keys,index)=>{
            
            return(
                <div className={index==0 ? "item active": "item"}>
                        {renderdataImg()}
                </div> 
            )
        })
    }
    function renderdataImg(){
      let checkImg=imgData
      let idUser=data.id_user
      if(checkImg){
        checkImg=JSON.parse(imgData)
      
        if(checkImg.length>0){
          return checkImg.map((value,index)=>{
            return(
              <>
                <a>
                  <img alt="" id={value}  onClick={handleImg} className='productdetail' src={"http://localhost/laravel8/public/upload/product/"+idUser+"/"+ value }/>
                </a>
              </>

            )
          })
        }
      }
    }
    function handleImg(e){
        let getId=e.target.id
        console.log(getId)
        setchangeImg(getId)    
    }
   
    return (
        <div className="col-sm-9 padding-right">
          <div className="product-details">{/*product-details*/}
              {renderData()}
          </div>{/*/product-details*/}
        
          <div className="recommended_items">{/*recommended_items*/}
            <h2 className="title text-center">recommended items</h2>
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="item active">	
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="https://www.missguided.co.uk/images/menus/miss-mob-menu-imgs-june23-clothing.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="https://digitalcontent.api.tesco.com/v2/media/homepage/8e6cb152-8176-4613-88ad-f635d591ff7b/2317-FF-HERO-Carousel-734x380-1.jpeg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGf--UVY5_iKvIzY01jqki8HCXa3z95ZfCA&usqp=CAU" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="item">	
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/recommend1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/recommend2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/recommend3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                <i className="fa fa-angle-left" />
              </a>
              <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                <i className="fa fa-angle-right" />
              </a>			
            </div>
          </div>{/*/recommended_items*/}
        </div>
    )
  }
  
  export default ProductDetail;
