import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, PixelRatio, TextInput, Image} from "react-native";
import  * as FontAndColor from '../../constant/fontAndColor';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class Search extends Component {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
            value: ""
        }
    }

    static defaultProps = {
        leftIconShow: true,
        inputPlaceholder: "请输入用户名",
        leftIconUri: './../images/login/phone.png',
    };

    /**
     * searchBtShow 设置输入框是否有搜索按钮
     * inputPlaceholder 输入框提示语
     * inputTextStyle 输入框样式
     * btnStyle 搜索按钮样式
     */
    static propTypes = {
        leftIconShow: PropTypes.bool,
        inputPlaceholder: PropTypes.string,

        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        leftIconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        itemStyel: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        callBackSearchResult: PropTypes.func,//定义搜索结果控件
    }

    //执行搜索操作搜索--此处执行搜索操作时隐藏
    goSearch = (text) => {
        if (text === "") {
            var value = text;
            this.props.callBackSearchResult(true);
            this.setState({
                show: true,
                value: value
            });
        } else {
            var value = text;
            this.props.callBackSearchResult(false);
            this.setState({
                show: false,
                value: value
            });
        }
    }

    getInputTextValue() {
        return this.state.value
    }

    //显示默认内容 组件获取焦点时执行
    showDefultContext = () => {
        if (this.state.value === "") {
            this.props.callBackSearchResult(true);
            this.setState({
                show: true
            });
        }
    }

    //隐藏
    hide(val) {
        this.props.callBackSearchResult(false);
        this.setState({
            show: false,
            value: val
        });
    }

    //隐藏
    setValue(val) {
        this.setState({
            value: val
        });
    }

    render() {
        return (
            <View style={[styles.width, this.props.itemStyel]}>
                <View style={[styles.flexDirection, styles.inputHeight]}>
                    {this.props.leftIconShow ?
                        <Image source={require('./../../../images/login/phone.png')}
                               style={[styles.iconStyle, this.props.leftIconStyle]}/>
                        : null
                    }
                    <View style={styles.flex}>
                        <TextInput style={[styles.inputs, this.props.inputTextStyle]}
                                   returnKeyType={"search"}
                                   placeholder={this.props.inputPlaceholder}
                                   placeholderTextColor={FontAndColor.COLORA1}
                                   underlineColorAndroid={"#00000000"}
                                   onEndEditing={this.hide.bind(this, this.state.value)}
                                   value={this.state.value}
                                   onFocus={this.showDefultContext}
                                   onChangeText={this.goSearch}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    flexDirection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: FontAndColor.COLORA4,
        borderBottomWidth: 1,
    },
    inputHeight: {
        height: 44,
    },
    //输入框样式
    inputs: {
        height: 44,
        paddingLeft: 15,
        paddingRight: 2,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        flex: 1,
        color:FontAndColor.COLORA0
    },
    iconStyle: {
        width: 25,
        height: 25,
    },
    width: {
        width: width - 20,
    }
});
