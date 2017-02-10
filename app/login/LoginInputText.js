import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, TextInput, Image} from "react-native";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class LoginInputText extends Component {
    static defaultProps = {
        leftIcon: true,
        rightIcon: true,

        leftIconUri: require('./../../images/test.jpg'),
        rightIconUri: require('./../../images/test.jpg'),

        textPlaceholder: '请输入',
    };

    static propTypes = {
        leftIcon: PropTypes.bool,
        rightIcon: PropTypes.bool,

        leftIconUri: PropTypes.number,
        rightIconUri: PropTypes.number,
        textPlaceholder: PropTypes.string,

        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        leftIconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        rightIconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        viewStytle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    }

    render() {
        return (
            <View style={[styles.componentStyle,this.props.viewStytle]}>

                {
                    this.props.leftIcon ?
                        <Image source={this.props.leftIconUri}
                               style={[styles.iconStyle, this.props.leftIconStyle]}/>
                        : null
                }

                <View style={
                    {flex: 1,
                     flexDirection:'row',
                     borderBottomWidth:1,
                     borderBottomColor:'lightgrey',
                     alignItems:'center'}}>

                    <TextInput
                        underlineColorAndroid={"#00000000"}
                        placeholder={this.props.textPlaceholder}
                        placeholderTextColor={'#848484'}
                        password={true}
                        style={[styles.textInputStyle,this.props.inputTextStyle]}/>

                    {
                        this.props.rightIcon ?
                            <Image source={this.props.rightIconUri}
                                   style={[styles.iconStyle,this.props.rightIconStyle]}/>
                            : null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    componentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        height: 40,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 15,
        flex: 1,
    },
    iconStyle: {
        width: 30,
        height: 30,
        backgroundColor:'#cc092f'
    },

});