
import React from "react";
import { Link } from "react-router-dom";

function ListComment(props){
  const getListcomment=props.listCmt
  function handleReply(e){
    props.getIdREP(e.target.id)
             
  }

  function renderData(){
    // console.log(getId)
   
    // console.log(getListcomment)
      if(getListcomment.length >0){
        return getListcomment.map((value,key)=>{
          // console.log(value.id)
          if(value.id_comment==0){
              return(
              <>
                  <li className="media">
                      <a className="pull-left" href="#">
                      <img className="media-object" src={"/upload/user/avatar/" + value.image_user  } alt="" />
                      </a>
                      <div className="media-body">
                      <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user" />{value.name_user}</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                      </ul>
                      <p>{value.comment}</p>
                      <a id={value.id} className="btn btn-primary" onClick={handleReply} href="#traloi"><i className="fa fa-reply" />Replay</a>
                      </div>
                  </li>
                  {getListcomment.map((value2,index)=>{
                    
                      if(value.id == value2.id_comment){
                          return(
                              <li className="media second-media">
                                  <a className="pull-left" href="#">
                                  <img className="media-object" src={"/upload/user/avatar/" + value2.image_user } alt="" />
                                  </a>
                                  <div className="media-body">
                                      <ul className="sinlge-post-meta">
                                          <li><i className="fa fa-user" />{value2.name_user}</li>
                                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                      </ul>
                                      <p>{value2.comment}</p>
                                      <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
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