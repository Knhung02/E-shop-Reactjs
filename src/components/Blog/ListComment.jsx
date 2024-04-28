
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
          if(value.id_comment == 0){
              return(
              <>
                  <li key={key} className="media">
                      <Link className="pull-left" to="#">
                        <img className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + value.image_user  } alt="" />
                      </Link>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" />{value.name_user}</li>
                            <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                            <li><i className="fa fa-calendar" /> {value.updated_at}</li>
                        </ul>
                        <p>{value.comment}</p>
                        <Link id={value.id} className="btn btn-primary" onClick={handleReply} to="#reply"><i className="fa fa-reply" />Replay</Link>
                      </div>
                  </li>
                  {
                    getListcomment.map((value2,key2)=>{
                    
                      if(value2.id_comment == value.id){
                          return(
                              <li key={key2} className="media second-media">
                                  <Link className="pull-left" to="#">
                                  <img className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + value2.image_user } alt="" />
                                  </Link>
                                  <div className="media-body">
                                      <ul className="sinlge-post-meta">
                                          <li><i className="fa fa-user" />{value2.name_user}</li>
                                          <li><i className="fa fa-clock-o" /> {value2.created_at}</li>
                                          <li><i className="fa fa-calendar" /> {value2.updated_at}</li>
                                      </ul>
                                      <p>{value2.comment}</p>

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

