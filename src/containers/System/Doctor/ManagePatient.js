import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-flatpickr';
import './ManagePatient.scss';
import { LANGUAGES} from '../../../utils';
import RemedyModal from './RemedyModal';
import {getAllPatientForDoctor, postSendRemedy} from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount(){
        this.getDataPatient()
    }

    getDataPatient = async() =>{
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }
    handleOnchangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        },async ()=>{       
            await this.getDataPatient()
        })

    }
    handleBtnConfirm = (item) =>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () =>{
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async(dataChild) =>{
        let { dataModal} = this.state;
        this.setState({
            isShowLoading: true
        })

        let res =await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        });
        if(res && res.errCode === 0 ){
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy Success');
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Send Remedy Failded');
            console.log('res: ', res)
        }
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isShowLoading } = this.state;
        let {language } = this.props;
        console.log('language: ', this.state)
        return (
            <>
            <LoadingOverlay 
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading...."
                >
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản Lý Danh Sách Bệnh Nhân Khám
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%'}}>
                                <tbody>

                                    <tr>
                                        <th>STT</th>
                                        <th>Thời Gian</th>
                                        <th>Họ Và Tên</th>
                                        <th>Địa Chỉ</th>
                                        <th>Giới Tính</th>
                                        <th>Hành Động</th>
                                    </tr>

                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) =>{
                                            let time = language === LANGUAGES.VI ? 
                                            item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;

                                            let gender1 = language === LANGUAGES.VI ? 
                                            item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                            return(
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender1}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Xác Nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                           <td colSpan='6' style={{textAlign: 'center'}}>No Date....</td>
                                        </tr>    
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy = {this.sendRemedy}
                />
                </LoadingOverlay>
            </>
           
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
