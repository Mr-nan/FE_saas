/**
 * Created by zhengnan on 2017/7/26.
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import VinInfo from '../../publish/component/VinInfo';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarBrandSelectScene from "../CarBrandSelectScene";
import CarInfomationSourceScene from './CarInformationSourceScene';
import CityListScene from "../CityListScene";
import * as AppUrls from "../../constant/appUrls";
import * as Net from "../../utils/ImageUpload";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const scanImg = require('../../../images/financeImages/scan.png');
const IS_ANDROID = Platform.OS === 'android';


export default class CarBuyTaskScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootContaier}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(200)}>
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
                </ScrollView>
                </KeyboardAvoidingView>
                <VinInfo viewData={this.scanType} vinPress={this._vinPress} ref={(modal) => {this.vinModal = modal}}/>
                <DateTimePicker
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                <TouchableOpacity style={styles.footBtn} onPress={this.footBtnClick}>
                    <Text style={styles.footBtnText}>提交</Text>
                </TouchableOpacity>
                <AllNavigationView title="收车任务" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellSelectAction=(selectDict)=>{
        alert(selectDict.title,selectDict.value);
    }

    footBtnClick=()=>{
        alert('提交');
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
                      title:'客户姓名',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                      tailView: () => {
                          return (
                              <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                  <TextInput style={styles.textInput}
                                             ref={(ref)=>{this.firstPrice = ref}}
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
                      title:'联系电话',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                      tailView: () => {
                          return (
                              <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                  <TextInput style={styles.textInput}
                                             ref={(ref)=>{this.firstPrice = ref}}
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
                      title:'意向价格',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                      tailView: () => {
                          return (
                              <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                  <TextInput style={styles.textInput}
                                             ref={(ref)=>{this.online_retail_price = ref}}
                                             placeholder='请输入'
                                             keyboardType={'numeric'}
                                             maxLength={7}
                                             underlineColorAndroid='transparent'
                                             onChangeText={(text)=>{

                                                 if(text.length>4&&text.indexOf('.')==-1){
                                                     text = text.substring(0,text.length-1);
                                                 }
                                                 let moneyStr = this.chkPrice(text);
                                                 this.online_retail_price.setNativeProps({
                                                     text: moneyStr,
                                                 });
                                             }}/>
                                  <Text allowFontScaling={false}  style={styles.textInputTitle}>万元</Text>
                              </View>)
                      }
                  },
                  {
                      title:'信息来源',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'收车地区',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'初登日期',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                  },
                  {
                      title:'第一次给价',
                      isShowTag:false,
                      value:'请选择',
                      isShowTail:true,
                      tailView: () => {
                          return (
                              <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                  <TextInput style={styles.textInput}
                                             ref={(ref)=>{this.firstPrice = ref}}
                                             placeholder='请输入'
                                             keyboardType={'numeric'}
                                             maxLength={7}
                                             underlineColorAndroid='transparent'
                                             onChangeText={(text)=>{

                                                 if(text.length>4&&text.indexOf('.')==-1){
                                                     text = text.substring(0,text.length-1);
                                                 }
                                                 let moneyStr = this.chkPrice(text);
                                                 this.firstPrice.setNativeProps({
                                                     text: moneyStr,
                                                 });
                                             }}/>
                                  <Text allowFontScaling={false}  style={styles.textInputTitle}>万元</Text>
                              </View>)
                      }
                  },


              ],
              [
                  {
                      title:'是后成交',
                      isShowTag:false,
                      isShowTail:true,
                      selectDict:{current:'尚未成交',data:[{title:'尚未成交',value:1},{title:'已经成交',value:2},{title:'已放弃',value:3}]},
                  },

              ],
              [
                  {
                      title:'成交价格',
                      isShowTag:false,
                      value:'查看',
                      isShowTail:true,
                      tailView: () => {
                          return (
                              <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                  <TextInput style={styles.textInput}
                                             ref={(ref)=>{this.dealPrice = ref}}
                                             placeholder='请输入'
                                             keyboardType={'numeric'}
                                             maxLength={7}
                                             underlineColorAndroid='transparent'
                                             onChangeText={(text)=>{

                                                 if(text.length>4&&text.indexOf('.')==-1){
                                                     text = text.substring(0,text.length-1);
                                                 }
                                                 let moneyStr = this.chkPrice(text);
                                                 this.dealPrice.setNativeProps({
                                                     text: moneyStr,
                                                 });
                                             }}/>
                                  <Text allowFontScaling={false}  style={styles.textInputTitle}>万元</Text>
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
            isDateTimePickerVisible:false
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

        }else if(title == '收车地区'){

            this.pushCityListScene();

        }else if(title == '初登日期'){

            this._labelPress('register');

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

                currentTitle:this.titleData1[2][1].value,
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
        this.titleData1[2][1].value = selectObject.title;
    }

    /**
     * from @zhaojian
     *
     * 跳转到城市选择页面
     **/
    pushCityListScene = () => {

        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCityClick: this.checkedCityClick,
            }
        };
        this.toNextPage(navigatorParams);
    }

    /**
     * from @zhaojian
     *
     * 保存城市信息
     **/
    checkedCityClick = (city) => {

        this.titleData1[2][2].value = city.city_name;
        this.upTitleData();
    }

    _labelPress=(type)=>{
        this.type = type;
        this.setState({ isDateTimePickerVisible: true });
    };

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');
        if(this.type === 'register') {

            this.titleData1[2][3].value = d;
        }

        this.upTitleData();
        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

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
     * from @ZN
     *
     * 正则校验，保证小数点后只能有两位
     **/
    chkPrice = (obj) => {
        obj = obj.replace(/[^\d.]/g, "");
        //必须保证第一位为数字而不是.
        obj = obj.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        if ((/\.\d{3}/).test(obj)) {
            obj = obj.substring(0, obj.length - 1);
        }

        return obj;
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

    /**
     * from @ZN
     * 时间戳转换
     * @param date
     * @param fmt
     * @returns {*}
     */
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
    rootContaier:{
        backgroundColor:fontAndColor.COLORA3,
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
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
    footBtn:{
        left:0,
        bottom:0,
        right:0,
        backgroundColor:fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        height:Pixel.getPixel(44),
    },
    footBtnText:{
        textAlign:'center',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color:'white',
    }
});