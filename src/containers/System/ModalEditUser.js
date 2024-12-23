import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber:'',
            address: ''
        }

        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('Clear_Modal_Data', ()=>{
            this.state={
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber:'',
                address: ''
            }
        })
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        }
        console.log('didmount edit modal', this.props.currentUser)
    }

    toggle = () =>{
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event,id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    CheckValidateInput = () =>{
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName','phoneNumber', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameters: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () =>{
        let isValid = this.CheckValidateInput();
        if(isValid === true){
            //call api edit modal
            this.props.editUser( this.state);
        }
    }

    render() {
        console.log('check props from parents', this.props)
        return (
            <Modal isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                >
                <ModalHeader toggle={()=>{this.toggle()}}> Edit User</ModalHeader>
                <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text" 
                                onChange={(event) => {this.handleOnChangeInput(event,"email")}}
                                value = {this.state.email}
                                disabled
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" 
                                onChange={(event) => {this.handleOnChangeInput(event,"password")}}
                                value = {this.state.password}
                                disabled
                                />
                            </div>
                            <div className="input-container">
                                <label>First Name</label>
                                <input type="text" 
                                onChange={(event) => {this.handleOnChangeInput(event,"firstName")}}
                                value = {this.state.firstName}
                                />
                            </div>
                            <div className="input-container">
                                <label>Last Name</label>
                                <input type="text" 
                                onChange={(event) => {this.handleOnChangeInput(event,"lastName")}}
                                value = {this.state.lastName}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Phone Number</label>
                                <input type="number" 
                                onChange={(event) => {this.handleOnChangeInput(event,"phoneNumber")}}
                                value = {this.state.phoneNumber}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input type="text" 
                                onChange={(event) => {this.handleOnChangeInput(event,"address")}}
                                value = {this.state.address}
                                />
                            </div>
                        </div>
                    
                            
                </ModalBody>
                <ModalFooter>
                    <button color="primary" className="save px-3" 
                        onClick={() => {this.handleSaveUser()}}>
                        Save Changes
                        </button>
                    <button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Cancel</button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




