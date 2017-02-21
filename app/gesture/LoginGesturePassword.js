var React = require('react');
var {
    AppRegistry,
} = require('react-native');

import PasswordGesture from './index';
import BaseComponent from '../component/BaseComponent';

var Password = '';
export default class GesturePassword extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    initFinish = () => {
    }

    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
            />
        );
    }

    onResetActive() {
        this.refs.pg.resetActive();
    }

    onEnd(pwd) {
        if (Password === '') {
            // The first password
            Password = pwd;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if (pwd === Password) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + pwd
                });
                Password = '';
                // your codes to close this view
                // this.toNextPage({
                //     name: 'Register',
                //     component: Register,
                //     params: {},
                // })
            } else {
                this.setState({
                    status: 'wrong',
                    message: 'Not the same, try again.'
                });
            }
        }
        this.onResetActive();
    }

    onStart() {
        if (Password === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
    }
}
