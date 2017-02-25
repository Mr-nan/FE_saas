/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    Button,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
}from 'react-native';

import Picker from 'react-native-wheel-picker';
let PickerItem = Picker.Item;

import SuccessModal from '../component/SuccessModal';
import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import SQLiteUtil from '../../utils/SQLiteUtil';
const SQLite = new SQLiteUtil();
import * as Net from '../../utils/RequestUtil';

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const preBg = require('../../../images/publish/car-mileage-pre.png');
const proBg = require('../../../images/publish/car-mileage-pro.png');
const IS_ANDROID = Platform.OS === 'android';

export default class AutoMileage extends Component {

    constructor(props) {
        super(props);
        this.initValue = [0, 0, 0, 0, 0];
        let mileage = this.props.carData.mileage;
        if (mileage !== '') {
            mileage = mileage.split("").reverse().join("");
            for (let i = 0; i < mileage.length; i++) {
                if (i < 2) {
                    this.initValue[i] = parseInt(mileage.charAt(i));
                } else if (i > 2) {
                    this.initValue[i - 1] = parseInt(mileage.charAt(i));
                }
            }
        }
        this.initValue.reverse();
        this.state = {
            selected0: this.initValue[0],
            selected1: this.initValue[1],
            selected2: this.initValue[2],
            selected3: this.initValue[3],
            selected4: this.initValue[4],
            itemList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            renderPlaceholderOnly: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount() {

    }

    onPickerSelect = (key, value) => {
        const newState = {};
        newState['selected' + key] = value;
        this.initValue[key] = value;
        this.setState(newState);

        let concat = this._concatMileage();
        SQLite.changeData(
            'UPDATE publishCar SET mileage = ? WHERE vin = ?',
            [concat, this.props.carData.vin]);
    };

    _concatMileage = () => {
        let concat = '';
        concat += this.initValue[4];
        concat += this.initValue[3];
        concat += '.';
        concat += this.initValue[2];
        if (this.initValue[1] === 0) {
            if (this.initValue[0] !== 0) {
                concat += this.initValue[1];
            }
        } else {
            concat += this.initValue[1];
        }
        if (this.initValue[0] !== 0)
            concat += this.initValue[0];
        concat = concat.split("").reverse().join("");
        return concat;
    };


    _renderPlaceholderView = () => {
        return (<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}/>);
    };

    _onBack = () => {
        this.props.onBack();
    };

    //发布
    _publish = () => {
        SQLite.selectData('SELECT * FROM publishCar WHERE vin = ?',
            [this.props.carData.vin],
            (data) => {
                if (data.code === 1) {
                    let rd = data.result.rows.item(0);
                    let modelInfo = JSON.parse(rd.model);
                    let params = {
                        vin: rd.vin,
                        brand_id: modelInfo.brand_id,
                        model_id: modelInfo.model_id,
                        series_id: modelInfo.series_id,
                        pictures: rd.pictures,
                        v_type: rd.v_type,
                        manufacture: rd.manufacture,
                        init_reg: rd.init_reg,
                        mileage: rd.mileage,
                        show_shop_id: 57,

                    };
                    let url = 'http://dev.api-gateway.dycd.com/' + 'v1/car/save?token=0ac50af9a02b752ca0f48790dc8ea6d1&device_code=dycd_dms_manage_android';
                    Net.request(url, 'post', params)
                        .then((response) => {
                                if (response.mycode === 1) {
                                    SQLite.changeData(
                                        'DELETE From publishCar WHERE vin = ?',
                                        [this.props.carData.vin]);
                                    this.successModal.openModal();
                                }
                            },
                            (error) => {
                                console.log(error);
                            });
                    console.log();
                } else {
                    console.log(data.error);
                }
            });
    };


    _renderRihtFootView = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this._publish}>
                <Text style={styles.rightTitleText}>发布</Text>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <SuccessModal okClick={this.props.goToSource} ref={(modal) => {this.successModal = modal}}/>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='填写行驶里程'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView}
                    />
                    <View style={styles.mileContainer}>
                        <Image style={styles.preContainer} source={preBg}>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected0}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect(0,index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"first"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected1}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect(1,index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"second"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected2}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect(2,index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"three"+value}/>
                                    ))}
                                </Picker>
                            </View>
                        </Image>
                        <Text style={[styles.fontBold,styles.dotSpace]}>.</Text>
                        <Image style={styles.proContainer} source={proBg}>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected3}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect(3,index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"four"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected4}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect(4,index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"five"+value}/>
                                    ))}
                                </Picker>
                            </View>
                        </Image>
                        <View style={styles.endContainer}>
                            <Text style={[styles.fontBold]}>万公里</Text>
                        </View>
                    </View>
                </Image>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent'
    },
    imgContainer: {
        width: width,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    mileContainer: {
        flexDirection: 'row',
        marginTop: Pixel.getPixel(207)
    },
    fillSpace: {
        flex: 1,
    },
    preContainer: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(132),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    proContainer: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(88),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    fontBold: {
        fontSize: Pixel.getFontPixel(23),
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    dotSpace: {
        width: Pixel.getPixel(24),
        textAlign: 'center',
        marginTop: Pixel.getPixel(6)
    },
    endContainer: {
        marginLeft: Pixel.getPixel(9),
        justifyContent: 'center'
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
