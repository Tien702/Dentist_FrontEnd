import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import bg1 from "../../assets/images/MT.jpg"
import './HomeHeader.scss';
import './HomeFooter.scss';

class HomeFooter extends Component {

    render() {
        

        return (
      
        <section class="footer-layout bp-0">
            <div class="container">
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-6'>
                       <div className='box-right'>
                       <img className="img-footer"src={bg1}/>
                        <p>
                          <i className="fa fa-map-marker"/>
                          <strong> 382 Núi Thành, Hải Châu, Đà Nẵng</strong>
                        </p>
                        <p>
                          <i className="fa fa-phone"/>
                          <strong> 0378.357.741</strong>
                        </p>
                        <p>
                          <i className="fa fa-envelope"/>
                          <strong> minhtienb445@gmail.com</strong>
                        </p>
                       </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6">
                            <div className='box-left'>
                                <h6 className='footer-widget'>Liên Hệ</h6>
                                <ul className='contact-list'>
                                    <li>Liên hệ với chúng tôi</li>
                                    <li>
                                        <a href='tel:0378357741' className='phone_number'>
                                           <i className="fa fa-phone"/>
                                           <span> (+84) 378357741</span>
                                        </a>
                                    </li>
                                    <li>
                                        <p>
                                            Địa chỉ: 382 Núi Thành, Hải Châu, Đà Nẵng.
                                            <a target='_blank' className='btn' href='https://maps.app.goo.gl/34xvY3sLjhToNXUR6'>
                                               <i className='fa fa-arrow-right'></i>
                                               <span> Xem chỉ đường</span>
                                            </a>
                                           
                                        </p>
                                    </li>
                                </ul>
                    </div>

                   
                </div>
                </div>
                <div className='home-footer'>
                    <p>&copy; 2024 Mt.com - More information <a target='_blank' href='https://www.facebook.com/Tien702'>&#8594; In Here &#8592;</a></p>
                </div>
            </div>
       </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
