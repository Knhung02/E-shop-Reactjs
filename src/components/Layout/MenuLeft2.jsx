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
                            <Link data-toggle="collapse" data-parent="#accordian" to="#sportswear" >
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                <Link to="/account/update">ACCOUNT</Link>
                            </Link>
                          </h4>
                        </div>
                        <div id="sportswear" className="panel-collapse collapse">
                          <div className="panel-body">
                            <ul>
                              <li><Link to = "#">Nike </Link></li>
                              <li><Link to = "#">Under Armour </Link></li>
                              <li><Link to = "#">Adidas </Link></li>
                              <li><Link to = "#">Puma</Link></li>
                              <li><Link to = "#">ASICS </Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to ="/account/my-product">
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                              MY PRODUCT
                            </Link>
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