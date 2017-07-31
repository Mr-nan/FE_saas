/**
 * Created by zhengnan on 2017/7/28.
 */
/**
 * Created by zhengnan on 2017/7/28.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    Image,
    KeyboardAvoidingView,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import {CellView, CellSelectView} from '../znComponent/CarPublishCell';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';

import CarInitialTaskUpImagScene from "./CarInitialTaskUpImagScene";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

export default class CarManagerTaskScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootContaier}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(64)}>
                    <ScrollView keyboardDismissMode={'on-drag'}>
                        {
                            this.state.titleData.map((data, index) => {
                                return (
                                    <View style={{marginTop:10,backgroundColor:'white',marginBottom:10}} key={index}>
                                        {
                                            data.map((rowData, subIndex) => {
                                                return ( rowData.selectDict ?
                                                        (
                                                            <TouchableOpacity
                                                                key={subIndex}
                                                                activeOpacity={1}
                                                                onPress={()=>this.cellCilck(rowData.title)}>
                                                                <CellSelectView
                                                                    currentTitle={rowData.selectDict.current}
                                                                    cellData={rowData}
                                                                    cellSelectAction={this.cellSelectAction}/>
                                                            </TouchableOpacity>) :
                                                        (
                                                            <TouchableOpacity key={subIndex}
                                                                              activeOpacity={1}
                                                                              onPress={()=>this.cellCilck(rowData.title)}>
                                                                <CellView cellData={rowData}/>
                                                            </TouchableOpacity>)
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text allowFontScaling={false}  style={styles.footText}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="录入车辆信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellSelectAction=(selectDict)=>{
        alert(selectDict.title,selectDict.value);
    }

    footBtnClick=()=>{
        this.toNextPage({
            name:'CarInitialTaskUpImagScene',
            component: CarInitialTaskUpImagScene,
            params: {

            }
        })
    }

    // 构造
    constructor(props) {
        super(props);

        this.titleData1=[
            [
                {
                    title:'车架号',
                    isShowTag:false,
                    value:"",
                    isShowTail:false,


                },
                {
                    title:'车型',
                    isShowTag:false,
                    value:' ',
                    isShowTail:false,
                },

            ],
            [
                {
                    title: '收车价格',
                    isShowTag: true,
                    isShowTail: true,
                    tailView: () => {
                        return (
                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           ref={(ref) => {
                                               this.buyPrice = ref
                                           }}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={7}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => {

                                               if (text.length > 4 && text.indexOf('.') == -1) {
                                                   text = text.substring(0, text.length - 1);
                                               }
                                               let moneyStr = this.chkPrice(text);
                                               this.buyPrice.setNativeProps({
                                                   text: moneyStr,
                                               });
                                           }}/>
                                <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                            </View>)
                    }
                },{
                    title: '整备价格',
                    isShowTag: false,
                    isShowTail: true,
                    tailView: () => {
                        return (
                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           ref={(ref) => {
                                               this.trimPrice = ref
                                           }}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={7}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => {

                                               if (text.length > 4 && text.indexOf('.') == -1) {
                                                   text = text.substring(0, text.length - 1);
                                               }
                                               let moneyStr = this.chkPrice(text);
                                               this.trimPrice.setNativeProps({
                                                   text: moneyStr,
                                               });
                                           }}/>
                                <Text allowFontScaling={false} style={styles.textInputTitle}>元</Text>
                            </View>)
                    }
                },{
                    title: '卖车标价',
                    isShowTag: true,
                    isShowTail: true,
                    tailView: () => {
                        return (
                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           ref={(ref) => {
                                               this.normPrice = ref
                                           }}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={7}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => {

                                               if (text.length > 4 && text.indexOf('.') == -1) {
                                                   text = text.substring(0, text.length - 1);
                                               }
                                               let moneyStr = this.chkPrice(text);
                                               this.normPrice.setNativeProps({
                                                   text: moneyStr,
                                               });
                                           }}/>
                                <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                            </View>)
                    }
                },{
                    title: '卖车低价',
                    isShowTag: true,
                    isShowTail: true,
                    tailView: () => {
                        return (
                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           ref={(ref) => {
                                               this.dealPrice = ref
                                           }}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={7}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => {

                                               if (text.length > 4 && text.indexOf('.') == -1) {
                                                   text = text.substring(0, text.length - 1);
                                               }
                                               let moneyStr = this.chkPrice(text);
                                               this.dealPrice.setNativeProps({
                                                   text: moneyStr,
                                               });
                                           }}/>
                                <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                            </View>)
                    }
                }
            ],
            [
                {
                    title:'备注',
                    isShowTag:false,
                    value:'请填写',
                    isShowTail:false,
                    tailView:()=>{
                        return(
                            <TextInput
                                style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(60)}]}
                                placeholder='请填写'
                                maxLength={200}
                                underlineColorAndroid='transparent'
                                placeholderTextColor={fontAndColor.COLORA4}
                                placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                            />
                        )
                    }
                },
            ]

        ];
        this.state = {
            titleData:this.titleData1,
        };
    }


    /**
     *  form @ZN
     * @param title
     * 点击对应标题
     */
    cellCilck=(title)=>{

    }


    /**
     * 开始加载
     * @private
     */
    _showLoading = () => {
        this.props.showModal(true);
    };

    /**
     * 关闭加载
     * @private
     */
    _closeLoading = () => {
        this.props.showModal(false);
    };

}

const styles = StyleSheet.create({
    rootContaier:{
        backgroundColor:fontAndColor.COLORA3,
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
    textInput: {
        height: Pixel.getPixel(30),
        borderColor: fontAndColor.COLORA0,
        width: Pixel.getPixel(160),
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,

    },
    textInputTitle: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft: Pixel.getPixel(5),
        textAlign: 'right',
    },
    footContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(20),
    },
    footView: {
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(44),
        justifyContent: 'center',
        alignItems: 'center',
        width: sceneWidth - Pixel.getPixel(30),
        borderRadius: Pixel.getPixel(3),
        marginBottom: Pixel.getPixel(20),

    },
    footText: {
        textAlign: 'center',
        color: 'white',
        fontSize: fontAndColor.BUTTONFONT30
    },
});
