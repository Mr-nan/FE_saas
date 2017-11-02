/**
 * Created by zhengnan on 2017/5/11.
 */
import React, {Component} from 'react';
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

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import {CellView, CellSelectView} from '../znComponent/CarPublishCell';
import CarPublishSecondScene from './NewCarPublishSecondScene';
import *as fontAndColor from '../../constant/fontAndColor';
import CarBrandSelectScene   from '../CarBrandSelectScene';
import CarDischargeScene from  './CarDischargeScene';
import CarBodyColorScene from './CarBodyColorScene';
import CarInwardColorScene from './CarInwardColorScene';
import AutoConfig      from '../../publish/AutoConfig';

import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';
import PixelUtil from '../../utils/PixelUtil';

import * as CarDeployData from '../carData/CarDeployData';
import CityListScene from  '../CityListScene';

const Pixel = new PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const sceneHeight = Dimensions.get('window').height;
const IS_ANDROID = Platform.OS === 'android';

export default class NewCarPublishFirstScene extends BaseComponent {


    initFinish = () => {
        this.loadCarConfigurationData();
    }
    allRefresh = () => {
        this.loadCarConfigurationData();
    }

    loadCarConfigurationData = () => {

        CarDeployData.getCarDeployData((value) => {
            this.setState({
                renderPlaceholderOnly: value ? 'loading' : 'success'
            });
        }, (value) => {
            this.setState({
                renderPlaceholderOnly: 'error'
            });
        }, (fetchObject) => {

            this.carConfigurationData = fetchObject;
            if (this.props.carID !== undefined) {

                this.loadCarData();

            } else {

                if (this.props.carData) {
                    this.carData = this.props.carData;
                }
                StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
                    if (data.code == 1 && data.result != '') {
                        let enters = JSON.parse(data.result);
                        this.carData['show_shop_id'] = enters.company_base_id;
                        this.carData['city_id'] = enters.city_id;
                        this.carData['provice_id'] = enters.prov_id;
                        this.carData['city_name'] = enters.city_name;
                        this.getLocalityCarData();

                    } else {
                        this._showHint('无法找到所属商户');
                    }
                });
            }
        });
    }

    // 构造
    constructor(props) {
        super(props);
        this.carType = '有现车';
        this.carData = {'v_type': 1};
        this.titleData1 = [
            [{
                title: '车型',
                isShowTag: true,
                value: '请选择',
                isShowTail: true,
            }, {
                title: '车规',
                isShowTag: true,
                value: '请选择',
                isShowTail: true,
            }, {
                title: '车身颜色',
                isShowTag: true,
                value: '请选择',
                isShowTail: true,
            }, {
                title: '内饰颜色',
                isShowTag: false,
                value: '请选择',
                isShowTail: true,
            }],

            [{
                title: '车辆所在地',
                isShowTag: true,
                value: this.carData.city_name ? this.carData.city_name : '请选择',
                isShowTail: true,
            }, {
                title: '是否有现车',
                isShowTag: false,
                isShowTail: true,
                selectDict: {current: this.carType, data: [{title: '有现车', value: 1}, {title: '无现车', value: 2}]},
            }, {
                title: '在售车辆数',//xxxxxxxxxx
                // subTitle: '仅供内部销售人员查看',
                isShowTag: false,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       underlineColorAndroid='transparent'
                                       ref={(ref)=>{this.saleCountInput = ref}}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.saleCountInput);
                                       }}
                                       defaultValue={this.carData.sale_count?this.carMoneyChange(this.carData.sale_count):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                               if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['sale_count']= moneyStr;
                                           this.saleCountInput.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>辆</Text>
                        </View>)
                }
            }],

            [{
                title: '指导价',//xxxxxxxxxxxxxx
                // subTitle: '仅供内部销售人员查看',
                isShowTag: false,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       underlineColorAndroid='transparent'
                                       ref={(ref)=>{this.suggestionPriceInput = ref}}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.suggestionPriceInput);
                                       }}
                                       defaultValue={this.carData.suggestion_price?this.carMoneyChange(this.carData.suggestion_price):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                               if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['suggestion_price']= moneyStr;
                                           this.suggestionPriceInput.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }, {
                title: '分销批发价',
                // subTitle: '展示给其他车商看',
                isShowTag: true,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       ref={(ref)=>{this.dealerPriceInput = ref}}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.dealerPriceInput);
                                       }}
                                       underlineColorAndroid='transparent'
                                       defaultValue={this.carData.dealer_price?this.carMoneyChange(this.carData.dealer_price):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                            if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['dealer_price']= moneyStr;
                                           this.dealerPriceInput.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }, {
                title: '网上零售价',
                // subTitle: '展示给个人消费者看',
                isShowTag: true,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       ref={(ref)=>{this.online_retail_price = ref}}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.online_retail_price);
                                       }}
                                       underlineColorAndroid='transparent'
                                       defaultValue={this.carData.online_retail_price?this.carMoneyChange(this.carData.online_retail_price):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{

                                           if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['online_retail_price']= moneyStr;
                                           this.online_retail_price.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }],

            [{
                title: '配置改装说明',
                subTitle: '点击查看标配',
                isShowTag: false,
                value: '请填写',
                isShowTail: false,
                tailView: () => {
                    return (
                        <TextInput
                            style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(50)}]}
                            placeholder='请输入 '
                            maxLength={50}
                            underlineColorAndroid='transparent'
                            defaultValue={this.carData.modification_instructions?this.carMoneyChange(this.carData.modification_instructions):''}
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
            }, {
                title: '手续说明',
                isShowTag: false,
                value: '请填写',
                isShowTail: false,
                tailView: () => {
                    return (
                        <TextInput
                            style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(50)}]}
                            placeholder='请输入 '
                            maxLength={50}
                            underlineColorAndroid='transparent'
                            defaultValue={this.carData.procedure_description?this.carMoneyChange(this.carData.procedure_description):''}
                            onChangeText={(text)=>{this.carData['procedure_description']=text}}
                            onEndEditing={()=>{this.saveCarData();}}
                            ref={(input) => {this.procedureInput = input}}
                            onFocus={()=>{
                                      this.setCurrentPy('iprocedureInput');
                                  }}
                            placeholderTextColor={fontAndColor.COLORA4}
                            placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                        />
                    )
                }
            }],

            [{
                title: '圈子内的分销批发价',
                // subTitle: '展示给其他圈友看',
                isShowTag: false,
                isShowTail: false,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       ref={(ref)=>{this.dealer_price_circle = ref}}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.dealer_price_circle);
                                       }}
                                       underlineColorAndroid='transparent'
                                       defaultValue={this.carData.dealer_price_circle?this.carMoneyChange(this.carData.dealer_price_circle):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                            if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['dealer_price_circle']= moneyStr;
                                           this.dealer_price_circle.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }, {
                title: '销售底价',
                // subTitle: '仅供内部销售人员查看',
                isShowTag: false,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       underlineColorAndroid='transparent'
                                       ref={(ref)=>{this.lowPriceInput = ref}}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.lowPriceInput);
                                       }}
                                       defaultValue={this.carData.low_price?this.carMoneyChange(this.carData.low_price):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                               if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['low_price']= moneyStr;
                                           this.lowPriceInput.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }, {
                title: '到店零售价',
                // subTitle: '销售人员 对到店个人消费者报价',
                isShowTag: false,
                isShowTail: true,
                tailView: () => {
                    return (
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入 '
                                       keyboardType={'numeric'}
                                       maxLength={7}
                                       underlineColorAndroid='transparent'
                                       ref={(ref)=>{this.retail_price_store = ref}}
                                       onFocus={()=>{
                                           this.setCurrentPy(this.retail_price_store);
                                       }}
                                       defaultValue={this.carData.retail_price_store?this.carMoneyChange(this.carData.retail_price_store):''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{
                                               if(text.length>4&&text.indexOf('.')==-1){
                                               text = text.substring(0,4);
                                            }
                                           let moneyStr = this.chkPrice(text);
                                           this.carData['retail_price_store']= moneyStr;
                                           this.retail_price_store.setNativeProps({
                                               text: moneyStr,
                                           });
                                       }}/>
                            <Text allowFontScaling={false} style={styles.textInputTitle}>万元</Text>
                        </View>)
                }
            }]

        ];

        this.state = {
            titleData: this.titleData1,
            isDateTimePickerVisible: false,
            renderPlaceholderOnly: 'loading'
        };
    }

    setCurrentPy = (ref) => {
        console.log(ref);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
                    <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
                </View>);
        }

        return (
            <View style={styles.rootContainer}>
                {
                    IS_ANDROID ? (this.loadScrollView()) : (
                            <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(100)}>
                                {
                                    this.loadScrollView()
                                }
                            </KeyboardAvoidingView>
                        )
                }
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    loadScrollView = () => {
        return (
            <ScrollView ref={(ref)=>{this.scrollView = ref}} keyboardDismissMode={IS_ANDROID?'none':'on-drag'}>
                {
                    this.state.titleData.map((data, index) => {
                        return (
                            <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                {
                                    data.map((rowData, subIndex) => {
                                        return ( rowData.selectDict ? (
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
                                                </TouchableOpacity>) : (
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
                            <Text allowFontScaling={false} style={styles.footText}>下一步</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    loadCarData = () => {

        this.props.showModal(true);

        Net.request(AppUrls.CAR_DETAIL, 'post', {
            id: this.props.carID,
            imgType: 0,
        }).then((response) => {

            this.props.showModal(false);

            if (response.mycode == 1) {
                this.carData = response.mjson.data;
                this.carData.manufacture = response.mjson.data.manufacture != '' ? this.dateReversal(response.mjson.data.manufacture + '000') : '';
                this.carData.init_reg = response.mjson.data.init_reg != '' ? this.dateReversal(response.mjson.data.init_reg + '000') : '';
                this.carData.emission_standards = response.mjson.data.emission_standards;
                this.setCarData();
            }


        }, (error) => {
            this.props.showToast(error.msg);
        });

    }

    // 获取本地数据
    getLocalityCarData = () => {


        if (this.props.carData) {
            this.setCarData();
            return;
        }

        if (this.carData.show_shop_id) {
            StorageUtil.mGetItem(String(this.carData.show_shop_id), (data) => {
                if (data.code == 1) {
                    if (data.result) {
                        this.carData = JSON.parse(data.result);
                        this.setCarData();
                    }
                }
            })

        }
    }

    /**
     * from @zhaojian
     *
     * 校验车辆金额
     **/
    carMoneyChange = (carMoney) => {

        let newCarMoney = parseFloat(carMoney);
        let carMoneyStr = newCarMoney.toFixed(2);
        let moneyArray = carMoneyStr.split(".");

        // console.log(carMoney+'/'+newCarMoney +'/' + carMoneyStr +'/' +moneyArray);

        if (moneyArray.length > 1) {
            if (moneyArray[1] > 0) {

                return moneyArray[0] + '.' + moneyArray[1];

            } else {

                return moneyArray[0];
            }

        } else {
            return carMoneyStr;
        }
    }

    /**
     * from @zhaojian
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
     * 保存修改
     */
    saveCarData = () => {

        if (this.carData.show_shop_id && !this.carData.id) {
            StorageUtil.mSetItem(String(this.carData.show_shop_id), JSON.stringify(this.carData));
        }

    }

    setCarData = () => {
        if (this.carData.v_type !== 1) {
            this.carType = this.titleData1[1][1].selectDict.current;//是否有现车
            this.refs.cellSelectView.setCurrentChecked(this.carType);
        }

        this.titleData1[0][0].value = this.carData.model_name ? this.carData.model_name : '请选择';
        this.titleData1[0][1].value = this.carData.model_name ? this.carData.model_name : '请选择';//??????

        this.titleData1[0][2].value = this.carData.car_color ? this.carData.car_color.split("|")[0] : '请选择';
        this.titleData1[0][2].value = this.carData.trim_color ? this.carData.trim_color.split("|")[0] : '请选择';

        this.titleData1[1][0].value = this.carData.city_name ? this.carData.city_name : '请选择';

        this.setState({
            titleData: this.titleData1,
        });
    }


    cellClick = (title) => {

        if (title == '车型') {
            this.pushCarBrand();
        } else if (title == '车规') {
            // this.pushCarDischarge();
        } else if (title == '车身颜色') {
            this.pushCarBodyColorScene();
        } else if (title == '内饰颜色') {
            this.pushCarInwardColorScene();
        } else if (title == '车辆所在地') {
            this.pushCityListScene();
        } else if (title == '配置改装说明') {
            this.pushCarAutoConfigScene();
        }
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

        console.log(city);
        this.titleData1[1][0].value = city.city_name;
        this.carData['city_name'] = city.city_name;
        this.carData['city_id'] = city.city_id;
        this.carData['provice_id'] = city.provice_id;
        this.upTitleData();

    }


    cellSelectAction = (selectDict) => {

        this.carData['v_type'] = selectDict.value;
        this.carData['v_type_str'] = selectDict.title;
        this.carType = selectDict.title;
        this.upTitleData();
    }


    footBtnClick = () => {

        console.log(this.carData);

        if (!this.carData.model_name) {
            this.props.showToast('选择车型');
            return;
        }

        if (!this.carData.car_color) {
            this.props.showToast('选择车身颜色');
            return;
        }
        if (!this.carData.trim_color) {
            this.props.showToast('选择内饰颜色');
            return;
        }

        if (this.carData.v_type !== 1) {
            this.carData.init_reg = '';
            this.titleData1[1][1].value = '请选择';
        }

        let navigatorParams = {
            name: "CarPublishSecondScene",
            component: CarPublishSecondScene,
            params: {
                carData: this.carData,
                carConfigurationData: this.carConfigurationData,
            }
        }
        this.toNextPage(navigatorParams);

    }

    // _handleDatePicked = (date) => {
    //     let d = this.dateFormat(date, 'yyyy-MM-dd');
    //     if (this.type === 'factory') {
    //
    //         this.titleData1[1][0].value = d;
    //         this.carData['manufacture'] = d;
    //
    //     } else {
    //         this.titleData1[1][1].value = d;
    //         this.carData['init_reg'] = d;
    //     }
    //
    //     this.upTitleData();
    //     this._hideDateTimePicker();
    // };

    // _hideDateTimePicker = () => {
    //     this.setState({isDateTimePickerVisible: false});
    // };

    // _labelPress = (type) => {
    //     this.type = type;
    //     this.setState({isDateTimePickerVisible: true});
    // };

    upTitleData = () => {

        this.setState({
            titleData: this.titleData1,
        });

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
    // _enterprisePress = (rowID) => {
    //
    //     this.carData['show_shop_id'] = this.enterpriseList[rowID].enterprise_uid;
    //     this.carData['city_id'] = this.enterpriseList[rowID].city_id;
    //     this.carData['prov_id'] = this.enterpriseList[rowID].prov_id;
    //     this.carData['city_name'] = this.enterpriseList[rowID].city_name;
    //     this.getLocalityCarData();
    //
    // };

    pushCarBrand = () => {
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

    _checkedCarClick = (carObject) => {


        if (carObject.liter) {
            this.carData['displacement'] = carObject.liter;
            alert(carObject.liter)
            // this.displacementInput.setNativeProps({
            //     text: carObject.liter
            // });
        }
        this.titleData1[0][0].subTitle = '';
        this.titleData1[0][0].value = carObject.model_name;
        // this.titleData1[0][4].value = carObject.discharge_standard;
        // this.titleData1[1][0].value = carObject.model_year + '-06-01';
        // this.titleData1[1][1].value = carObject.model_year + '-06-01';

        // this.carData['manufacture'] = carObject.model_year + '-06-01';
        // if (this.carType == '二手车') {
        //     this.carData['init_reg'] = carObject.model_year + '-06-01';
        // } else {
        //     this.carData['init_reg'] = '';
        //     this.titleData1[1][1].value = '请选择';
        // }
        this.carData['model_id'] = carObject.model_id;
        this.carData['emission_standards'] = carObject.discharge_standard;
        this.carData['series_id'] = carObject.series_id;
        this.carData['model_name'] = carObject.model_name;
        this.carData['brand_id'] = carObject.brand_id;
        this.carData['brand_name'] = carObject.brand_name;
        this.carData['series_name'] = carObject.series_name;

        this.upTitleData();
    }

    pushCarDischarge = () => {


        let brandParams = {
            name: 'CarDischargeScene',
            component: CarDischargeScene,
            params: {
                checkedCarDischargeClick: this._checkedCarDischargeClick,
                currentChecked: this.titleData1[0][4].value,
                DischargeData: this.carConfigurationData.auto_es,
            }
        };
        this.toNextPage(brandParams);


    }

    _checkedCarDischargeClick = (dischargeObject) => {
        this.titleData1[0][2].value = dischargeObject.title;
        this.carData['emission_standards'] = dischargeObject.title;
        this.upTitleData();
    }

    pushCarBodyColorScene = () => {

        let brandParams = {
            name: 'CarBodyColorScene',
            component: CarBodyColorScene,
            params: {
                checkedCarBodyColorClick: this._checkedCarBodyColorClick,
                currentChecked: this.titleData1[0][2].value,
                carBodyColorData: this.carConfigurationData.auto_body_color,
            }
        };
        this.toNextPage(brandParams);

    }

    _checkedCarBodyColorClick = (carBodyColorSceneObject) => {

        this.titleData1[0][2].value = carBodyColorSceneObject.title;

        this.carData['car_color'] = carBodyColorSceneObject.title + '|' + carBodyColorSceneObject.value;
        this.upTitleData();
    }

    pushCarInwardColorScene = () => {

        let brandParams = {
            name: 'CarInwardColorScene',
            component: CarInwardColorScene,
            params: {
                checkedCarInwardColorClick: this._checkedCarInwardColorClick,
                currentChecked: this.titleData1[0][3].value,
                carInwardColor: this.carConfigurationData.auto_interior_color,
            }
        };
        this.toNextPage(brandParams);


    }

    _checkedCarInwardColorClick = (carInwardSceneObject) => {

        this.titleData1[0][3].value = carInwardSceneObject.title;
        this.carData['trim_color'] = carInwardSceneObject.title + '|' + carInwardSceneObject.value;
        this.upTitleData();
    }

    pushCarAutoConfigScene = () => {
        let navigationParams = {
            name: "AutoConfig",
            component: AutoConfig,
            params: {

                modelID: this.carData.model_id,
                carConfigurationData: [],
                from: 'CarPublishFirstScene'
            }
        }
        this.toNextPage(navigationParams);
    }


    dateFormat = (date, fmt) => {
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

    dateReversal = (time) => {

        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "-" + (this.PrefixInteger(date.getMonth() + 1, 2))) + "-" + (this.PrefixInteger(date.getDate(), 2));

    };
    PrefixInteger = (num, length) => {

        return (Array(length).join('0') + num).slice(-length);

    }

}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
        paddingTop: Pixel.getTitlePixel(64)
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
    textInput: {
        height: Pixel.getPixel(30),
        borderColor: fontAndColor.COLORA0,
        width: Pixel.getPixel(170),
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'white'
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
});