import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import '../Homepage.scss';
class OutStandingDoctor extends Component{

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) =>{
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render(){
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return(
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id='homepage.outstanding-doctor'/>
                        </span>
                        <p className='title-outstanding-doctor'>
                            " Đội ngủ Nha sĩ - chuyên gia hàng nhiều năm kinh nghiệm với tay nghề cao của Nha Khoa Minh Tiến..."
                        </p>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item,index) =>{
                                    let imageBase64 = '';
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return(
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})`}}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                {/* <div>Cơ Xương Khớp</div> */}
                                            </div>                            
                                        </div>                                           
                                    </div>
                                    )
                                })
                            }
                      
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));