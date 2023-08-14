import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import Comment from "./Comment";
import ListComment from "./ListComment";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function BlogDetail(){

  let params = useParams()
   
  const [value, setData] = useState([])
  const [listCmt, setListCmt] = useState([])
  const [idRep, setIdRep] =  useState("");
  useEffect(() =>{
      axiosClient.get("/blog/detail/" + params.id)
      .then(res=>{
        // console.log(res)
        setData(res.data.data)
        // set list comment nằm trong list comment
        setListCmt(res.data.data.comment)
        
    })
    .catch(error => console.log(error))
  },[])

  function getCmt(x){ 
    console.log(x)
    setListCmt(listCmt.concat(x))
  }
  function getIdREP(data){
    setIdRep(data)
  }

  function renderData(){
    // console.log(value)
    if(Object.keys(value).length>0){
      return(
        <div className="single-blog-post">
            
            <h3>{value.title}</h3>
            <div className="post-meta">
                <ul>
                    <li><i className="fa fa-user" /> {value.id_auth}</li>
                    <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                    <li><i className="fa fa-calendar" /> {value.updated_at}</li>
                </ul>
                <span>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-o" />
                </span>
            </div>
            <Link to = "#">
            <img src={"http://localhost/laravel8/public/upload/Blog/image/" + value.image} alt="" />
            </Link>
            <p>{value.content}</p>
            <div className="pager-area">
            <ul className="pager pull-right">
                <li><Link to="#">Pre</Link></li>
                <li><Link to="#">Next</Link></li>
            </ul>
            </div>
        </div>
      )
    }    
  }

	return(
        <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}
          <Rating idBlog = {params.id}/>
          <ListComment  listCmt = {listCmt} getIdREP= {getIdREP}/>
          <Comment idBlog = {params.id} getCmt= {getCmt} idRep = {idRep}/>
         </div>
      </div>
	)
}
export default BlogDetail;