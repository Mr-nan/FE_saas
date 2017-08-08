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
    NativeModules,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import {CellView, CellSelectView} from '../znComponent/CarPublishCell';
import VinInfo from '../../publish/component/VinInfo';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarBrandSelectScene from "../CarBrandSelectScene";
import CarInfomationSourceScene from './CarInformationSourceScene';
import * as AppUrls from "../../constant/appUrls";
import * as Net from "../../utils/ImageUpload";
import CarlicenseTagScene from "../carPublish/CarlicenseTagScene";
import CarInitialTaskUpImagScene from "./CarInitialTaskUpImagScene";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const scanImg = require('../../../images/financeImages/scan.png');
const IS_ANDROID = Platform.OS === 'android';


export default class CarInitialTaskScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootContaier}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={this.state.keyboardOffset}>
                    <ScrollView keyboardDismissMode={'on-drag'}>
                        {
                            this.state.titleData.map((data, index) => {
                                return (
                                    <View style={{marginTop:10,backgroundColor:'white',marginBottom:10}} key={index}>
                                        {
                                            data.map((rowData, subIndex) => {
                                                return( <TouchableOpacity key={subIndex}
                                                                          activeOpacity={1}
                                                                          onPress={()=>this.cellCilck(rowData.title)}>
                                                    <CellView cellData={rowData}/>
                                                </TouchableOpacity>)
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text allowFontScaling={false}  style={styles.footText}>下一步</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <VinInfo viewData={this.scanType} vinPress={this._vinPress} ref={(modal) => {this.vinModal = modal}}/>
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
        this.scanType = [
            {model_name: '扫描前风挡'},
            {model_name: '扫描行驶证'}
        ];
        this.titleData1=[
            [
                {
                    title:'车架号',
                    isShowTag:true,
                    subTitle:"",
                    tailView:()=>{
                        return(
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TextInput style={styles.textInput}
                                           ref={(input) => {this.vinInput = input}}
                                           placeholder='输入车架号'
                                           underlineColorAndroid='transparent'
                                           maxLength={17}
                                           editable={this.props.carID?false:true}
                                           onChangeText={this._onVinChange}
                                           onFocus={()=>{
                                               this.setState({
                                                   keyboardOffset:-Pixel.getPixel(300)
                                               });
                                           }}
                                           onBlur={()=>{
                                               this.setState({
                                                   keyboardOffset:-Pixel.getPixel(64)
                                               });
                                           }}
                                           placeholderTextColor={fontAndColor.COLORA4}
                                           keyboardType={'ascii-capable'}
                                           placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                                />
                                {
                                    !this.props.carID &&(<TouchableOpacity onPress={this._onScanPress} style={{flexDirection:'row', alignItems:'center'}}>
                                        <Image style={styles.scanImage} source={scanImg}/>
                                        <Text allowFontScaling={false}  style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28,marginLeft:Pixel.getPixel(5)}}>扫描</Text>
                                    </TouchableOpacity>)
                                }
                            </View>
                        )
                    }
                },
                {
                    title:'车型',
                    isShowTag:true,
                    value:'请选择',
                    isShowTail:true,
                },

            ],
            [
                {
                    title:'信息员姓名',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={7}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{
                                           }}/>
                            </View>)
                    }
                },
                {
                    title:'信息员电话',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },

            ],
            [
                {
                    title:'信息来源',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'原车牌号',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'钥匙数',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
            ],
            [
                {
                    title:'卖车人姓名',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
                {
                    title:'卖车人电话',
                    isShowTag:false,
                    isShowTail:true,
                    tailView: () => {
                        return (
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput style={styles.textInput}
                                           placeholder='请输入'
                                           keyboardType={'numeric'}
                                           maxLength={11}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text)=>{

                                           }}/>

                            </View>)
                    }
                },
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
                                ref={(input) => {this.instructionsInput = input}}
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
            keyboardOffset:-Pixel.getPixel(64),
        };
    }


    /**
     *  form @ZN
     * @param title
     * 点击对应标题
     */
    cellCilck=(title)=>{
        if(title=='车型'){

            this.pushCarBrand();

        }else if(title == '信息来源')
        {
            this.pushCarInfomation();

        }else if(title == '原车牌号'){

            this.pushCarIicenseTagScene();
        }
    }

    /**
     * from @ZN
     * 车辆系选择
     */
    pushCarBrand=()=>{
        let brandParams = {
            name: 'CarBrandSelectScene',
            component: CarBrandSelectScene,
            params: {
                checkedCarClick: this._checkedCarClick,
                status: 0,
            }
        };
        this.toNextPage(brandParams);
    }

    /**
     *
     * from @ZN
     * 车系选择结果
     * @param carObject
     * @private
     */
    _checkedCarClick=(carObject)=>{

        this.titleData1[0][1].value = carObject.model_name;
        this.titleData1[2][3].value = carObject.model_year+'-06-01';
        this.upTitleData();
    }


    /**
     * from @ZN
     * 信息选择
     */
    pushCarInfomation=()=>{

        let brandParams = {
            name: 'CarInfomationSourceScene',
            component: CarInfomationSourceScene,
            params: {

                currentTitle:this.titleData1[2][0].value,
                carInformationSourceSelectAction:this.carInformationSourceSelectAction,

            }
        };
        this.toNextPage(brandParams);
    }

    /**
     * from @ZN
     * 信息选择结果
     * @param selectObject
     */
    carInformationSourceSelectAction =(selectObject)=>{
        this.titleData1[2][0].value = selectObject.title;
    }

    /**
     * from @zn
     *
     * 跳转车牌号页面
     **/
    pushCarIicenseTagScene = () => {
        let navigatorParams = {
            name: "CarlicenseTagScene",
            component: CarlicenseTagScene,
            params: {
                checkedCarlicenseTagClick: this._checkedCarlicenseTagClick,
                currentChecked: this.titleData1[2][1].value,

            }
        };
        this.toNextPage(navigatorParams);
    }

    /**
     * from @zn
     *
     * 保存车牌号信息
     **/
    _checkedCarlicenseTagClick = (title) => {
        this.titleData1[2][1].value = title;
        this.upTitleData();
    }


    upTitleData=()=>{

        // this.setState({
        //     titleData:this.titleData1,
        // });
    };

    /**
     * 扫描车架号
     * @private
     */
    _onScanPress=()=>{
        this.vinModal.refresh(this.scanType);
        this.vinModal.openModal(1);
    }

    /**
     * 获取扫描车架号结果
     * @param type
     * @param index
     */
    _vinPress = (type,index) => {

        if(type==1){
            if (IS_ANDROID === true) {
                NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                    this.vinInput.setNativeProps({
                        text: vl
                    });
                    this._onVinChange(vl);
                }, (error) => {
                });
            } else {
                this.timer = setTimeout(
                    () => {
                        NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                            this.vinInput.setNativeProps({
                                text: vl
                            });
                            this._onVinChange(vl);
                        }, (error) => {
                        });
                    },
                    500
                );
            }
        }else if (type==0){

            this.titleData1[0][1].value = this.modelData[index].model_name;
            this.titleData2[2][3].value = this.modelData[index].model_year+'-06-01';

            this.upTitleData();
        }

    };

    /**
     * from @ZN
     * @param text
     * @private
     */
    _onVinChange = (text) => {

        if (text.length === 17) {
            this._showLoading();
            this.vinInput.blur();
            Net.request(AppUrls.VININFO, 'post',{vin:text}).then(
                (response) => {
                    this._closeLoading();
                    if (response.mycode === 1) {

                        let rd = response.mjson.data;

                        if (rd.length === 0) {

                            this.titleData1[0][0].subTitle='校验失败';
                            this.upTitleData();


                        } else if (rd.length === 1) {
                            // this.modelInfo['brand_id'] = rd[0].brand_id;
                            // this.modelInfo['model_id'] = rd[0].model_id;
                            // this.modelInfo['series_id'] = rd[0].series_id;
                            // this.modelInfo['model_year'] = rd[0].model_year;
                            // this.modelInfo['model_name'] = rd[0].model_name;

                            this.titleData1[0][0].subTitle='';
                            this.titleData1[0][1].value = rd[0].model_name;
                            this.titleData1[2][3].value = rd[0].model_year+'-06-01';

                            this.upTitleData();

                        } else if (rd.length > 1) {

                            this.modelData = response.mjson.data;
                            this.vinModal.refresh(this.modelData);
                            this.vinModal.openModal(0);
                        }

                    } else {
                        this.titleData1[0][0].subTitle='校验失败';
                        this.upTitleData();
                    }
                },
                (error) => {
                    this._closeLoading();
                    this.titleData1[0][0].subTitle='校验失败';
                    this.upTitleData();
                }
            );
        }
    };

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
