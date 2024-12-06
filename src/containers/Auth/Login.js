import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnchangeUsername=(event) =>{
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async() => {
        this.setState({
            errMessage: ''
        })
        try {
             let data = await handleLoginApi(this.state.username, this.state.password)
                if(data && data.errCode !== 0){
                    this.setState({
                        errMessage: data.message,
                    })
                }
                if(data && data.errCode === 0){
                    this.props.userLoginSuccess(data.user)
                }
            
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                    errMessage: error.response.data.message
                 })
                }
            }
            
        } 
    }

    handleKeyDown = (event) =>{
        if(event.key === "Enter" || event.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {
        //JSX
        return (
          <div className='bofy'>
                <div className="glass-container">
                    <div className="login-box">
                        <h2 className='title-login'>Login</h2>
                        <form >
                            <input type="text" required placeholder="Username"   
                            value={this.state.username}
                            onChange={(event) => {this.handleOnchangeUsername(event)}}/>

                            <input type="password" required placeholder="Password"  
                                value={this.state.password}
                                onChange={(event) => {this.handleOnchangePassword(event)}}
                                onKeyDown={(event) => this.handleKeyDown(event)}/>

                        <div className='texterr' style={{color: 'white'}}>
                            {this.state.errMessage}
                        </div>
                        <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        
                        </form>
                    </div>
                </div>
          </div>
          
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
