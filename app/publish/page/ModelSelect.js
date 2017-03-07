/**
 * from @liusai
 *
 **/
import React, {Component, PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity,
    InteractionManager,
    NativeModules
}from 'react-native';

import CarBrandSelectScene from '../../carSource/CarBrandSelectScene';
import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
import SQLiteUtil from '../../utils/SQLiteUtil';
const Pixel = new PixelUtil();
const SQLite = new SQLiteUtil();

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const scan = require('../../../images/publish/scan.png');
const arrow = require('../../../images/publish/date-select.png');
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from "../../constant/appUrls";
import VinInfo from '../component/VinInfo';

export default class ModelSelect extends PureComponent {

    constructor(props) {
        super(props);
        this.modelInfo = {};
        this.modelData = [];
        this.state = {
            renderPlaceholderOnly: true,
            modelName:'',
            showHint:false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        SQLite.createTable();
    }

    //选择车型
    _modelPress = () => {
        //选择车型
        let brandParams ={
            name: 'CarBrandSelectScene',
            component: CarBrandSelectScene,
            params: {checkedCarClick: this._checkedCarClick,
                status:0,}
        };
        this.props.goToPage(brandParams);
    };

    _checkedCarClick = (carObject)=>{
        this.setState({
            modelName:carObject.model_name
        });
        this.modelInfo['brand_id'] = carObject.brand_id;
        this.modelInfo['model_id'] = carObject.model_id;
        this.modelInfo['series_id'] = carObject.series_id;
        this.modelInfo['model_year'] = '';
        this.modelInfo['model_name'] = carObject.model_name;
        SQLite.changeData('UPDATE publishCar SET model = ? WHERE vin = ?',[JSON.stringify(this.modelInfo) ,this.vin]);
    };

    //扫描
    _scanPress = () => {
        NativeModules.VinScan.scan().then((vl)=>{
            this.vinInput.setNativeProps({
                text:vl
            });
            this._onVinChange(vl);
        },(error)=>{
            console.log(error);
        });
    };

    _renderPlaceholderView = () => {
        return (<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}/>);
    };

    //标题栏后退键
    _onBack = () => {
        this.props.onBack();
    };

    //车架号改变
    _onVinChange = (text) => {
        if (text.length === 17) {
            this.props.carNumberBack(false);
            let params ={
                vin:text,
            };
            this.vin = text;
            Net.request(AppUrls.VININFO,'post',params).then(
                (response)=>{
                    console.log('1111111111111111111');
                    if(response.mycode === 1){
                        let rd = response.mjson.data;
                        if(rd.length === 0){
                            console.log('222222222222222222222222');
                            this._insertVinNum(text);
                            this.setState({
                                showHint:true
                            });
                        }else if(rd.length === 1){
                            this.setState({
                                showHint:false
                            });
                            this.modelInfo['brand_id'] = rd[0].brand_id;
                            this.modelInfo['model_id'] = rd[0].model_id;
                            this.modelInfo['series_id'] = rd[0].series_id;
                            this.modelInfo['model_year'] = rd[0].model_year;
                            this.modelInfo['model_name'] = rd[0].model_name;
                            this._insertVinAndModel(text,JSON.stringify(this.modelInfo),rd[0].model_name);

                        }else if(rd.length > 1){
                            this.setState({
                                showHint:false
                            });
                            this.modelData = response.mjson.data;
                            this.vinModal.refresh(this.modelData);
                            this.vinModal.openModal();
                        }
                    }else {
                        this._insertVinNum(text);
                        this.setState({
                            showHint:true
                        });
                    }
                },
                (error)=>{
                    this._insertVinNum(text);
                    this.setState({
                        showHint:true
                    });
                }
            );
        }
    };

