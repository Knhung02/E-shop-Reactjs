
import React from "react";
import { Link } from "react-router-dom";

function ListComment(props){
  const getListcomment=props.listCmt
  function handleReply(e){
    props.getIdREP(e.target.id);
  };
  function renderData(){
    // console.log(getId)
   
    // console.log(getListcomment)
      if(getListcomment.length >0){
        return getListcomment.map((value,key)=>{
          // console.log(value.id)
          if(value.id_comment===0){
              return(
              <>
                  <li className="media">
                      <Link className="pull-left" to="#">
                        <img className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + value.image_user  } alt="" />
                      </Link>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" />{value.name_user}</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <p>{value.comment}</p>
                        <Link id={value.id} className="btn btn-primary" onClick={handleReply} to="#traloi"><i className="fa fa-reply" />Replay</Link>
                      </div>
                  </li>
                  {getListcomment.map((value2,index)=>{
                    
                      if(value.id === value2.id_comment){
                          return(
                              <li className="media second-media">
                                  <Link className="pull-left" to="#">
                                  <img className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + value2.image_user } alt="" />
                                  </Link>
                                  <div className="media-body">
                                      <ul className="sinlge-post-meta">
                                          <li><i className="fa fa-user" />{value2.name_user}</li>
                                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                      </ul>
                                      <p>{value2.comment}</p>
                                      <Link className="btn btn-primary" to="#"><i className="fa fa-reply" />Replay</Link>
                                  </div>
                              </li>
                          )
                      }
                  })
    
                  }
              </>
              )
              
          }
        })
      }
}

	return(
		<div className="response-area">
      <h2>{getListcomment.length} RESPONSES</h2>
      <ul className="media-list">
        {renderData()}
      </ul>			
    </div>

	)
}
export default ListComment;