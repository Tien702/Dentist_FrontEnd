import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import {getAllcodeService, createNewUserService} from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',

        }
    }

    async componentDidMount() {  
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps,prevState,snapshot){

        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ' '
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ' '
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ' '

            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ' ',
                position:  arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ' ',
                role:  arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ' ',
                avatar:'',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL:''
            })
        }
    }
    handleOnChangeImg =async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
            
        }
    }

    openPreviewImg =() =>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = ()=>{
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let {action} = this.state;
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar

            });
        }
    }

    checkValidateInput = () =>{
        let isValid = true;
        let arrCheck =['email', 'password', 'firstName', 
        'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required: '+ arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id)=>{
        let copyState = { ...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check input: ', this.state)
        }) 
    }

    handleEditUserFromParent = (user) =>{
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName : user.firstName,
            lastName : user.lastName,
            phoneNumber : user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar:'',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isgetGender = this.props.isLoadingGender;
        let language = this.props.language;
        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                   Create User 
                </div>
                <div className="user-redux-body">
                <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-users.add'/></div>
                            <div className='col-12'>{isgetGender === true ? 'Loading Gender...' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.email'/></label>
                                <input className='form-control' type='email'
                                value={email}
                                onChange={(event)=> {this.onChangeInput(event,'email')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.password'/></label>
                                <input className='form-control' type='password'
                                value={password}
                                onChange={(event)=> {this.onChangeInput(event,'password')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.firstname'/></label>
                                <input className='form-control' type='text'
                                value={firstName}
                                onChange={(event)=> {this.onChangeInput(event,'firstName')}}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.lastname'/></label>
                                <input className='form-control' type='text'
                                value={lastName}
                                onChange={(event)=> {this.onChangeInput(event,'lastName')}}/>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.phonenumber'/></label>
                                <input className='form-control' type='text'
                                value={phoneNumber}
                                onChange={(event)=> {this.onChangeInput(event,'phoneNumber')}}/>
                            </div>

                            <div className='col-9'>
                                <label><FormattedMessage id='manage-users.address'/></label>
                                <input className='form-control' type='text'
                                value={address}
                                onChange={(event)=> {this.onChangeInput(event,'address')}}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.gender'/> </label>
                                <select className='form-control'
                                 value={gender}
                                 onChange={(event)=> {this.onChangeInput(event,'gender')}}
                                >
                                {genders && genders.length > 0 &&
                                        genders.map((item,index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.position'/> </label>
                                <select className='form-control'
                                    onChange={(event)=> {this.onChangeInput(event,'position')}}
                                    value={position}
                                >
                                {positions && positions.length > 0 &&
                                        positions.map((item,index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.roleid'/> </label>
                                <select className='form-control'
                                    onChange={(event)=> {this.onChangeInput(event,'role')}}
                                    value={role}
                                >
                                {roles && roles.length > 0 &&
                                        roles.map((item,index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.image'/> </label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden 
                                    onChange={(event) => this.handleOnChangeImg(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={() => this.openPreviewImg()}
                                    >

                                    </div>
                                </div>
                            </div> 
                            <div className='col-12 mt-3 mb-5'>
                            <button className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : 'btn btn-primary'}
                                onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id='manage-users.edit'/>
                                        :
                                    <FormattedMessage id='manage-users.save'/>
                                    
                                    }
                                    </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <div className='title'>
                                        Table User
                                </div>
                                <TableManageUser
                                handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                action = {this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && 
                                <Lightbox
                                mainSrc = {this.state.previewImgURL}
                                onCloseRequest={() => this.setState({
                                    isOpen: false
                                })}
                            />
                        }
            </div>

                
            
      
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
