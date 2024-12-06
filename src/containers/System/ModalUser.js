import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {

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

    handleAddNewUser = () =>{
        let isValid = this.CheckValidateInput();
        if(isValid === true){
            //call api create modal
            this.props.createNewUser( this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                >
                <ModalHeader toggle={()=>{this.toggle()}}> Create A New User</ModalHeader>
                <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text" 
                                onChange={(event) => {this.handleOnChangeInput(event,"email")}}
                                value = {this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" 
                                onChange={(event) => {this.handleOnChangeInput(event,"password")}}
                                value = {this.state.password}
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
                    <button color="primary" className=" save px-3" 
                        onClick={() => {this.handleAddNewUser()}}>
                        Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




