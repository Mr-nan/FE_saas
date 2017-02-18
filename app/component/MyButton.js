import React, {Component,PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

export default class MyButton extends PureComponent {

    static TEXTBUTTON = "textbutton";
    static IMAGEBUTTON = "imagebutton";

    render() {
        if (this.props.buttonType == MyButton.TEXTBUTTON) {
            return (
                <TouchableOpacity style={this.props.parentStyle} onPress={this.props.mOnPress}
                                  activeOpacity={this.props.opacity==null?0.5:this.props.opacity}>
                    <Text style={this.props.childStyle}>{this.props.content}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={this.props.parentStyle} onPress={this.props.mOnPress}
                                  activeOpacity={this.props.opacity==null?0.5:this.props.opacity}>
                    <Image style={this.props.childStyle} source={this.props.content}/>
                </TouchableOpacity>
            );
        }

    }
}