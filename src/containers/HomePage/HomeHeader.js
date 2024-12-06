import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logob from '../../assets/images/MT.jpg';
import banner1 from '../../assets/images/About/Banner/Banner1.webp';
import banner2 from '../../assets/images/About/Banner/Banner2.jpg';
import banner3 from '../../assets/images/About/Banner/Banner3.jpg';
import banner4 from '../../assets/images/About/Banner/Banner4.jpg';
import banner5 from '../../assets/images/About/Banner/Banner5.jpg';
import user from '../../assets/images/avatar.png';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import {changeLanguageApp} from "../../store/actions";
import { withRouter } from 'react-router';
import Slider from 'react-slick';
// import LoginModal from '../HomePage/LoginUser/LoginModal';
class HomeHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpenModalBooking: false,
        }
    }
    
    changeLanguage = (language) =>{
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () =>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    // handletoLogin= (item) =>{
    //     if(this.props.history){
    //         this.props.history.push(`/login`)
    //     }
    // }
    handleClickLoginUser = () =>{
        this.setState({
            isOpenModalBooking: true,
        })  
    }
    closeBookingClose = () =>{
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        
        let language = this.props.language;
        let { isOpenModalBooking} = this.state;
        var setting = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
          };
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                        <img className='header-logo' src={logob} onClick={() => this.returnToHome()}/>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.aboutme'/></b></div>
                                {/* <div className='subs-title'><FormattedMessage id='home-header.searchdoctor'/></div> */}
                            </div>
                             
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id='home-header.specialty'/></b>
                                </div>
                                    {/* <div className='subs-title'><FormattedMessage id='home-header.chooseDoctor'/></div> */}
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.doctor'/></b></div>
                                    {/* <div className='subs-title'><FormattedMessage id='home-header.chooseDoctor'/></div> */}
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.count'/></b></div>
                                    {/* <div className='subs-title'><FormattedMessage id='home-header.chooseDoctor'/></div> */}
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fas fa-question-circle'><FormattedMessage id='home-header.support'/></i>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>
                    </div>
                        </div>
                        {this.props.isShowBanner === true &&
                        <div className='home-header-banner'>
                                <Slider {...setting}>
                                    <img src={banner1}/>
                                    <img src={banner2}/>
                                    <img src={banner3}/>
                                    <img src={banner4}/>
                                    <img src={banner5}/>
                                </Slider>
                        </div>
                 }
                 {/* <LoginModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose = {this.closeBookingClose}
                /> */}
            </React.Fragment>
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
        changeLanguageAppRedux:(language) =>dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)); 
