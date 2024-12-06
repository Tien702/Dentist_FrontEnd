import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import '../Homepage.scss';
import './Chooseme.scss';
import bg1 from '../../../assets/images/thumbnail.png';
class Chooseme extends Component {

    render() {
        return (
           <section className="chooseme-layout bp-0">
            <div className="container">
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <div className='heading text-center mb-40'>
                            <h3 className='heading_title'>Tại Sao Chọn Chúng Tôi?</h3>
                            <p>
                                Dịch vụ nổi bật mà chúng tôi đang phục vụ quý khách
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div class="col-sm-12 col-md-12 col-lg-3">
                            <div class="feature-item">
                                <div className='feature-content'>
                                    <div className='feature-icon'>
                                    <i className="fa fa-hand-holding-heart"></i>
                                    </div>
                                    <h4 className='feature-title'>Tận Tình Với Khách Hàng</h4>
                                </div>
                            </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-3">
                            <div class="feature-item">
                                <div className='feature-content'>
                                    <div className='feature-icon'>
                                    <i className="fa fa-user"></i>
                                    </div>
                                    <h4 className='feature-title'>Chuyên Gia/Nha Sĩ Hàng Đầu</h4>
                                </div>
                           </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-3">
                            <div className="feature-item">
                                <div className='feature-content'>
                                    <div className='feature-icon'>
                                    <i className="fa fa-truck-moving"></i>
                                    </div>
                                    <h4 className='feature-title'>Dịch Vụ Chất Lượng Cao</h4>
                                </div>
                            </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-3">
                            <div className="feature-item">
                                <div className='feature-content'>
                                    <div className='feature-icon'>
                                    <i className="fa fa-syringe"></i>
                                    </div>
                                    <h4 className='feature-title'>Trang Thiết Bị Hiện Đại</h4>
                                </div>
                            </div>
                    </div>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Chooseme);
