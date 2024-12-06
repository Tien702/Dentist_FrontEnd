import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import '../Homepage.scss';
import './BookingSession.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES} from '../../../utils';
import Select from 'react-select';
class BookingSession extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedOption: '',
            listDoctors: [],
            hasOldData: false,
            listSelectSpec: [],
            selectedSpec: '',
        }
   }
   buildDataInputSelect = (inputData, type) =>{
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 ){
            if(type === 'USERS'){
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }  return  result;
        }
        return  result;
        
}
   async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllSeclectSpec();
  }
  componentDidUpdate(prevProps,prevState,snapshot){
    if(prevProps.AllSeclectSpec !== this.props.AllSeclectSpec){
        let dataSelectSpec= this.props.AllSeclectSpec;
        console.log('check data dịch vụ: ', dataSelectSpec);
        this.setState({
            listSelectSpec: dataSelectSpec
        })
        
    }
    if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
        console.log('check data list doctor: ', dataSelect);
        this.setState({
            listDoctors: dataSelect
        })
    }

    
}
handleChangeSelectDoctor = async (selectedOption) => {
    this.setState({
        selectedOption
    });
}
handleChangeSelectSpec = async (selectedSpec) => {
    this.setState({
        selectedSpec
    });
}
    render() {
        let listSelectSpec = this.state.listSelectSpec;
        console.log('check lisssss', listSelectSpec);
        return (
                <div className="container-booking">
                    <div className="row-booking">
                        <div className="content-left-booking col-sm-12 col-md-12 col-lg-5 d-flex flex-column justify-content-between">
                            <div>
                                <div className="heading heading-light mb-30">
                                    <h3 className="heading-title-booking mb-30">Đặt lịch khám trực tuyến để tiết kiệm thời gian.</h3>
                                    <div className="heading-desc-booking">
                                        <p>
                                            Để không cần mất nhiều thời gian chờ đợi tại phòng khám. Hãy đặt lịch khám trực tuyến phù hợp và bạn chỉ cần đến trước 5 phút để nhân viên chúng tôi tiếp nhận.
                                        </p>
                                        <p>Ngoài đặt lịch khám bạn cũng có thể tham gia trao đổi trực tuyến với chuyên viên, bác sĩ của chúng tôi (nếu họ đang rảnh)</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="content-right-booking col-sm-12 col-md-12 col-lg-7">
                            <div className="contact-panel mb-50">
                                <form className="contact-panel__form" method="post" action="#" id="contactForm" novalidate="novalidate">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h4 className="contact-panel__title">Đặt lịch khám</h4>
                                            <p className="contact-panel__desc mb-30">
                                                Hoàn thành một số thông tin dưới đây để chúng tôi biết bạn là ai và đang cần phục vụ dịch vụ nào
                                            </p>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <i className="icon-widget form-group-icon"></i>
                                                <Select
                                                    value={this.state.selectedSpec}
                                                    onChange={this.handleChangeSelectSpec}
                                                    options={this.state.listSelectSpec}
                                                    placeholder="Chọn Dịch Vụ"
                                                />
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <i className="icon-user form-group-icon"></i>
                                                <Select
                                                    value={this.state.selectedOption}
                                                    onChange={this.handleChangeSelectDoctor}
                                                    options={this.state.listDoctors}
                                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                                                    />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <i className="icon-news form-group-icon"></i>
                                                <input type="text" className="form-control" placeholder="Họ và tên" id="contact-name" name="contact-name" required="" aria-required="true"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <i className="icon-email form-group-icon"></i>
                                                <input type="email" className="form-control" placeholder="Email" id="contact-email" name="contact-email" required="" aria-required="true"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-12">
                                            <div className="form-group">
                                                <i className="icon-phone form-group-icon"></i>
                                                <input type="text" className="form-control" placeholder="Điện thoại" id="contact-Phone" name="contact-phone" required="" aria-required="true"/>
                                            </div>
                                        </div>
                                        {/* <div className="col-sm-4 col-md-4 col-lg-6">
                                            <div className="form-group form-group-date">
                                                <i className="icon-calendar form-group-icon"></i>
                                                <input type="date" className="form-control" id="contact-date" name="contact-date" required="" aria-required="true"/>
                                            </div>
                                        </div> */}
                                        <div className="col-12">
                                            <button type="submit" className="btn mt-10">
                                                <span>Đặt ngay</span>
                                            </button>
                                            <div className="contact-result"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
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
        AllSeclectSpec: state.admin.AllSeclectSpec,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllSeclectSpec: () => dispatch(actions.getAllSeclectSpec()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingSession);
