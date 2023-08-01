import React from 'react';
import { Link } from 'react-router-dom';

function MenuLeft2(){
    
        return(
            <div>
                <div className="col-sm-3">
                  <div className="left-sidebar">
                    <h2>ACCOUNT</h2>
                    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordian" href="#sportswear" >
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                <Link to="/account/update">ACCOUNT</Link>
                            </a>
                          </h4>
                        </div>
                        <div id="sportswear" className="panel-collapse collapse">
                          <div className="panel-body">
                            <ul>
                              <li><a href>Nike </a></li>
                              <li><a href>Under Armour </a></li>
                              <li><a href>Adidas </a></li>
                              <li><a href>Puma</a></li>
                              <li><a href>ASICS </a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordian" href="/account/my-product">
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                              MY PRODUCT
                            </a>
                          </h4>
                        </div>
                      
                      </div>
                      

                    </div>{/*/category-products*/}
                    
                  </div>
              </div>
            </div>
        )
        
    }


export default MenuLeft2;	