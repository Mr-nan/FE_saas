/**
 * Created by zhengnan on 2017/5/11.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    NativeModules
}   from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import {CellView,CellSelectView} from './znComponent/CarPublishCell';
import EnterpriseInfo from '../publish/component/EnterpriseInfo';

import CarPublishSecondScene from './CarPublishSecondScene';
import *as fontAndColor from '../constant/fontAndColor';
import VinInfo from '../publish/component/VinInfo';
import CarBrandSelectScene   from './CarBrandSelectScene';
import CarDischargeScene from  './carPublish/CarDischargeScene';
import CarBodyColorScene from './carPublish/CarBodyColorScene';
import CarInwardColorScene from './carPublish/CarInwardColorScene';
import AutoConfig      from '../publish/AutoConfig';

import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import * as Net from '../utils/RequestUtil';
import * as AppUrls from '../constant/appUrls';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const scanImg = require('../../images/financeImages/scan.png');
const IS_ANDROID = Platform.OS === 'android';

let   currentCarType ='二手车';


export default class CarPublishFirstScene extends BaseComponent{

    initFinish=()=>{
        StorageUtil.mGetItem(StorageKeyNames.ENTERPRISE_LIST,(data)=>{
            if(data.code == 1 && data.result != ''){
                let enters = JSON.parse(data.result);
                if(enters.length === 1){
                   console.log('商户ID：'+ enters[0].enterprise_uid);
                }else if(enters.length > 1){
                    this.enterpriseList = enters;
                    this.enterpriseModal.refresh(this.enterpriseList);
                    this.enterpriseModal.openModal();
                }else{
                    this._showHint('无法找到所属商户');
                }
            }else{
                this._showHint('无法找到所属商户');
            }
        });
    }
    // 构造
      constructor(props) {
        super(props);

          this.titleData1=[
              [
                  {
                      title:'车辆类型',
                      isShowTag:false,
                      isShowTail:true,
                      selectDict:{current:currentCarType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
                  },
                  {
                      title:'车架号',
                      isShowTag:true,
                      tailView:()=>{
                          return(
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                  <TextInput style={[styles.textInput,{width:Pixel.getPixel(150)}]}
                                             placeholder='输入车架号'
                                             underlineColorAndroid='transparent'
                                             maxLength={17}
                                             onChangeText={this._onVinChange}
                                             placeholderTextColor={fontAndColor.COLORA4}
                                             ref={(input) => {this.vinInput = input}}/>
                                  <TouchableOpacity onPress={this._onScanPress} style={{flexDirection:'row', alignItems:'center'}}>
                                      <Image style={styles.scanImage} source={scanImg}/>
                                      <Text style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28,marginLeft:Pixel.getPixel(5)}}>扫描</Text>
                                  </TouchableOpacity>
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
                  {
                      title:'排量',
                      isShowTag:true,
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput style={styles.textInput} placeholder='请输入'/>
                          )
                      }
                  },
                  {
                      title:'排放标准',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'车身颜色',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'内饰颜色',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },
              ],
              [   {
                  title:'出厂日期',
                  isShowTag:true,
                  value:'请选择',
                  isShowTail:true,
              },
                  {
                      title:'初登日期',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },

              ],
              [   {
                  title:'标准配置',
                  isShowTag:false,
                  value:'查看',
                  isShowTail:false,
              },
                  {
                      title:'配置改装说明',
                      isShowTag:false,
                      value:'请填写',
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput style={styles.textInput} placeholder='请填写'/>
                          )
                      }

                  },
              ]

          ];
          this.titleData2 = [
              [
                  {
                      title:'车辆类型',
                      isShowTag:false,
                      value:'扫描',
                      isShowTail:true,
                      selectDict:{current:currentCarType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
                  },
                  {
                      title:'车架号',
                      isShowTag:true,
                      tailView:()=>{
                          return(
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                  <TextInput style={[styles.textInput,{width:Pixel.getPixel(150)}]}
                                             placeholder='输入车架号'
                                             underlineColorAndroid='transparent'
                                             maxLength={17}
                                             onChangeText={this._onVinChange}
                                             placeholderTextColor={fontAndColor.COLORA4}
                                             ref={(input) => {this.vinInput = input}}/>
                                  <TouchableOpacity onPress={this._onScanPress} style={{flexDirection:'row', alignItems:'center'}}>
                                      <Image style={styles.scanImage} source={scanImg}/>
                                      <Text style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28,marginLeft:Pixel.getPixel(5)}}>扫描</Text>
                                  </TouchableOpacity>
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
                  {
                      title:'排量',
                      isShowTag:true,
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput style={styles.textInput} placeholder='请输入'/>
                          )
                      }
                  },
                  {
                      title:'排放标准',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'车身颜色',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },{
                  title:'内饰颜色',
                  isShowTag:true,
                  value:'请选择',
                  isShowTail:true,
              },
              ],
              [
                  {
                      title:'出厂日期',
                      isShowTag:true,
                      value:'请选择',
                      isShowTail:true,
                  },
              ],
              [
                  {
                      title:'标准配置',
                      isShowTag:false,
                      value:'查看',
                      isShowTail:false,
                  },
                  {
                      title:'配置改装说明',
                      isShowTag:false,
                      value:'请填写',
                      isShowTail:false,
                  },
              ]

          ];
          this.enterpriseList = [];
          this.scanType = [
              {model_name: '扫描前风挡'},
              {model_name: '扫描行驶证'}
          ];
          this.modelData = [];
          this.modelInfo = {};
          this.state = {
              titleData:this.titleData1,
              isDateTimePickerVisible:false,
          };
      }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render(){
        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Pixel.getTitlePixel(-64)}>
                    <ScrollView style={{width:sceneWidth,height:Dimensions.get('window').height -Pixel.getTitlePixel(64)}}>
                        {
                            this.state.titleData.map((data,index)=>{
                                return(
                                    <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                        {
                                            data.map((rowData,subIndex)=>{
                                                return( rowData.selectDict?(
                                                        <TouchableOpacity
                                                            key={subIndex}
                                                            onPress={()=>{this.cellClick(rowData.title)}}
                                                            activeOpacity={1}>
                                                            <CellSelectView
                                                                currentTitle={rowData.selectDict.current}
                                                                cellData={rowData}
                                                                cellSelectAction={this.cellSelectAction}/>
                                                        </TouchableOpacity>):(
                                                            <TouchableOpacity
                                                                key={subIndex}
                                                                onPress={
                                                                    ()=>{this.cellClick(rowData.title)}
                                                                }
                                                                activeOpacity={1}>
                                                                <CellView cellData={rowData}/>
                                                            </TouchableOpacity>))
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text style={styles.footText}>下一步</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
                <VinInfo viewData={this.scanType} vinPress={this._vinPress} ref={(modal) => {this.vinModal = modal}}/>
                <DateTimePicker
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                <EnterpriseInfo viewData ={this.enterpriseList}
                                enterpricePress={this._enterprisePress}
                                ref={(modal) => {this.enterpriseModal = modal}}/>
            </View>
        )
    }

    cellClick=(title)=>{

        if(title=='车型'){

            this.pushCarBrand();

        }else if(title == '排放标准')
        {
            this.pushCarDischarge();

        }else if(title == '车身颜色'){

            this.pushCarBodyColorScene();

        }else if(title == '内饰颜色'){

            this.pushCarInwardColorScene();

        }else if(title == '出厂日期'){

            this._labelPress('factory');

        }else if(title == '初登日期'){

            this._labelPress('register');

        }else if(title == '标准配置'){

            this.pushCarAutoConfigScene();
        }
        else {
            alert(title);
        }
    }

    cellSelectAction=(selectDict)=>{

        if(selectDict.value==1){
            this.setState({
                titleData:this.titleData1,
            })
        }else
        {
            this.setState({
               titleData:this.titleData2,
            })
        }

        currentCarType=selectDict.title;
    }

    footBtnClick=()=>{
        let navigatorParams = {
            name: "CarPublishSecondScene",
            component: CarPublishSecondScene,
            params: {
                carType:currentCarType,
            }
        }
        this.toNextPage(navigatorParams);
    }
    _onScanPress=()=>{
        this.vinModal.refresh(this.scanType);
        this.vinModal.openModal(1);
    }

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');

        if(this.type === 'factory'){

            this.titleData1[1][0].value = d;

        }else{
           this.titleData1[1][1].value = d;
        }

        this.upTitleData();
        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    _labelPress=(type)=>{
        this.type = type;
        this.setState({ isDateTimePickerVisible: true });
    };


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
            this.titleData1[0][2].value = this.modelData[index].model_name;
            this.upTitleData();
        }

    };
    //车架号改变
    _onVinChange = (text) => {
        if (text.length === 17) {

            this._showLoading();
            Net.request(AppUrls.VININFO, 'post',{vin:text}).then(
                (response) => {
                    this._closeLoading();
                    if (response.mycode === 1) {
                        let rd = response.mjson.data;
                        if (rd.length === 0) {
                            this._showHint('车架号校验失败');
                        } else if (rd.length === 1) {
                            this.modelInfo['brand_id'] = rd[0].brand_id;
                            this.modelInfo['model_id'] = rd[0].model_id;
                            this.modelInfo['series_id'] = rd[0].series_id;
                            this.modelInfo['model_year'] = rd[0].model_year;
                            this.modelInfo['model_name'] = rd[0].model_name;
                            this.titleData1[0][2].value = rd[0].model_name;
                            this.upTitleData();
                        } else if (rd.length > 1) {
                            this.modelData = response.mjson.data;
                            this.vinModal.refresh(this.modelData);
                            this.vinModal.openModal(0);
                        }
                    } else {
                        this._showHint('车架号校验失败');
                    }
                },
                (error) => {
                    this._closeLoading();
                    this._showHint('车架号校验失败');
                }
            );
        }
    };


    upTitleData=()=>{
        this.setState({
            titleData:this.titleData1,
        });
    };

    _showLoading = () => {
        this.props.showModal(true);
    };

    _closeLoading = () => {
        this.props.showModal(false);
    };
    //提示信息
    _showHint = (hint) => {
        this.props.showToast(hint);
    };

    // 取商户ID
    _enterprisePress = (rowID)=>{

        console.log('商户ID'+this.enterpriseList[rowID].enterprise_uid);
    };

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
    _checkedCarClick=(carObject)=>{

        this.modelInfo['brand_id'] = carObject.brand_id;
        this.modelInfo['model_id'] = carObject.model_id;
        this.modelInfo['series_id'] = carObject.series_id;
        this.modelInfo['model_name'] = carObject.model_name;
        this.titleData1[0][2].value = carObject.model_name;
        this.upTitleData();
    }

    pushCarDischarge=()=>{
        let brandParams = {
            name: 'CarDischargeScene',
            component: CarDischargeScene,
            params: {
                checkedCarDischargeClick:this._checkedCarDischargeClick,
                currentChecked:this.titleData1[0][4].value,
            }
        };
        this.toNextPage(brandParams);
    }

    _checkedCarDischargeClick=(dischargeObject)=>{
        this.titleData1[0][4].value = dischargeObject.title;
        this.upTitleData();
    }

    pushCarBodyColorScene=()=>{
        let brandParams = {
            name: 'CarBodyColorScene',
            component:CarBodyColorScene,
            params: {
                checkedCarBodyColorClick:this._checkedCarBodyColorClick,
                currentChecked:this.titleData1[0][5].value,
            }
        };
        this.toNextPage(brandParams);
    }

    _checkedCarBodyColorClick=(carBodyColorSceneObject)=>{

        this.titleData1[0][5].value = carBodyColorSceneObject.title;
        this.upTitleData();
    }

    pushCarInwardColorScene=()=>{
        let brandParams = {
            name: 'CarInwardColorScene',
            component: CarInwardColorScene,
            params: {
                checkedCarInwardColorClick:this._checkedCarInwardColorClick,
                currentChecked:this.titleData1[0][6].value,
            }
        };
        this.toNextPage(brandParams);
    }

    _checkedCarInwardColorClick=(carInwardSceneObject)=>{

        this.titleData1[0][6].value = carInwardSceneObject.title;
        this.upTitleData();
    }

    pushCarAutoConfigScene=()=>{
        let navigationParams={
            name: "AutoConfig",
            component: AutoConfig,
            params: {

                modelID:this.modelInfo['model_id'],
                carConfigurationData:[],
            }
        }
        this.toNextPage(navigationParams);
    }


    dateFormat = (date,fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}



const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(20),
        marginBottom:Pixel.getPixel(20),

    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:sceneWidth-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
    textInput:{
        height: 40,
        borderColor: fontAndColor.COLORA0,
        width:200,
        textAlign:'right',
        fontSize:fontAndColor.LITTLEFONT28,
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
});