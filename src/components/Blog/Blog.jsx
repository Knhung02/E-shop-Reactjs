
import React, {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import { Link } from "react-router-dom";
function Blog(){

  const [data, setData] = useState([])
    
  useEffect(() =>{
      axiosClient.get("/blog")
      .then(res=>{
          // console.log(res)
          setData(res.data.blog.data)
      })
      .catch(error => console.log(error))
  },[])
  function renderData(){
      if(data.length >0){
          return data.map((value,key)=>{
            // console.log(value)
              return(
                <div key={key} className="single-blog-post">
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
                  <p>{value.description}</p>
                  <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                </div>
              )
          })
      }
  }

	return(
			 <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}   
          <div className="pagination-area">
            <ul className="pagination">
              <li><Link to = "#" className="active">1</Link></li>
              <li><Link to = "#">2</Link></li>
              <li><Link to = "#">3</Link></li>
              <li><Link to = "#"><i className="fa fa-angle-double-right" /></Link></li>
            </ul>
          </div>
        </div>
      </div>
	)
}
export default Blog;