import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Homepage.scss';
import { FormattedMessage } from 'react-intl';
import {getAllClinic} from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

class Clinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount(){
        let res = await getAllClinic();
        if(res && res.errCode === 0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (item) =>{
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let { dataClinics } = this.state
        return (
           <div className='section-share section-clinic'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> <FormattedMessage id='homepage.clinic'/></span>
                        <button className='btn-section'> <FormattedMessage id='homepage.more-info'/></button>
                    </div>
                    <div className='section-body'>
                    <Slider {...this.props.settings}>
                    {dataClinics && dataClinics.length > 0 &&
                            dataClinics.map((item, index) =>{
                                return(
                                    <div className="section-customize clinic-child" key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div
                                         className='bg-image section-clinic'
                                        style={{backgroundImage: `url(${item.image})`}}
                                         />
                                    <div className='clinic-name'>{item.name}</div>
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Clinic));
