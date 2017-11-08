/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    ListView,
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SText from '../component/SaasText'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2})

export default class Log extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: false,
            source: ds.cloneWithRowsAndSections([['a', 'b'], ['c', 'd']]),
            isShowSheet: false,
            screenningType: 0
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: true
        })
    }

    render() {
        if (!this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'账户流水'}
                        rightImageShow={false}
                        rightTextShow={true}
                        rightText={''}
                    />
                </View>
            )
        }


        return (
            <View style={{flex: 1, backgroundColor:'white'}}>
                <NavigationBar
                    leftImageShow={true}
                    leftImageCallBack={()=>{
                        this.backPage()
                    }}
                    leftTextShow={false}
                    centerText={'账户流水'}
                    rightImageShow={true}
                    rightTextShow={false}
                    rightImage={require('../../../../../images/account/screening.png')}
                    rightImageCallBack={() => {
                        this.setState({
                            isShowSheet: true,
                        })
                    }}
                />


                <ListView
                    renderSectionHeader={this._renderSectionHeader}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    dataSource={this.state.source}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={1}
                    initialListSize={10}
                    removeClippedSubviews={false}
                    renderFooter={this._renderFooter}

                />
                {
                    this.state.isShowSheet ?
                        <View


                            style={{
                                position: 'absolute',
                                width: width,
                                height: height,
                                backgroundColor: 'rgba(0,0,0,.4)'
                            }}>

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({
                                        isShowSheet: false,
                                    })
                                }}
                            >
                                <View style={{flex: 1}}/>
                            </TouchableWithoutFeedback>

                            <View style={{
                                alignItems: 'center',
                                paddingHorizontal: 15,
                                backgroundColor: 'white',
                                height: 100
                            }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        flexDirection: 'row',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        borderBottomColor: FontAndColor.COLORA4
                                    }}
                                >
                                    <SText
                                        onPress = {()=>{
                                            this.setState({
                                                screenningType:1
                                            })
                                        }}

                                        style={{
                                        fontSize: 17,
                                        flex: 1,
                                        textAlign: 'center',
                                        color: this.state.screenningType === 1 ? FontAndColor.COLORB0 : 'black'
                                    }}>充值</SText>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        flex: 1
                                    }}
                                >
                                    <SText
                                        onPress = {()=>{
                                            this.setState({
                                                screenningType:2
                                            })
                                        }}
                                        style={{
                                        fontSize: 17,
                                        textAlign: 'center',
                                        flex: 1,
                                        color: this.state.screenningType === 2 ? FontAndColor.COLORB0 : 'black'
                                    }}>提现</SText>
                                </View>
                            </View>
                        </View>
                        : null
                }

            </View>

        )

    }

    _renderFooter = () => {
        return (
            <View></View>
        )

    }

    _onEndReached = () => {


    }

    _renderSeparator = () => {
        return (
            <View style={{height: 1, flex: 1, marginHorizontal: 15, backgroundColor: FontAndColor.COLORA3}}/>
        )


    }
    _renderRow = (data, sectionID, rowID) => {
        return (

            <LogItem
                type={rowID}
                time={'2015-144-23'}
                money={'1000000'}
            />
        )

    }

    _renderSectionHeader = (data, sectionID) => {
        return (
            <View style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: FontAndColor.COLORA3,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <SText style={{flex: 1, fontSize: 16}}>2017年10月</SText>
                <Image source={require('../../../../../images/account/date.png')}/>
            </View>
        )
    }


}


class LogItem extends Component {

    render() {

        let type, typeIntroduce;
        if (this.props.type === 0) {
            type = '充值'
            typeIntroduce = '转账入金-转入'
        } else {
            type = '提现'
            typeIntroduce = '转账出金-转出'
        }
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingVertical: 20}}>
                <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: FontAndColor.COLORB1,
                    borderRadius: 50 / 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <SText style={{color: 'white', fontSize: 15}}>{type}</SText>
                </View>
                <View style={{marginLeft: 15, flex: 1}}>
                    <SText style={{marginBottom: 15, fontSize: 16}}>{typeIntroduce}</SText>
                    <SText style={{color: FontAndColor.COLORA1}}>{this.props.time}</SText>
                </View>
                <SText style={{color: FontAndColor.COLORB2, fontSize: 18}}>{this.props.money}</SText>
            </View>
        )
    }

}