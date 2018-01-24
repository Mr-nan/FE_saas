/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,
} from 'react-native';
import TagSelectView from '../component/TagSelectView';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';
import AccountModal from './AccountModal';
import CheckWaybill from './CheckWaybill';
import AddCar from './AddCar';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";

const agree_icon = require('../../../../images/agree_icon.png');
const disagree = require('../../../../images/disagree.png');
import CheckTransferFee from "./CheckTransferFee";
const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';

const Pixel = new PixelUtil();
let data1 = [{title: '发车地址', value: ''}, {title: '收车地址', value: ''}];
let data2 = [{title: '车型', value: ''}, {title: '单车指导价', value: '请输入'}, {title: '车辆数', value: '请输入1～3000间的数值'}];
let tip1 = '1、平台会依据“车辆信息”计算运价及投保，请务必确保车辆信息准确；';
let tip2 = '2、如您输入的“单车指导价”低于车辆实际价值，出险后即无法获得车辆实际价值的赔偿金。';
let tip3 = '您可对系统评估给出的"单车指导价"进行修改，若无修改，按此默认价格提交。';
let cellDatas = [{
    name: '发新车',
    check: true,
    img: cellJianTou,
    id: 0
}, {
    name: '发二手车',
    check: false,
    img: cellJianTou,
    id: 1
},];
export default class DepartCar extends BaseComponent {
    constructor(props) {
        super(props);
        this.money = '';
        this.carNum='';
        this.state = {
            renderPlaceholderOnly: 'blank',
            cellDatas: cellDatas
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    getData = () => {
        let maps = {
            company_id: '111',
            logistics_type: '111',//物流类型
            order_id: '111'
        };
        request(Urls.WAYBILL, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data != null) {
                    }
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error',});
                });
    }

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly: 'loading',
        });
        this.getData();
    }
    jump=(title)=>{
        if(title=='车型'){
            console.log(title);
        }else if(title=='发车地址'){
            console.log(title);
        }else if(title=='收车地址'){
            console.log(title);
        }
    }

    cellItemView = (datas) => {
        return (
            <View style={{marginTop: Pixel.getPixel(10)}}>
                {datas.map((data, index) => {
                    return (
                        <TouchableOpacity key={index + 'cell'} activeOpacity={0.8} onPress={() => {
                            this.jump(data.title);
                        }}>
                            <View style={styles.content_base_wrap}>
                                <View style={[styles.content_base_text_wrap, index == datas.length-1 && {borderBottomWidth: 0}]}>
                                    <Text style={{
                                        fontSize: Pixel.getFontPixel(14),
                                        color: 'black',
                                        flex: 1
                                    }}>{data.title}</Text>
                                    {data.value == '' ?
                                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                            <View style={{
                                                flexWrap: 'wrap',
                                                height: Pixel.getPixel(50),
                                                width: (width * 3 / 4)-20,
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={[styles.content_base_Right,{color: FontAndColor.COLORA1}]}>{'请选择'}</Text>
                                            </View>
                                            <Image source={cellJianTou} style={styles.image}></Image>
                                        </View> :
                                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                            <TextInput
                                                style={{
                                                    height: Pixel.getPixel(44),
                                                    width: Pixel.getPixel(150),
                                                    flexWrap: 'wrap',
                                                    textAlign: 'right',
                                                    fontSize: Pixel.getPixel(14),
                                                }}
                                                underlineColorAndroid={"#00000000"}
                                                placeholder={data.value}
                                                onChangeText={(text) => {
                                                    if(data.title =='单车指导价'){
                                                        this.money = text;
                                                    }else{
                                                        this.carNum=text;
                                                    }

                                                }}
                                            />
                                            <Text style={{
                                                marginLeft: Pixel.getPixel(10),
                                                color: FontAndColor.COLORA1,
                                                fontSize: 15
                                            }}>{data.title == '车辆数' ? '   台' : '万元'}</Text>
                                        </View>}

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );

    }
    onTagClick = (dt, index) => {
        console.log(index);
        //单选
        cellDatas.map((data) => {
            data.check = false;
        });

        cellDatas[index].check=true;

        this.setState({
            cellDatas:cellDatas
        });
    }


    singleSelect = () => {
        return (
            <View style={{
                marginTop: Pixel.getPixel(10),
                paddingVertical: Pixel.getPixel(15),
                backgroundColor: 'white',
                justifyContent: 'space-between',
                paddingHorizontal:Pixel.getPixel(5),
                flexDirection:'row'
            }}>
                {this.state.cellDatas.map((data, index) => {
                    return (
                        <TouchableOpacity key={index + 'cellDatas'} activeOpacity={0.8} onPress={()=>{this.onTagClick(data,index)}}>
                        <View  style={[{
                            flexDirection: 'row', marginHorizontal: Pixel.getPixel(8),
                            height: Pixel.getPixel(70), width: (width - 50) / 2, alignItems: 'center'
                        },data.check?{backgroundColor:FontAndColor.COLORA4}:{backgroundColor:FontAndColor.COLORB9}]}>
                            <Image source={data.img} style={{marginLeft:Pixel.getPixel(8)}}/>
                            <Text style={{
                                marginLeft: Pixel.getPixel(10),
                                fontSize: Pixel.getPixel(15)
                            }}>{data.name}</Text>
                            <Image style={{position: 'absolute', right: Pixel.getPixel(10),top:Pixel.getPixel(10)}}
                                   source={data.check ? agree_icon : disagree}/>
                        </View>
                        </TouchableOpacity>
                    )

                })}
            </View>
        )
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>
                {this.singleSelect()}
                <Text style={{
                    marginLeft: Pixel.getPixel(15),
                    color: FontAndColor.COLORA1,
                    fontSize: Pixel.getPixel(10),
                    marginTop: Pixel.getPixel(10)
                }}>{tip3}</Text>
                {this.cellItemView(data2)}
                {this.cellItemView(data1)}
                <View style={{marginHorizontal: Pixel.getPixel(15)}}>
                    <Text style={{
                        color: 'black',
                        fontSize: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(15)
                    }}>友情提示</Text>
                    <Text style={{
                        color: FontAndColor.COLORA1,
                        fontSize: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(10)
                    }}>{tip1}</Text>
                    <Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(15),}}>{tip2}</Text>
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'查询运价'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              this.confirmBt();
                          }}/>
            </View>
        );

    }

    confirmBt = () => {
        this.toNextPage({
                name: 'CheckTransferFee',
                component: CheckTransferFee,
                params: {
                }
            }
        );
    }

    backPg = () => {
        this.refs.accountModal.changeShowType(true,
            '主账号未设置地址，请登录主账号创建地址', '确认', '', () => {
                this.backPage();
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title={this.title} backIconClick={this.backPage}
                               renderRihtFootView={this.renderRightView}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(64),}}>
                    {
                        this._renderItem()
                    }
                </View>
                <AccountModal ref="accountModal"/>
                <NavigatorView title='发票信息' backIconClick={this.backPg} renderRihtFootView={this.renderRightView}/>
            </View>)
        }

    }

    renderRightView = () => {
        return (
            <TouchableOpacity onPress={
                () => {
                }
            }>
                <View style={{
                    marginLeft: Pixel.getPixel(20),
                    width: Pixel.getPixel(80),
                    height: Pixel.getPixel(40),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text allowFontScaling={false}
                          style={{color: 'white', fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30)}}>我的运单</Text>
                </View>
            </TouchableOpacity>
        )


    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.COLORA3,
        flex: 1,
    },
    content_base_text_wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: FontAndColor.COLORA4
    },
    content_base_left: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1
    },
    content_base_Right: {
        marginRight: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: 'black',
        textAlign: 'right'
    },
    content_base_wrap: {
        height: Pixel.getPixel(45),
        backgroundColor: 'white',
        paddingHorizontal: Pixel.getPixel(15)
    },
    image: {},
    topText: {
        color: 'white',
        fontSize: Pixel.getPixel(14)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15),
        position: 'absolute',
        bottom: Pixel.getPixel(20)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    footerStyle: {
        height: Pixel.getPixel(50),
        width: width,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        bottom: Pixel.getPixel(0),

    },
});
