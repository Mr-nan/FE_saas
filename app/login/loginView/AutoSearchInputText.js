/**
 * searchBtShow 设置输入框是否有搜索按钮
 * inputPlaceholder 输入框提示语
 * inputTextStyle 输入框样式
 * btnStyle 搜索按钮样式
 */
import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, PixelRatio, TextInput} from "react-native";

var onePT = 1 / PixelRatio.get(); //一个像素

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class Search extends Component {
    static defaultProps = {
        searchBtShow: false,
        inputPlaceholder: "请输入用户名",
        saveData: ["aaaaaa", "bbbbbbb", "cccccccccc"],
    };

    static propTypes = {
        searchBtShow: PropTypes.bool,
        inputPlaceholder: PropTypes.string,
        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        btnStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    }

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
        }
    }

    //获取value值调用的方法
    getValue = (text) => {
        var value = text;
        this.setState({
            show: true,
            value: value
        });
    }

    //执行搜索操作搜索
    goSearch = (text) => {
        var value = text;
        this.setState({
            show: true,
            value: value
        });
    }

    //显示默认内容
    showDefultContext = () => {
        this.setState({
            show: true,
            value: ""
        });
    }

    //隐藏
    hide(val) {
        this.setState({
            show: false,
            value: val
        });
    }

    render() {
        let views = [];
        for (let x in this.props.saveData) {
            views.push(
                <Text
                    key={x}
                    style={styles.item}
                    onPress={this.hide.bind(this,this.state.value ? this.state.value : this.props.saveData[x])}
                    numberOfLines={1}
                >
                    {this.state.value ? this.state.value : this.props.saveData[x]}
                </Text>
            );
        }
        return (
            <View style={[{width:width}]}>
                <View style={[styles.flexDirection,styles.inputHeight]}>
                    <View style={styles.flex}>
                        <TextInput style={[styles.inputs,this.props.inputTextStyle]}
                                   returnKeyType={"search"}
                                   placeholder={this.props.inputPlaceholder}
                                   underlineColorAndroid={"#00000000"}
                                   onEndEditing={this.hide.bind(this,this.state.value)}
                                   value={this.state.value}
                                   onFocus={this.showDefultContext}
                                   onChangeText={this.goSearch}/>
                    </View>
                    {this.props.searchBtShow ?
                        <View style={[styles.btn,this.props.btnStyle]}>
                            <Text style={styles.search} onPress={this.hide.bind(this,this.state.value)}>搜索</Text>
                        </View>
                        : null
                    }
                </View>

                {/* //结果列表*/}
                {
                    this.state.show ?
                        <View style={[styles.result]}>
                            {views}
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    green: {
        backgroundColor: '#cd2d1c'
    },
    flexDirection: {
        flexDirection: 'row',
    },
    inputHeight: {
        height: 45,
    },
    //输入框样式
    inputs: {
        height: 45,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 15,

    },
    btn: {
        width: 55,
        marginLeft: -5,
        marginRight: 5,
        backgroundColor: '#23bfff',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,

    },
    search: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    result: {
        marginTop: 1,
        marginRight: 10,
        marginLeft: 10,
        borderColor: '#ccc',
        borderTopWidth: onePT,

    },
    item: {
        fontSize: 16,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: onePT,
        borderColor: '#ddd',
        borderTopWidth: 0,
    }
});
