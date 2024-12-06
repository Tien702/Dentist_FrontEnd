import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Session/Specialty';
import Clinic from './Session/Clinic';
import OutStandingDoctor from "./Session/OutStandingDoctor";
import HandBook from './Session/HandBook';
import About from './Session/About';
import HomeFooter from './HomeFooter';
import InfoPage from "./Session/InfoPage";
import Chooseme from "./Session/Chooseme"
import Count from "./Session/Count";
import BookingSession from "./Session/BookingSession";
import "./Homepage.scss";


class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
        };
        
        return (

            <div>
                
                <HomeHeader isShowBanner={true}/>
                <InfoPage/>
                <Chooseme/>
                <Count/>
                <OutStandingDoctor
                    settings={settings}/>
                <Specialty 
                    settings={settings}/>
                 {/* <BookingSession/> */}
                {/* <Clinic
                    settings={settings}/> */}
                {/* <HandBook
                    settings={settings}/> */}
                <About/>
                <HomeFooter/>
              
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