    _insertVinNum = (vinNum)=>{
        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
            [ vinNum ],
            (data) => {
                if (data.code === 1) {
                    if(data.result.rows.length === 0){
                        SQLite.changeData('INSERT INTO publishCar (vin) VALUES (?)',[ vinNum]);
                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                            [ vinNum ],
                            (data) => {
                                if (data.code === 1) {
                                    this.props.refreshCar(data.result.rows.item(0));
                                } else {
                                    console.log(data.error);
                                }
                            });
                    }else{
                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                            [ vinNum ],
                            (data) => {
                                if (data.code === 1) {
                                    this.props.refreshCar(data.result.rows.item(0));
                                    if(this.isEmpty(data.result.rows.item(0).model) === false){
                                        Object.assign(this.modelInfo, JSON.parse(data.result.rows.item(0).model));
                                        this.setState({
                                            modelName:this.modelInfo.model_name
                                        });
                                    }
                                } else {
                                    console.log(data.error);
                                }
                            });
                    }
                } else {
                    console.log(data.error);
                }
            });
    };

    //根据车架号操作数据库
    _insertVinAndModel = (vinNum,modelInfo,modelName)=>{
        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
            [ vinNum ],
            (data) => {
                if (data.code === 1) {
                    if(data.result.rows.length === 0){
                        SQLite.changeData('INSERT INTO publishCar (vin,model) VALUES (?,?)',[ vinNum ,modelInfo]);
                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                            [ vinNum ],
                            (data) => {
                                if (data.code === 1) {
                                    this.props.refreshCar(data.result.rows.item(0));
                                } else {
                                    console.log(data.error);
                                }
                            });
                        this.setState({
                            modelName:modelName
                        });
                    }else{
                        SQLite.changeData('UPDATE publishCar SET model = ? WHERE vin = ?',[modelInfo ,vinNum]);
                        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
                            [ vinNum ],
                            (data) => {
                                if (data.code === 1) {
                                    this.props.refreshCar(data.result.rows.item(0));
                                    if(this.isEmpty(data.result.rows.item(0).model) === false){
                                        Object.assign(this.modelInfo, JSON.parse(data.result.rows.item(0).model));
                                        this.setState({
                                            modelName:this.modelInfo.model_name
                                        });
                                    }
                                } else {
                                    console.log(data.error);
                                }
                            });
                    }
                } else {
                    console.log(data.error);
                }
            });
        this.props.carNumberBack(false);
    };

    isEmpty = (str)=>{
        if(typeof(str) != 'undefined' && str !== ''){
            return false;
        }else {
            return true;
        }
    };

    //根据车架号选择车型
    _vinPress =(text,index)=>{
        this.modelInfo['brand_id'] = this.modelData[index].brand_id;
        this.modelInfo['model_id'] = this.modelData[index].model_id;
        this.modelInfo['series_id'] = this.modelData[index].series_id;
        this.modelInfo['model_year'] = this.modelData[index].model_year;
        this.modelInfo['model_name'] = this.modelData[index].model_name;
        this._insertVinAndModel(text,JSON.stringify(this.modelInfo),this.modelInfo['model_name']);
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <VinInfo viewData ={this.modelData} vinPress={this._vinPress} ref={(modal) => {this.vinModal = modal}}/>
                <Image source={background} style={[styles.container,{height:height-this.props.barHeight}]}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='选择车辆款型'
                        wrapStyle={styles.wrapStyle}/>
                    <View style={[styles.circleContainer,styles.vinCircle]}>
                        <Text style={[styles.fontMain,styles.leftText]}>车架号</Text>
                        <TextInput
                            ref={(input)=>{this.vinInput = input}}
                            style={[styles.fontMain,styles.fillSpace]}
                            underlineColorAndroid='transparent'
                            maxLength={17}
                            onChangeText={this._onVinChange}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._scanPress()}}>
                            <View style={styles.center}>
                                <Text style={[styles.fontMain,styles.rightText]}>扫描</Text>
                                <Image style={styles.imgContainer} source={scan}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.fontHint}>建议您扫描登记证或行驶证上的车架号</Text>

                    <View style={styles.modelCircle}>
                        {this.state.showHint && <Text style={styles.fontHintBelow}>未解析出车型，请自行选择！</Text>}
                        <TouchableOpacity
                            style={[styles.circleContainer,styles.hintAlign]}
                            activeOpacity={0.6}
                            onPress={()=>{this._modelPress()}}>
                            <View style={styles.rowCenter}>
                                <Text style={[styles.fontMain,styles.leftText]}>请选择车型</Text>
                                <Text style={[styles.fontMain,styles.fillSpace]}>{this.state.modelName}</Text>
                                <Image style={styles.imgContainer} source={arrow}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Image>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent'
    },
    vinCircle: {
        marginTop: Pixel.getPixel(209)
    },
    modelCircle: {
        marginTop: Pixel.getPixel(45)
    },
    hintAlign:{
        marginTop: Pixel.getPixel(10)
    },
    circleContainer: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        marginHorizontal: Pixel.getPixel(35),
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: Pixel.getPixel(22),
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    leftText: {
        marginLeft: Pixel.getPixel(20),
    },
    rightText: {
        marginRight: Pixel.getPixel(7)
    },
    fontMain: {
        color: '#FFFFFF',
        fontSize: Pixel.getFontPixel(14)
    },
    fontHint: {
        marginTop: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(55),
        color: '#FFFFFF',
        fontSize: Pixel.getFontPixel(12),
        opacity: 0.6,
    },
    fontHintBelow: {
        marginLeft: Pixel.getPixel(55),
        color: '#FFFFFF',
        fontSize: Pixel.getFontPixel(12),
        opacity: 0.6,
    },
    imgContainer: {
        width: Pixel.getPixel(18),
        height: Pixel.getPixel(18),
        marginRight: Pixel.getPixel(20)
    },
    fillSpace: {
        flex: 1,
    },
    center: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrapStyle: {
        backgroundColor: 'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});

