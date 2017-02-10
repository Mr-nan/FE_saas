import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class LoginInputText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rightIconLodding: false,
        }
        values: ""; //输入框输入内容
    }

    static defaultProps = {
        leftIcon: true,
        rightIcon: true,


        leftIconUri: require('./../../images/test.jpg'),
        rightIconUri: require('./../../images/test.jpg'),

        textPlaceholder: '请输入',
        keyBoard: 'default'
    };

    static propTypes = {
        leftIcon: PropTypes.bool,
        rightIcon: PropTypes.bool,

        leftIconUri: PropTypes.number,
        rightIconUri: PropTypes.number,
        textPlaceholder: PropTypes.string,
        keyBoard: PropTypes.string,  //键盘类型

        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        leftIconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        rightIconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        viewStytle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        rightIconClick: PropTypes.func,//定义搜索结果控件
    }

    clickBtn() {
        alert("未设置点击事件")
    }

    //改变右边图标的状态
    lodingStatus(val) {
        this.setState({
            rightIconLodding: val,
        });
    }

    getInputTextValue() {
        return this.values;
    }

    renderLoading() {
        return (
            <ActivityIndicator size='small'/>
        );
    }

    render() {
        return (
            <View style={[styles.componentStyle, this.props.viewStytle]}>

                {
                    this.props.leftIcon ?
                        <Image source={this.props.leftIconUri}
                               style={[styles.iconStyle, this.props.leftIconStyle]}/>
                        : null
                }

                <View style={
                    {
                        flex: 1,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'lightgrey',
                        alignItems: 'center'
                    }}>

                    <TextInput
                        ref="inputText"
                        underlineColorAndroid={"#00000000"}
                        placeholder={this.props.textPlaceholder}
                        placeholderTextColor={'#848484'}
                        keyboardType={this.props.keyBoard}
                        style={[styles.textInputStyle, this.props.inputTextStyle]}
                        onChangeText={(text) => {
                            this.values = text;
                        }}/>

                    {
                        this.props.rightIcon ?
                            !this.state.rightIconLodding ?
                                <TouchableWithoutFeedback
                                    onPress={this.props.rightIconClick ? this.props.rightIconClick : this.clickBtn}>
                                    <Image source={this.props.rightIconUri}
                                           style={[styles.iconStyle, this.props.rightIconStyle]}/>
                                </TouchableWithoutFeedback>
                                : this.renderLoading()
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
        backgroundColor: '#cc092f'
    },

});