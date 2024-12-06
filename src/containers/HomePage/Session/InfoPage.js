import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import '../Homepage.scss';
import './InfoPage.scss';
import bg1 from '../../../assets/images/thumbnail.png';
class HandBook extends Component {

    render() {
        return (
           <section class="info-layout bp-0">
            <div class="container">
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-6'>
                        <div className='heading-layout2'>
                            <h3 className='heading_title mb-40'>
                                Giới thiệu về Nha Khoa
                                <strong className='color1'> MinhTien </strong>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="about__Text">
                                <p class="mb-30">
                                    Nha Khoa <strong>Minh Tiến</strong> – Thành viên của Peace Dentistry là nha khoa chuẩn quốc tế, được giới chuyên môn đánh giá cao 
                                    về chất lượng điều trị lẫn dịch vụ khách hàng. Thế mạnh của Nha Khoa <strong>Minh Tiến</strong> – Thành viên của Peace Dentistry 
                                    là điều trị bệnh lý, phục hồi sức khỏe và thẩm mỹ răng miệng cho bệnh nhân.
                                </p>
                                <p class="mb-30">
                                    Lấy giá trị cốt lõi là “dịch vụ nha khoa chuẩn mực” cùng sứ mệnh “kiến tạo nụ cười hạnh phúc đến tất cả khách hàng”, sau hơn 15 
                                    năm hoạt động, Nha Khoa <strong>Minh Tiến</strong> – Thành viên của Peace Dentistry đã trở thành lựa chọn hàng đầu của khách hàng 
                                    tại Đồng Nai, thành phố Hồ Chí Minh, các tỉnh thành lân cận và kiều bào nước ngoài.
                                </p>
                            </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-6'>
                      <div className='video'>
                        <iframe width="660" height="415" src="https://www.youtube.com/embed/jbv_oefhoa4?si=sIWpfeTlzSz5V2ZA" 
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
