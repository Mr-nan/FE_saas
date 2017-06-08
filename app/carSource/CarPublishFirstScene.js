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
    Keyboard,
    ScrollView,
    Platform,
    NativeModules,
    DeviceEventEmitter,
    KeyboardAvoidingView,

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
const sceneHeight = Dimensions.get('window').height;
const scanImg = require('../../images/financeImages/scan.png');
const IS_ANDROID = Platform.OS === 'android';

export default class CarPublishFirstScene extends BaseComponent{



    initFinish=()=>{

        if(this.props.carID!==undefined){

            this.loadCarData();

        }else {
            // StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            //     if(data.code == 1 && data.result != '')
            //     {
            //         let enters = JSON.parse(data.result);
            //         this.carData['show_shop_id'] = enters.company_base_id;
            //         this.carData['city_id'] = enters.city_id;
            //         this.carData['provice_id'] = enters.prov_id;
            //         this.carData['city_name'] = enters.city_name;
            //         this.getLocalityCarData();
            //
            //     }else{
            //         this._showHint('无法找到所属商户');
            //     }
            // });

            StorageUtil.mGetItem(StorageKeyNames.ENTERPRISE_LIST,(data)=>{
                if(data.code == 1 && data.result != ''){
                    let enters = JSON.parse(data.result);
                    if(enters.length === 1){

                        this.carData['show_shop_id'] = enters[0].enterprise_uid;
                        this.carData['city_id'] = enters[0].city_id;
                        this.carData['provice_id'] = enters[0].prov_id;
                        this.carData['city_name'] = enters[0].city_name;
                        this.getLocalityCarData();

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
    }
    // 构造
      constructor(props) {
        super(props);
          this.carType ='二手车';
          this.enterpriseList = [];
          this.scanType = [
              {model_name: '扫描前风挡'},
              {model_name: '扫描行驶证'}
          ];
          this.modelData = [];
          this.modelInfo = {};
          this.carData={'v_type':1};
          this.titleData1=[
              [
                  {
                      title:'车辆类型',
                      isShowTag:false,
                      isShowTail:true,
                      selectDict:{current:this.carType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
                  },
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
                                                this.setCurrentPy('vinInput');
                                             }}
                                             placeholderTextColor={fontAndColor.COLORA4}
                                             keyboardType={'ascii-capable'}
                                             placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                                  />
                                  {
                                      !this.props.carID &&(<TouchableOpacity onPress={this._onScanPress} style={{flexDirection:'row', alignItems:'center'}}>
                                          <Image style={styles.scanImage} source={scanImg}/>
                                          <Text style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28,marginLeft:Pixel.getPixel(5)}}>扫描</Text>
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
                  {
                      title:'排量',
                      isShowTag:true,
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput
                                  ref={(input) => {this.displacementInput = input}}
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{this.carData['displacement']=text}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  onFocus={()=>{
                                      this.setCurrentPy('displacementInput');
                                  }}
                                  placeholderTextColor={fontAndColor.COLORA4}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
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
                  isShowTail:true,
              },
                  {
                      title:'配置改装说明',
                      isShowTag:false,
                      value:'请填写',
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput
                                  style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(50)}]}
                                  placeholder='请填写'
                                  maxLength={50}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{this.carData['modification_instructions']=text}}
                                  onEndEditing={()=>{this.saveCarData();}}
                                  ref={(input) => {this.instructionsInput = input}}
                                  onFocus={()=>{
                                      this.setCurrentPy('instructionsInput');
                                  }}
                                  placeholderTextColor={fontAndColor.COLORA4}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
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
                      selectDict:{current:this.carType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
                  },
                  {
                      title:'车架号',
                      subTitle:"",
                      isShowTag:true,
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
                                                 this.setCurrentPy('vinInput');
                                             }}
                                             placeholderTextColor={fontAndColor.COLORA4}
                                             keyboardType={'ascii-capable'}
                                             placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                                  />
                                  {
                                      !this.props.carID &&(<TouchableOpacity onPress={this._onScanPress} style={{flexDirection:'row', alignItems:'center'}}>
                                          <Image style={styles.scanImage} source={scanImg}/>
                                          <Text style={{color:fontAndColor.COLORA2, fontSize:fontAndColor.LITTLEFONT28,marginLeft:Pixel.getPixel(5)}}>扫描</Text>
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
                  {
                      title:'排量',
                      isShowTag:true,
                      isShowTail:false,
                      tailView:()=>{
                          return(
                              <TextInput
                                  style={styles.textInput}
                                  placeholder='请输入'
                                  onChangeText={(text)=>{
                                      this.carData['displacement']=text}
                                  }
                                  ref={(input) => {this.displacementInput = input}}
                                  underlineColorAndroid='transparent'
                                  onEndEditing={()=>{this.saveCarData();}}
                                  onFocus={()=>{
                                      this.setCurrentPy('displacementInput');
                                  }}
                                  placeholderTextColor={fontAndColor.COLORA4}
                                  placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                              />
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
                      isShowTail:true,
                  },
                  {
                      title:'配置改装说明',
                      isShowTag:false,
                      tailView:()=>{
                          return(
                              <TextInput
                                  style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(50)}]}
                                  ref={(input) => {this.instructionsInput = input}}
                                  placeholder='请填写'
                                  maxLength={50}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text)=>{
                                      this.carData['modification_instructions']=text}
                                  }
                                  onEndEditing={()=>{this.saveCarData();}}
                                  onFocus={()=>{
                                      this.setCurrentPy('instructionsInput');
                                  }}
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
              isDateTimePickerVisible:false,
          };
      }

    // componentWillMount() {
    //
    //     // Keyboard events监听
    //     Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace);
    // }
    //
    // componentWillUnMount() {
    //     Keyboard.removeAllListeners('keyboardWillShow');
    // }
    setCurrentPy =(ref)=>{

        console.log(ref);

        // ref.measure((ox, oy, width, height, px, py)=>{
        //
        //     let currentPy = py + height;
        //     console.log(currentPy,sceneHeight);
        //     if(sceneHeight - currentPy < this.keyboardSpace)
        //     {
        //         this.scrollView.scrollTo({x: 0, y:this.keyboardSpace + (sceneHeight- currentPy+Pixel.getPixel(50)), animated: true});
        //     }
        //
        // });
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    // updateKeyboardSpace =(frames)=>{
    //
    //     this.keyboardSpace = frames.endCoordinates.height//获取键盘高度
    //
    // }


    render(){

        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(100)}>
                    <ScrollView  ref={(ref)=>{this.scrollView = ref}} keyboardDismissMode={'on-drag'}>
                        <View style={{width:sceneWidth,paddingVertical:Pixel.getPixel(25),backgroundColor:'white'}}>
                            <Image style={{width:sceneWidth}} resizeMode={'contain'} source={require('../../images/carSourceImages/publishCarperpos1.png')}/>
                        </View>
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
                                                                cellSelectAction={this.cellSelectAction}
                                                                ref="cellSelectView"
                                                            />
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
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    loadCarData=()=>{

        this.props.showModal(true);

        Net.request(AppUrls.CAR_DETAIL, 'post', {
            id: this.props.carID,
            imgType:0,
        }).then((response) => {

            this.props.showModal(false);

            if(response.mycode==1){
                this.carData = response.mjson.data;
                this.carData.manufacture= response.mjson.data.manufacture!=''?  this.dateReversal(response.mjson.data.manufacture+'000'):'';
                this.carData.init_reg=response.mjson.data.init_reg!=''? this.dateReversal(response.mjson.data.init_reg+'000'):'';
                this.carData.emission_standards = response.mjson.data.emission_standards_en;
                this.setCarData();
            }


        }, (error) => {
            this.props.showModal(false);
            this.props.showToast(error.msg);
        });

    }

    // 获取本地数据
    getLocalityCarData=()=>{

        if(this.carData.show_shop_id){
            StorageUtil.mGetItem(String(this.carData.show_shop_id),(data) => {
                if (data.code == 1) {
                    if (data.result) {
                        this.carData=JSON.parse(data.result);
                        this.setCarData();
                    }
                }
            })

        }
    }


    saveCarData=()=>{

            if(this.carData.show_shop_id && !this.carData.id){
                StorageUtil.mSetItem(String(this.carData.show_shop_id),JSON.stringify(this.carData));
            }

    }

    setCarData=()=>{
        if(this.carData.v_type!==1){
            this.titleData1[0][0].selectDict.current = this.carData.v_type == 2?'新车':'平行进口车';
            this.titleData2[0][0].selectDict.current = this.carData.v_type == 2?'新车':'平行进口车';
            this.carType=this.titleData1[0][0].selectDict.current;
            this.refs.cellSelectView.setCurrentChecked(this.carType);
        }

        if(this.carData.vin){
            this.vinInput.setNativeProps({
                text: this.carData.vin
            });
        }
        this.titleData1[0][2].value = this.carData.model_name?this.carData.model_name:'请选择';
        this.titleData2[0][2].value = this.carData.model_name?this.carData.model_name:'请选择';

        if(this.carData.displacement){
            this.displacementInput.setNativeProps({
                text: this.carData.displacement
            });
        }

        this.titleData1[0][4].value = this.carData.emission_standards?this.carData.emission_standards:'请选择';
        this.titleData2[0][4].value = this.carData.emission_standards?this.carData.emission_standards:'请选择';

        this.titleData1[0][5].value = this.carData.car_color?this.carData.car_color.split("|")[0]:'请选择';
        this.titleData2[0][5].value = this.carData.car_color?this.carData.car_color.split("|")[0]:'请选择';

        this.titleData1[0][6].value = this.carData.trim_color?this.carData.trim_color.split("|")[0]:'请选择';
        this.titleData2[0][6].value = this.carData.trim_color?this.carData.trim_color.split("|")[0]:'请选择';

        this.titleData1[1][0].value = this.carData.manufacture?this.carData.manufacture:'请选择';
        this.titleData2[1][0].value = this.carData.manufacture?this.carData.manufacture:'请选择';

        this.titleData1[1][1].value = this.carData.init_reg?this.carData.init_reg:'请选择';

        if(this.carData.modification_instructions){
            this.instructionsInput.setNativeProps({
                text: this.carData.modification_instructions
            });
        }

        if(this.carType=='二手车'){
            this.setState({
                titleData:this.titleData1,
            });
        }else {
            this.setState({
                titleData:this.titleData2,
            });
        }
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

    }

    cellSelectAction=(selectDict)=>{

        this.carData['v_type']=selectDict.value;
        this.carData['v_type_str'] = selectDict.title;
        this.carType=selectDict.title;
        this.upTitleData();
    }


    footBtnClick=()=>{

        console.log(this.carData);

        if(!this.carData.vin||this.carData.vin==''){
            this.props.showToast('请输入正确的车架号');
            return;
        }

        if(!this.carData.model_name)
        {
            this.props.showToast('选择车型');
            return;
        }
        if(!this.carData.displacement||this.carData.displacement=='')
        {
            this.props.showToast('输入排量');
            return;
        }
        if(!this.carData.emission_standards)
        {
            this.props.showToast('选择排放标准');
            return;
        }
        if(!this.carData.car_color)
        {
            this.props.showToast('选择车身颜色');
            return;
        }
        if(!this.carData.trim_color)
        {
            this.props.showToast('选择内饰颜色');
            return;
        }
        if(!this.carData.manufacture)
        {
            this.props.showToast('选择出厂日期');
            return;
        }

        if(this.carData.v_type==1){

            if(!this.carData.init_reg)
            {
                this.props.showToast('选择初登日期');
                return;
            }

            let manufactureData = new  Date(this.carData.manufacture);
            let initReg = new  Date(this.carData.init_reg);
            if(manufactureData.getTime() > initReg.getTime())
            {
                this.props.showToast('初登日期不得早于出厂日期');
                return;
            }

        }

        if(this.carData.v_type!==1){
            this.carData.init_reg = '';
            this.titleData1[1][1].value = '请选择';
        }

        let navigatorParams = {
            name: "CarPublishSecondScene",
            component: CarPublishSecondScene,
            params: {
                carData:this.carData,
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
            this.titleData2[1][0].value = d;
            this.carData['manufacture']=d;

        }else{
           this.titleData1[1][1].value = d;
            this.carData['init_reg']=d;
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
            this.titleData1[0][4].value = this.modelData[index].model_emission_standard;
            this.titleData1[1][0].value = this.modelData[index].model_year+'-06-01';
            this.titleData1[1][1].value = this.modelData[index].model_year+'-06-01';

            this.titleData2[0][2].value = this.modelData[index].model_name;
            this.titleData2[0][4].value = this.modelData[index].model_emission_standard;
            this.titleData2[1][0].value = this.modelData[index].model_year+'-06-01';

            this.carData['manufacture'] = this.modelData[index].model_year+'-06-01';
            this.carData['model_id'] = this.modelData[index].model_id;
            this.carData['emission_standards'] = this.modelData[index].model_emission_standard;
            this.carData['series_id'] = this.modelData[index].series_id;
            this.carData['model_name'] = this.modelData[index].model_name;
            this.carData['brand_id'] = this.modelData[index].brand_id;

            if(this.carType=='二手车')
            {
                this.carData['init_reg'] = this.modelData[index].model_year+'-06-01';

            }else {
                this.carData['init_reg'] = '';
                this.titleData1[1][1].value = '请选择';
            }

            if(this.modelData[index].model_liter){
                this.carData['displacement']=this.modelData[index].model_liter;
                this.displacementInput.setNativeProps({
                    text: this.modelData[index].model_liter
                });
            }
            this.upTitleData();
        }

    };
    //车架号改变
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

                            this.carData['vin'] = '';
                            this.titleData1[0][1].subTitle='校验失败';
                            this.titleData2[0][1].subTitle='校验失败';
                            this.upTitleData();


                        } else if (rd.length === 1) {
                            this.modelInfo['brand_id'] = rd[0].brand_id;
                            this.modelInfo['model_id'] = rd[0].model_id;
                            this.modelInfo['series_id'] = rd[0].series_id;
                            this.modelInfo['model_year'] = rd[0].model_year;
                            this.modelInfo['model_name'] = rd[0].model_name;

                            this.titleData1[0][1].subTitle='';
                            this.titleData2[0][1].subTitle='';

                            this.titleData1[0][2].value = rd[0].model_name;
                            this.titleData1[0][4].value = rd[0].model_emission_standard;
                            this.titleData1[1][0].value = rd[0].model_year+'-06-01';
                            this.titleData1[1][1].value = rd[0].model_year+'-06-01';

                            this.titleData2[0][2].value = rd[0].model_name;
                            this.titleData2[0][4].value = rd[0].model_emission_standard;
                            this.titleData2[1][0].value = rd[0].model_year+'-06-01';

                            this.carData['manufacture'] = rd[0].model_year+'-06-01';
                            if(this.carType=='二手车')
                            {
                                this.carData['init_reg'] = rd[0].model_year+'-06-01';

                            }else {
                                this.carData['init_reg'] = '';
                                this.titleData1[1][1].value = '请选择';

                            }

                            this.carData['model_id'] = rd[0].model_id;
                            this.carData['emission_standards'] = rd[0].model_emission_standard;
                            this.carData['series_id'] = rd[0].series_id;
                            this.carData['model_name'] = rd[0].model_name;
                            this.carData['brand_id'] = rd[0].brand_id;
                            if(rd[0].model_liter){
                                this.carData['displacement']=rd[0].model_liter;
                                this.displacementInput.setNativeProps({
                                    text:rd[0].model_liter
                                });
                            }

                            this.carData['vin'] = text;
                            this.upTitleData();

                        } else if (rd.length > 1) {

                            this.carData['vin'] = text;
                            this.modelData = response.mjson.data;
                            this.vinModal.refresh(this.modelData);
                            this.vinModal.openModal(0);
                        }

                    } else {
                        this.titleData1[0][1].subTitle='校验失败';
                        this.titleData2[0][1].subTitle='校验失败';
                        this.upTitleData();
                    }
                },
                (error) => {
                    this._closeLoading();
                    this.titleData1[0][1].subTitle='校验失败';
                    this.titleData2[0][1].subTitle='校验失败';
                    this.upTitleData();
                }
            );
        }
    };


    upTitleData=()=>{

        if(this.carType=='二手车'){
            this.setState({
                titleData:this.titleData1,
            });
        }else {
            this.setState({
                titleData:this.titleData2,
            });
        }

        this.saveCarData();
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

        this.carData['show_shop_id'] = this.enterpriseList[rowID].enterprise_uid;
        this.carData['city_id'] = this.enterpriseList[rowID].city_id;
        this.carData['prov_id'] = this.enterpriseList[rowID].prov_id;
        this.carData['city_name'] = this.enterpriseList[rowID].city_name;
        this.getLocalityCarData();

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


        if(carObject.liter){
            this.carData['displacement']=carObject.liter;
            this.displacementInput.setNativeProps({
                text:carObject.liter
            });
        }
        this.titleData1[0][1].subTitle='';
        this.titleData2[0][1].subTitle='';
        this.titleData1[0][2].value = carObject.model_name;
        this.titleData1[0][4].value = carObject.discharge_standard;
        this.titleData1[1][0].value = carObject.model_year+'-06-01';
        this.titleData1[1][1].value = carObject.model_year+'-06-01';

        this.titleData2[0][2].value = carObject.model_name;
        this.titleData2[0][4].value = carObject.discharge_standard;
        this.titleData2[1][0].value = carObject.model_year+'-06-01';

        this.carData['manufacture'] = carObject.model_year+'-06-01';
        if(this.carType =='二手车')
        {
            this.carData['init_reg'] = carObject.model_year+'-06-01';
        }else {
            this.carData['init_reg'] = '';
            this.titleData1[1][1].value = '请选择';

        }
        this.carData['model_id'] = carObject.model_id;
        this.carData['emission_standards'] = carObject.discharge_standard;
        this.carData['series_id'] = carObject.series_id;
        this.carData['model_name'] = carObject.model_name;
        this.carData['brand_id']=carObject.brand_id;


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
        this.titleData2[0][4].value = dischargeObject.title;
        this.carData['emission_standards'] = dischargeObject.title;
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
        this.titleData2[0][5].value = carBodyColorSceneObject.title;

        this.carData['car_color'] = carBodyColorSceneObject.title+'|'+carBodyColorSceneObject.value;
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
        this.titleData2[0][6].value = carInwardSceneObject.title;
        this.carData['trim_color']=carInwardSceneObject.title+'|'+carInwardSceneObject.value;
        this.upTitleData();
    }

    pushCarAutoConfigScene=()=>{
        let navigationParams={
            name: "AutoConfig",
            component: AutoConfig,
            params: {

                modelID:this.carData.model_id,
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

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"-"+(this.PrefixInteger(date.getMonth()+1,2)))+"-"+(this.PrefixInteger(date.getDate(),2));

    };
    PrefixInteger =(num,length)=>{

        return (Array(length).join('0') + num).slice(-length);

    }

}



const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64)
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(20),

    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:sceneWidth-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
        marginBottom:Pixel.getPixel(20),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
    textInput:{
        height: Pixel.getPixel(30),
        borderColor: fontAndColor.COLORA0,
        width:Pixel.getPixel(160),
        textAlign:'right',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:0,
        paddingRight:0,
        backgroundColor:'white'
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
});